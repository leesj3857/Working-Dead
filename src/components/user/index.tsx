import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TopNav from './interface/TopNav/TopNav'
import Description from './interface/Description/Description'
import NameModal from './interface/Step1/NameModal/NameModal'
import SelectUser from './interface/Step1/SelectUser/SelectUser'
import { nameModalOverlay, selectExistingLink } from './interface/Step1/NameModal/NameModal.css'
import CurrentStatus from './interface/Step2/CurrentStatusBtn/CurrentStatus'
import CurrentStatusModal from './interface/Step2/CurrentStatusModal/CurrentStatusModal'
import Calendar from './interface/Step2/Calendar/Calendar'
import SetOrder from './interface/Step2/SetOrder/SetOrder'
import SavedModal from './interface/Step2/SavedModal/SavedModal'
import AlertContent from './interface/Step2/AlertContent/AlertContent'
import type { Period, Priority } from '../../api/type'
import type { VoteResponse } from '../../api/vote'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getParticipantChoices, updateSchedule, addParticipant, getParticipants } from '../../api/participant'
import { useDisplayName } from '../../context/DisplayNameContext'
interface MealSelection {
    date: string
    period: Period
}

const PARTICIPANT_STORAGE_KEY_PREFIX = 'vote_participant_'
const HISTORY_STATE_KEY = 'userParticipantId'
const HISTORY_STATE_DISPLAY_NAME = 'userDisplayName'

interface StoredParticipant {
    voteId: number
    participantId: number
    name: string
}


const saveStoredParticipant = (data: StoredParticipant) => {
    try {
        localStorage.setItem(
            `${PARTICIPANT_STORAGE_KEY_PREFIX}${data.voteId}`,
            JSON.stringify(data),
        )
    } catch {
        // ignore
    }
}

