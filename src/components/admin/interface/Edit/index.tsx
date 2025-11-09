import VoteName from './VoteName/VoteName'
import EditParticipant from './EditParticipant/EditParticipant'
import SetDate from './SetDate/SetDate'
import CreateButton from './CreateButton/CreateButton'
import SavedModal from './SavedModal/SavedModal'
import AlertContent from './AlertContent/AlertContent'
import { useState } from 'react'
type AlertType = 'voteName' | 'participant' | 'date' | null

export default function Edit({ goAdminMain }: { goAdminMain: () => void }) {
    const [isSaved, setIsSaved] = useState(false)
    const [voteName, setVoteName] = useState('')
    const [participants, setParticipants] = useState<string[]>([])
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [alertType, setAlertType] = useState<AlertType>(null)
    const [alertMessage, setAlertMessage] = useState('')
    const returnToEdit = () => {
        setIsSaved(false)
        console.log(voteName, participants, startDate, endDate)
    }
    const handleHomeClick = () => {
        setIsSaved(false)
        goAdminMain()
    }
    const onSaveClick = () => {
        // Reset alert
        setAlertType(null)
        
        // Check vote name
        if (voteName.trim() === '') {
            setAlertType('voteName')
            setAlertMessage('투표 이름을 입력해주세요.')
            return
        }
        
        // Check participants
        if (participants.length === 0) {
            setAlertType('participant')
            setAlertMessage('참여자를 추가해주세요.')
            return
        }
        
        if (participants.some(participant => participant.trim() === '')) {
            setAlertType('participant')
            setAlertMessage('참여자 이름을 입력해주세요.')
            return
        }
        
        // Check dates
        if (startDate === null || endDate === null) {
            setAlertType('date')
            setAlertMessage('날짜 범위를 선택해주세요.')
            return
        }
        
        if (startDate > endDate) {
            setAlertType('date')
            setAlertMessage('시작 날짜는 종료 날짜보다 이전이어야 합니다.')
            return
        }
        
        setIsSaved(true)
    }
    const shareLink = 'https://www.naver.com'
    return (
        <>
            <VoteName voteName={voteName} setVoteName={setVoteName}/>
            <AlertContent message={alertMessage} show={alertType === 'voteName'} />
            
            <EditParticipant participants={participants} setParticipants={setParticipants}/>
            <AlertContent message={alertMessage} show={alertType === 'participant'} />
            
            <SetDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
            <AlertContent message={alertMessage} show={alertType === 'date'} />
            
            <CreateButton onSaveClick={onSaveClick}/>
            {isSaved && <SavedModal onEdit={returnToEdit} onHome={handleHomeClick} shareLink={shareLink} />}
        </>
    )
}