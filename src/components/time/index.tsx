import { useState } from 'react'
import Description from './interface/Description/Description'
import TargetDate from './interface/TargetDate/TargetDate'
import DateCalendar from './interface/DateCalendar/DateCalendar'
import { timeContainer, saveSection, saveButtonDisabled, saveButtonEnabledLunch, saveButtonEnabledDinner, saveButtonIcon } from './Time.css'
import type { Period } from '../../api/type'
import CurrentStatus from './interface/CurrentStatusBtn/CurrentStatus'
import CurrentStatusModal from './interface/CurrentStatusModal/CurrentStatusModal'
import SavedModal from './interface/SavedModal/SavedModal'
export default function Time() {
    const [period] = useState<Period>('DINNER')
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [currentStatusOpen, setCurrentStatusOpen] = useState(false)
    const [voteId, setVoteId] = useState<number>(1)
    const [savedModalOpen, setSavedModalOpen] = useState(false)
    const handleSave = () => {
        if (!selectedTime) return
        // TODO: 실제 저장 로직 연결
        console.log('선택된 시간:', selectedTime, '기간:', period)
        setSavedModalOpen(true)
    }
    const handleExit = () => {
        setSavedModalOpen(false)
    }
    const onSelectTime = (time: string) => {
        if (selectedTime === time) {
            setSelectedTime(null)
            return
        }
        setSelectedTime(time)
    }
    const isDisabled = !selectedTime

    return (
        <div className={timeContainer}>
            <Description title="시간 투표" />
            <TargetDate period={period} />
            <DateCalendar period={period} selectedTime={selectedTime} onSelectTime={onSelectTime} />
            <div className={saveSection}>
                <button
                    type="button"
                    className={isDisabled ? saveButtonDisabled : period === 'LUNCH' ? saveButtonEnabledLunch : saveButtonEnabledDinner}
                    onClick={handleSave}
                    disabled={isDisabled}
                    style={{ transition: 'all 0.2s ease' }}
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
            {currentStatusOpen && <CurrentStatusModal isOpen={currentStatusOpen} voteId={voteId} onClose={() => setCurrentStatusOpen(false)} />}
            {savedModalOpen && <SavedModal onEdit={() => setSavedModalOpen(false)} onExit={handleExit} />}
        </div>
    )
}