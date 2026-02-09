import {
    currentStatusButton,
    currentStatusButtonTime,
    currentStatusButtonPriority,
    currentStatusText,
    currentStatusDivider,
    saveButtonIcon,
    currentStatusSection,
} from './CurrentStatus.css'
import Icon from '@mdi/react'
import { mdiCalendarMonthOutline } from '@mdi/js'

interface CurrentStatusProps {
    currentTab: string
    setCurrentStatusOpen: (isOpen: boolean) => void
    onSaveClick: () => void
}

export default function CurrentStatus({ currentTab, setCurrentStatusOpen, onSaveClick }: CurrentStatusProps) {
    const handleCurrentStatusClick = () => {
        setCurrentStatusOpen(true)
    }

    const handleSaveClick = () => {
        onSaveClick()
    }

    return (
        <div
            className={`${currentStatusButton} ${currentTab === 'time' ? currentStatusButtonTime : currentStatusButtonPriority}`}
        >
            <button type="button" className={currentStatusSection} onClick={handleCurrentStatusClick}>
                <Icon path={mdiCalendarMonthOutline} size={0.8} color="#FFFFFF" />
                <span className={currentStatusText}>투표 현황</span>
            </button>
            <div className={currentStatusDivider} />
            <button type="button" className={currentStatusSection} onClick={handleSaveClick}>
                <img
                    src="/TickSquare.png"
                    alt="저장"
                    className={saveButtonIcon}
                />
                <span className={currentStatusText}>저장하기</span>
            </button>
        </div>
    )
}
