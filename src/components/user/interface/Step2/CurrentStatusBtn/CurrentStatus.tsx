import { currentStatusButton, currentStatusIcon, currentStatusText } from './CurrentStatus.css'
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';
export default function CurrentStatus({ setCurrentStatusOpen }: { setCurrentStatusOpen: (isOpen: boolean) => void }) {
    const handleCurrentStatusClick = () => {
        setCurrentStatusOpen(true)
    }
    return (
        <button className={currentStatusButton} onClick={handleCurrentStatusClick}>
            <Icon path={mdiCalendarMonthOutline} size={0.8} color="#FFFFFF" />
            <span className={currentStatusText}>투표 현황 확인</span>
        </button>
    )
}
