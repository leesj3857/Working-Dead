import { useEffect, useMemo, useState } from 'react'
import Description from './interface/Description/Description'
import TargetDate from './interface/TargetDate/TargetDate'
import DateCalendar from './interface/DateCalendar/DateCalendar'
import { timeContainer, saveSection, saveButtonDisabled, saveButtonEnabledLunch, saveButtonEnabledDinner, saveButtonIcon, finalizedBanner } from './Time.css'
import type { Period } from '../../api/type'
import type { Participant } from '../../api/type'
import CurrentStatus from './interface/CurrentStatusBtn/CurrentStatus'
import CurrentStatusModal from './interface/CurrentStatusModal/CurrentStatusModal'
import SavedModal from './interface/SavedModal/SavedModal'
import SelectUser from '../user/interface/Step1/SelectUser/SelectUser'
import type { TimePollDetailResponse } from '../../api/timePoll'
import { submitTimePoll } from '../../api/timePoll'

interface TimeProps {
    pollId?: number
    participantId?: number
    timePoll?: TimePollDetailResponse
    participants?: Participant[]
    onParticipantSelect?: (id: number) => void
}

export default function Time({ pollId, participantId, timePoll, participants, onParticipantSelect }: TimeProps) {
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [currentStatusOpen, setCurrentStatusOpen] = useState(false)
    const [savedModalOpen, setSavedModalOpen] = useState(false)

    // 서버에서 내려온 mySelection 으로 초기 선택 시간 세팅
    useEffect(() => {
        if (timePoll?.mySelection) {
            // "HH:MM:SS" 형태라면 "HH:MM" 으로 자름
            const parts = timePoll.mySelection.split(':')
            if (parts.length >= 2) {
                setSelectedTime(`${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`)
            } else {
                setSelectedTime(timePoll.mySelection)
            }
        }
    }, [timePoll?.mySelection])

    const handleSave = async () => {
        if (!selectedTime || !pollId || !participantId) return

        const bodyTime = selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime
        await submitTimePoll(pollId, {
            participantId,
            selectedTime: bodyTime,
        })

        setSavedModalOpen(true)
    }
    const handleExit = () => {
        setSavedModalOpen(false)
        location.href = "kakaotalk://";
    }
    const onSelectTime = (time: string) => {
        if (selectedTime === time) {
            setSelectedTime(null)
            return
        }
        setSelectedTime(time)
    }
    const isFinalized = timePoll?.status === 'FINALIZED'
    const isDisabled = !selectedTime || isFinalized

    const period = useMemo(() => {
        return timePoll?.period ?? 'LUNCH'
    }, [timePoll?.period])

    const targetDateLabel = useMemo(() => {
        if (!timePoll?.confirmedDate) return '일시 미정'
        const date = new Date(timePoll.confirmedDate)
        if (Number.isNaN(date.getTime())) return timePoll.confirmedDate

        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const weekdayMap = ['일', '월', '화', '수', '목', '금', '토']
        const weekday = weekdayMap[date.getDay()]

        return `${year}년 ${month}월 ${day}일 (${weekday})`
    }, [timePoll?.confirmedDate])

    const userList = useMemo(
        () => participants?.map(p => ({ id: p.id, name: p.displayName })) ?? [],
        [participants]
    )

    const showSelectUser = !participantId && userList.length > 0 && onParticipantSelect

    if (showSelectUser) {
        return (
            <div className={timeContainer}>
                <Description title="시간 투표" />
                <div style={{ width: '100%' }}>
                    <SelectUser
                        userList={userList}
                        onNext={({ id }) => id != null && onParticipantSelect(id)}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={timeContainer}>
            <Description title="시간 투표" />
            {isFinalized && (
                <div className={finalizedBanner}>
                    이 시간 투표는 종료되었습니다.
                </div>
            )}
            <TargetDate period={period} dateLabel={targetDateLabel} />
            <DateCalendar
                period={period}
                selectedTime={selectedTime}
                onSelectTime={onSelectTime}
                disabled={isFinalized}
            />
            <div className={saveSection}>
                <button
                    type="button"
                    className={isDisabled ? saveButtonDisabled : period === 'LUNCH' ? saveButtonEnabledLunch : saveButtonEnabledDinner}
                    onClick={isFinalized ? undefined : handleSave}
                    disabled={isDisabled}
                    style={{ transition: 'all 0.2s ease', pointerEvents: isFinalized ? 'none' : undefined }}
                >
                    <img
                        src="/TickSquare.png"
                        alt="저장"
                        className={saveButtonIcon}
                    />
                    <span>저장하기</span>
                </button>
            </div>  
            <CurrentStatus setCurrentStatusOpen={setCurrentStatusOpen} />
            {currentStatusOpen && <CurrentStatusModal isOpen={currentStatusOpen} pollId={pollId ?? 0} onClose={() => setCurrentStatusOpen(false)} />}
            {savedModalOpen && <SavedModal onEdit={() => setSavedModalOpen(false)} onExit={handleExit} />}
        </div>
    )
}