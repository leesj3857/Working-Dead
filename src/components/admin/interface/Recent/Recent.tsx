import { useState } from 'react'
import { motion } from 'framer-motion'
import DeleteModal from './DeleteModal'
import { recentContainer, recentTitle, recentSubtitle, eventTitle, eventContainer, eventItem, eventItemContent, eventIndex, eventName, eventCreatedAt, eventItemWrapper, actionButton, editButton, deleteButton } from './Recent.css'
import { getAllVotes } from '../../../../api'
import { useQuery } from '@tanstack/react-query'
import type { AllVotesResponse } from '../../../../api/vote'
export default function Recent() {
    const { data: votes } = useQuery<AllVotesResponse[]>({
        queryKey: ['votes'],
        queryFn: getAllVotes,
    })
    const [openedIndex, setOpenedIndex] = useState<number | null>(null)
    const [deleteModalIndex, setDeleteModalIndex] = useState<number | null>(null)

    const events = votes?.map((vote) => ({
        name: vote.name,
        createdAt: vote.startDate,
    })) || []

    const handleItemClick = (index: number) => {
        setOpenedIndex(openedIndex === index ? null : index)
    }

    const handleDeleteClick = (index: number, e: React.MouseEvent) => {
        e.stopPropagation()
        setDeleteModalIndex(index)
    }

    const handleDeleteConfirm = () => {
        // 삭제 로직 구현
        console.log('Delete confirmed for index:', deleteModalIndex)
        setDeleteModalIndex(null)
        setOpenedIndex(null)
    }

    const handleDeleteCancel = () => {
        setDeleteModalIndex(null)
    }

    return (
        <>
            <div className={recentContainer}>
                <span className={recentTitle}>최근 약속 내역</span>
                <span className={recentSubtitle}>이어서 관리할 약속을 선택해주세요.</span>
                <span className={eventTitle}>EVENTS</span>
                <div className={eventContainer}>
                    {events.map((event, index) => (
                        <div key={index} className={eventItemWrapper}>
                            {
                                <>
                                    <div className={`${actionButton} ${editButton}`}>
                                        <span>수정</span>
                                    </div>
                                    <div 
                                        className={`${actionButton} ${deleteButton}`}
                                        onClick={(e) => handleDeleteClick(index, e)}
                                    >
                                        <span>삭제</span>
                                    </div>
                                </>

                            }
                            <motion.div 
                                className={eventItem}
                                animate={{ 
                                    right: openedIndex === index ? 150 : 0
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                onClick={() => handleItemClick(index)}
                            >
                                <div className={eventItemContent}>
                                    <span className={eventIndex}>{String(index + 1).padStart(2, '0')}</span>
                                    <motion.span 
                                        className={eventName}
                                        animate={{ 
                                            opacity: openedIndex === index ? 0 : 1,
                                            display: openedIndex === index ? 'none' : 'block'
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
            
            {deleteModalIndex !== null && (
                <DeleteModal
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                />
            )}
        </>
    )
}