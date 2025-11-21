import { useState, useEffect } from 'react'
import TopNav from './interface/TopNav/TopNav'
import Description from './interface/Description/Description'
import SelectUser from './interface/Step1/SelectUser/SelectUser'
import SaveButton from './interface/Step2/SaveButton/SaveButton'
import CurrentStatus from './interface/Step2/CurrentStatusBtn/CurrentStatus'
import CurrentStatusModal from './interface/Step2/CurrentStatusModal/CurrentStatusModal'
import Calendar from './interface/Step2/Calendar/Calendar'
import SetOrder from './interface/Step2/SetOrder/SetOrder'
import SavedModal from './interface/Step2/SavedModal/SavedModal'
import AlertContent from './interface/Step2/AlertContent/AlertContent'
import type { Period, Priority } from '../../api/type'
import { useQuery } from '@tanstack/react-query'
import { getVoteIdByCode } from '../../api/vote'
interface MealSelection {
    date: string
    period: Period
}
import { getVote } from '../../api/vote'
import { getParticipants, getParticipantChoices, updateSchedule } from '../../api/participant'
export default function User({ code }: { code?: string }) {
    const [step, setStep] = useState(0)
    const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(null)
    
    // code가 있으면 voteId로 사용
    const { data: voteId } = useQuery({
        queryKey: ['voteId', code],
        queryFn: () => getVoteIdByCode(code ?? ''),
        enabled: !!code,
    })
    const { data: vote } = useQuery({
        queryKey: ['vote', voteId],
        queryFn: () => getVote(voteId ?? 0),
        enabled: !!voteId,
    })
    const { data: participants } = useQuery({
        queryKey: ['participants', voteId],
        queryFn: () => getParticipants(voteId ?? 0),
        enabled: !!voteId,
    })
    
    // 선택한 참가자의 기존 선택사항 조회
    const { data: participantChoices } = useQuery({
        queryKey: ['participant-choices', voteId, selectedParticipantId],
        queryFn: () => getParticipantChoices(selectedParticipantId!),
        enabled: !!voteId && !!selectedParticipantId,
    })
    
    
    console.log('Vote code:', code, voteId)
    const [currentStatusOpen, setCurrentStatusOpen] = useState(false)
    
    // 원본 데이터
    const [originalSelectedDates, setOriginalSelectedDates] = useState<MealSelection[]>([])
    const [originalOrderList, setOriginalOrderList] = useState<(MealSelection | null)[]>([null, null, null])
    
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
    const handleOrderAlert = () => {
        setAlertType('order')
        setAlertMessage('시간대를 선택해주세요')
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
            
            setOriginalSelectedDates(selected)
            setOriginalOrderList(orderArray)
            setSelectedDates([...selected])
            setOrderList([...orderArray])
        }
    }, [participantChoices])
    
    // 날짜 범위 설정
    const startDate = new Date(vote?.startDate ?? '')
    const endDate = new Date(vote?.endDate ?? '')
    
    const onNext = ({ id }: { id: number | null }) => {
        if (id) {
            setSelectedParticipantId(id)
            setStep(step + 1)
        }
    }
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
        if (selectedParticipantId && voteId) {
            // schedules 생성: 모든 날짜를 순회하며 선택된 period 확인
            const startDateObj = new Date(vote!.startDate)
            const endDateObj = new Date(vote!.endDate)
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
            setOriginalSelectedDates([...selectedDates])
            setOriginalOrderList([...orderList])
        }
        
        setSavedModalOpen(true)
    }
    
    const handleExit = () => {
        setSavedModalOpen(false)
        setStep(0)
        setSelectedParticipantId(null)
        setSelectedDates([])
        setOrderList([null, null, null])
        setOriginalSelectedDates([])
        setOriginalOrderList([null, null, null])
    }

    return (
        <div style={{ paddingBottom: '70px' }}>
            <TopNav step={step} setStep={setStep} />
            <Description title={step === 0 ? '본인 선택' : '가능한 시간'} description={step === 0 ? '가능한 일정을 투표할 본인 이름을 선택해주세요' : '가능한 날짜와 시간대를 모두 선택해주세요'} />
            {step === 0 && <SelectUser userList={participants?.map(participant => ({ id: participant.id, name: participant.displayName })) ?? []} onNext={onNext} />}
            {step === 1 && 
            <>
                <Calendar startDate={startDate} endDate={endDate} selectedDates={selectedDates} setSelectedDates={setSelectedDates} setOrderList={setOrderList} />
                <AlertContent message={alertMessage} show={alertType === 'date'} />
                <SetOrder selectedDates={selectedDates} orderList={orderList} setOrderList={setOrderList} />
                <AlertContent message={alertMessage} show={alertType === 'order'} />
                <SaveButton onSaveClick={onSaveClick} />
                <CurrentStatus setCurrentStatusOpen={setCurrentStatusOpen} />
            </>}
            {currentStatusOpen && voteId && <CurrentStatusModal isOpen={currentStatusOpen} voteId={voteId} onClose={() => setCurrentStatusOpen(false)} />}
            {savedModalOpen && <SavedModal onEdit={() => setSavedModalOpen(false)} onExit={handleExit} />}
        </div>
    )
}