import VoteName from './VoteName/VoteName'
import EditParticipant from './EditParticipant/EditParticipant'
import SetDate from './SetDate/SetDate'
import CreateButton from './CreateButton/CreateButton'
import SavedModal from './SavedModal/SavedModal'
import AlertContent from './AlertContent/AlertContent'
import { useState, useEffect } from 'react'
import { createVote, updateVote, getVote } from '../../../../api/vote'
import { useQuery } from '@tanstack/react-query'
type AlertType = 'voteName' | 'participant' | 'date' | null

// 로컬 날짜를 YYYY-MM-DD 형식으로 변환 (시간대 변환 없이)
const formatLocalDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}
export default function Edit({ goAdminMain, voteId, setEditVoteId }: { goAdminMain: () => void, voteId: number | null, setEditVoteId: (id: number) => void }) {
    const [isSaved, setIsSaved] = useState(false)
    const [voteName, setVoteName] = useState('')
    const [participants, setParticipants] = useState<string[]>([])
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [alertType, setAlertType] = useState<AlertType>(null)
    const [alertMessage, setAlertMessage] = useState('')
    const [shareLink, setShareLink] = useState('')
    const [currentVoteId, setCurrentVoteId] = useState<number | null>(voteId)
    // 초기 voteId로 수정 모드 여부 판단 (생성 후에도 UI는 생성 모드 유지)
    const [isEditMode, setIsEditMode] = useState(voteId !== null)

    // voteId가 변경되면 currentVoteId도 업데이트
    useEffect(() => {
        setCurrentVoteId(voteId)
    }, [voteId])

    // 수정 모드일 때 데이터 로드
    const { data: voteData } = useQuery({
        queryKey: ['vote', currentVoteId],
        queryFn: () => getVote(currentVoteId!),
        enabled: currentVoteId !== null,
    })

    useEffect(() => {
        if (voteData) {
            setVoteName(voteData.name)
            setStartDate(new Date(voteData.startDate))
            setEndDate(new Date(voteData.endDate))
        }
    }, [voteData])
    const returnToEdit = () => {
        setIsSaved(false)
        setIsEditMode(true)
    }
    const handleHomeClick = () => {
        setIsSaved(false)
        goAdminMain()
    }
    const onSaveClick = async () => {
        // Reset alert
        setAlertType(null)
        
        // Check vote name
        if (voteName.trim() === '') {
            setAlertType('voteName')
            setAlertMessage('투표 이름을 입력해주세요.')
            return
        }
        
        // Check participants (수정 모드가 아닐 때만 체크)
        if (!currentVoteId) {
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
        
        let response
        if (currentVoteId) {
            // 수정 모드
            response = await updateVote(currentVoteId, {
                name: voteName,
                startDate: formatLocalDate(startDate),
                endDate: formatLocalDate(endDate),
            })
        } else {
            // 생성 모드
            response = await createVote({
                name: voteName,
                participantNames: participants,
                startDate: formatLocalDate(startDate),
                endDate: formatLocalDate(endDate),
            })
            // 생성 후 currentVoteId 업데이트
            setCurrentVoteId(response.id)
            setEditVoteId(response.id)
        }
        setShareLink(response.shareUrl)
        setIsSaved(true)
    }

    return (
        <>
            <VoteName voteName={voteName} setVoteName={setVoteName} isEditMode={isEditMode}/>
            <AlertContent message={alertMessage} show={alertType === 'voteName'} />
            
            <EditParticipant participants={participants} setParticipants={setParticipants} voteId={currentVoteId}/>
            <AlertContent message={alertMessage} show={alertType === 'participant'} />
            
            <SetDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
            <AlertContent message={alertMessage} show={alertType === 'date'} />
            
            <CreateButton onSaveClick={onSaveClick} isEditMode={isEditMode}/>
            {isSaved && <SavedModal onEdit={returnToEdit} onHome={handleHomeClick} shareLink={shareLink} isEditMode={isEditMode} />}
        </>
    )
}