export default function User({
    voteId,
    vote,
}: {
    voteId?: number
    vote?: VoteResponse
}) {
    const { setDisplayName } = useDisplayName()
    const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(null)
    const [userName, setUserName] = useState<string>('')
    const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(true)
    const [step1View, setStep1View] = useState<'name' | 'select'>('name')
    const [currentTab, setCurrentTab] = useState<'priority' | 'time'>('time')

    // 최초 진입 시(Step1) history에 현재 단계 넣어 두기 → 날짜 선택 후 뒤로가기 시 Step1으로 복귀
    useEffect(() => {
        if (!isNameModalOpen) return
        const current = window.history.state
        if (current?.[HISTORY_STATE_KEY] !== undefined) return
        window.history.replaceState(
            { ...current, [HISTORY_STATE_KEY]: null },
            '',
            window.location.pathname + window.location.search
        )
    }, [isNameModalOpen])

    // 선택한 참가자의 기존 선택사항 조회
    const { data: participantChoices } = useQuery({
        queryKey: ['participant-choices', voteId, selectedParticipantId],
        queryFn: () => getParticipantChoices(selectedParticipantId!),
        enabled: !!voteId && !!selectedParticipantId,
        refetchOnWindowFocus: false,
    })

    // 참가자 목록(이름 추가 후 뒤로가기 시 최신 목록 표시를 위해 별도 쿼리)
    const queryClient = useQueryClient()
    const { data: participants } = useQuery({
        queryKey: ['participants', voteId],
        queryFn: () => getParticipants(voteId!),
        enabled: !!voteId,
        refetchOnWindowFocus: false,
    })
    const participantList = participants ?? vote?.participants ?? []

    const [currentStatusOpen, setCurrentStatusOpen] = useState(false)

    // 작업용 복사본
    const [selectedDates, setSelectedDates] = useState<MealSelection[]>([])
    const [orderList, setOrderList] = useState<(MealSelection | null)[]>([null, null, null])
    const [savedModalOpen, setSavedModalOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState<'date' | 'order' | null>(null)
    const handleDateAlert = () => {
        setAlertType('date')
        setAlertMessage('날짜를 선택해주세요')
    }
    // 날짜 형식 변환: "2025-11-25" -> "11/25"
    const formatDateToCalendar = (dateStr: string): string => {
        const date = new Date(dateStr)
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${month}/${day}`
    }
    
    // 참가자 선택사항 로드
    useEffect(() => {
        console.log('participantChoices', participantChoices)
        if (participantChoices) {
            // selections에서 selected: true인 항목들을 selectedDates로 변환
            const selected: MealSelection[] = participantChoices.selections
                .filter(s => s.selected)
                .map(s => ({
                    date: formatDateToCalendar(s.date),
                    period: s.period as Period
                }))
            
            // priorities를 priorityIndex 순서로 정렬하여 orderList 생성
            const ordered = participantChoices.priorities
                .sort((a, b) => a.priorityIndex - b.priorityIndex)
                .map(p => ({
                    date: formatDateToCalendar(p.date),
                    period: p.period as Period
                }))
            
            // 3개 길이 배열로 만들기 (부족하면 null로 채움)
            const orderArray: (MealSelection | null)[] = [
                ordered[0] || null,
                ordered[1] || null,
                ordered[2] || null
            ]
            
            setSelectedDates([...selected])
            setOrderList([...orderArray])
        }
    }, [participantChoices])
    
    // 날짜 범위 설정
    const startDate = new Date(vote?.startDate ?? '')
    const endDate = new Date(vote?.endDate ?? '')
    
    const onSaveClick = async () => {
        if(selectedDates.length === 0 ) {
            handleDateAlert()
            return
        }
        // if(orderList.every(o => o === null)) {
        //     handleOrderAlert()
        //     return
        // }
        setAlertType(null)
        setAlertMessage('')
        
        // API 호출하여 저장
        if (selectedParticipantId && voteId && vote) {
            // schedules 생성: 모든 날짜를 순회하며 선택된 period 확인
            const startDateObj = new Date(vote.startDate)
            const endDateObj = new Date(vote.endDate)
            const schedules = []
            
            for (let d = new Date(startDateObj); d <= endDateObj; d.setDate(d.getDate() + 1)) {
                const dateStr = `${d.getMonth() + 1}/${d.getDate()}`
                const lunchSelected = selectedDates.some(s => s.date === dateStr && s.period === 'LUNCH')
                const dinnerSelected = selectedDates.some(s => s.date === dateStr && s.period === 'DINNER')
                
                const slots = []
                if (lunchSelected) slots.push({ period: 'LUNCH', selected: true })
                if (dinnerSelected) slots.push({ period: 'DINNER', selected: true })
                
                if (slots.length > 0) {
                    // YYYY-MM-DD 형식으로 변환
                    const year = d.getFullYear()
                    const month = String(d.getMonth() + 1).padStart(2, '0')
                    const day = String(d.getDate()).padStart(2, '0')
                    schedules.push({
                        date: `${year}-${month}-${day}`,
                        slots
                    })
                }
            }
            
            // priorities 생성: orderList에서 null이 아닌 항목만, priorityIndex는 1,2,3
            const priorities: Priority[] = orderList
                .filter((item): item is MealSelection => item !== null)
                .map((item, index) => {
                    // date를 YYYY-MM-DD 형식으로 변환
                    const [m, d] = item.date.split('/')
                    const year = startDateObj.getFullYear()
                    const dateStr = `${year}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
                    
                    return {
                        date: dateStr,
                        period: item.period as string,
                        priorityIndex: index + 1
                        // weight 필드는 전달하지 않음
                    }
                })
            
            await updateSchedule(selectedParticipantId, {
                schedules,
                priorities
            })
            
            // 원본 데이터 업데이트
        }
        
        setSavedModalOpen(true)
    }
    
    const handleExit = () => {
        setSavedModalOpen(false)
        location.href = "kakaotalk://";
    }

    const handleSaveName = async (name: string) => {
        setUserName(name)

        if (!voteId) {
            setIsNameModalOpen(false)
            return
        }

        try {
            const participant = await addParticipant(voteId, name)
            if(!participant) return
            setSelectedParticipantId(participant.id)
            saveStoredParticipant({
                voteId,
                participantId: participant.id,
                name,
            })
            setDisplayName(name)
            setIsNameModalOpen(false)
            queryClient.invalidateQueries({ queryKey: ['participants', voteId] })
            window.history.pushState(
                {
                    ...window.history.state,
                    [HISTORY_STATE_KEY]: participant.id,
                    [HISTORY_STATE_DISPLAY_NAME]: name,
                },
                '',
                window.location.pathname + window.location.search
            )
        } catch {
            // ignore
        }
    }

    const userList = participantList.map(p => ({ id: p.id, name: p.displayName }))

    // 같은 URL에서 뒤로가기/앞으로가기 시 Step1 ↔ 날짜 선택 복원 + displayName 동기화
    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            const id = e.state?.[HISTORY_STATE_KEY] ?? null
            if (id == null) {
                setIsNameModalOpen(true)
                setSelectedParticipantId(null)
                setUserName('')
                setDisplayName('')
            } else {
                const participant = participantList.find(p => p.id === id)
                const displayName =
                    participant?.displayName ?? e.state?.[HISTORY_STATE_DISPLAY_NAME] ?? ''
                setSelectedParticipantId(id)
                setUserName(displayName)
                setDisplayName(displayName)
                setIsNameModalOpen(false)
            }
        }
        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [participantList, setDisplayName])

    const handleSelectUserNext = ({ id }: { id: number | null }) => {
        if (!id || !voteId) return
        const participant = participantList.find(p => p.id === id)
        if (!participant) return
        setSelectedParticipantId(id)
        setUserName(participant.displayName)
        setDisplayName(participant.displayName)
        saveStoredParticipant({
            voteId,
            participantId: id,
            name: participant.displayName,
        })
        setIsNameModalOpen(false)
        window.history.pushState(
            { ...window.history.state, [HISTORY_STATE_KEY]: id },
            '',
            window.location.pathname + window.location.search
        )
    }

    return (
        <div style={{ flex: 1 }}>
            {isNameModalOpen && step1View === 'name' && (
                <NameModal
                    isOpen
                    initialName={userName}
                    onSave={handleSaveName}
                    onSelectExistingUser={() => setStep1View('select')}
                />
            )}
            {isNameModalOpen && step1View === 'select' && (
                <div className={nameModalOverlay} style={{ flexDirection: 'column', gap: 24 }}>
                    <button
                        type="button"
                        className={selectExistingLink}
                        onClick={() => setStep1View('name')}
                        style={{ marginTop: 0 }}
                    >
                        이름 직접 입력
                    </button>
                    <div style={{ width: '70%' }}>
                        <SelectUser
                            userList={userList}
                            onNext={handleSelectUserNext}
                        />
                    </div>
                </div>
            )}
            <Description 
                title={'날짜 선택'}
                description={'가능한 날짜와 시간대를 모두 선택해주세요'}
                currentTab={currentTab}
                onChangeTab={setCurrentTab}
            />
            <>
                <AnimatePresence initial={false}>
                    {currentTab === 'time' && (
                        <motion.div
                            key="calendar"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                        >
                            <Calendar
                                startDate={startDate}
                                endDate={endDate}
                                selectedDates={selectedDates}
                                setSelectedDates={setSelectedDates}
                                setOrderList={setOrderList}
                            />
                            <AlertContent message={alertMessage} show={alertType === 'date'} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <SetOrder
                    selectedDates={selectedDates}
                    orderList={orderList}
                    setOrderList={setOrderList}
                    collapsed={currentTab === 'time'}
                />
                <CurrentStatus currentTab={currentTab} setCurrentStatusOpen={setCurrentStatusOpen} onSaveClick={onSaveClick} />
            </>
            {currentStatusOpen && voteId && <CurrentStatusModal isOpen={currentStatusOpen} voteId={voteId} onClose={() => setCurrentStatusOpen(false)} />}
            {savedModalOpen && <SavedModal onEdit={() => setSavedModalOpen(false)} onExit={handleExit} />}
        </div>
    )
}