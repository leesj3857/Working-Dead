import { useState } from 'react'
import { motion } from 'framer-motion'
import DeleteModal from './DeleteModal'
import { recentContainer, recentTitle, recentSubtitle, eventTitle, eventContainer, eventItem, eventItemContent, eventIndex, eventName, eventCreatedAt, eventItemWrapper, actionButton, editButton, deleteButton } from './Recent.css'
import { getAllVotes } from '../../../../api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { AllVotesResponse } from '../../../../api/vote'
import { deleteVote } from '../../../../api/vote'
export default function Recent({ setIsEditing, setEditVoteId }: { setIsEditing: (value: boolean) => void, setEditVoteId: (id: number) => void }) {
    const queryClient = useQueryClient()
    const { data: votes } = useQuery<AllVotesResponse[]>({
        queryKey: ['all-votes'],
        queryFn: getAllVotes,
    })
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [deleteModalId, setDeleteModalId] = useState<number | null>(null)

    const events = votes?.map((vote) => ({
        id: vote.id,
        name: vote.name,
        createdAt: vote.startDate,
    })) || []

    const handleItemClick = (id: number) => {
        setSelectedId(selectedId === id ? null : id)
    }

    const handleEditClick = (id: number, e: React.MouseEvent) => {
        e.stopPropagation()
        setEditVoteId(id)
        setIsEditing(true)
    }

    const handleDeleteClick = (id: number, e: React.MouseEvent) => {
        e.stopPropagation()
        setDeleteModalId(id)
    }

    const handleDeleteConfirm = async () => {
        if (deleteModalId) {
            await deleteVote(deleteModalId)
            queryClient.invalidateQueries({ queryKey: ['all-votes'] })
        }
        setDeleteModalId(null)
        setSelectedId(null)
    }

    const handleDeleteCancel = () => {
        setDeleteModalId(null)
    }

    return (
        <>
            <div className={recentContainer}>
                <span className={recentTitle}>최근 약속 내역</span>
                <span className={recentSubtitle}>이어서 관리할 약속을 선택해주세요.</span>
                <span className={eventTitle}>EVENTS</span>
                <div className={eventContainer}>
                    {events.map((event) => (
                        <div key={event.id} className={eventItemWrapper}>
                            {
                                <>
                                    <div 
                                        className={`${actionButton} ${editButton}`}
                                        onClick={(e) => handleEditClick(event.id, e)}
                                    >
                                        <span>수정</span>
                                    </div>
                                    <div 
                                        className={`${actionButton} ${deleteButton}`}
                                        onClick={(e) => handleDeleteClick(event.id, e)}
                                    >
                                        <span>삭제</span>
                                    </div>
                                </>

                            }
                            <motion.div 
                                className={eventItem}
                                animate={{ 
                                    right: selectedId === event.id ? 150 : 0
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                onClick={() => handleItemClick(event.id)}
                            >
                                <div className={eventItemContent}>
                                    <span className={eventIndex}>{String(event.id + 1).padStart(2, '0')}</span>
                                    <motion.span 
                                        className={eventName}
                                        animate={{ 
                                            opacity: selectedId === event.id ? 0 : 1,
                                            display: selectedId === event.id ? 'none' : 'block'
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {event.name}
                                    </motion.span>
                                </div>
                                <span className={eventCreatedAt}>{event.createdAt} 생성</span>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
            
            {deleteModalId !== null && (
                <DeleteModal
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                />
            )}
        </>
    )
}