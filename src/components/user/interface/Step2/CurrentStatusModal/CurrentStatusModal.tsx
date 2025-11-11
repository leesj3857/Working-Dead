import { 
    modalOverlay, 
    modalContainer, 
    modalHeader, 
    modalTitle, 
    closeButton,
    modalContent,
    voteItem,
    voteIndex,
    voteInfo,
    voteDate,
    voteMealType,
    voteStats,
    participantCount,
    moreButtonContainer,
    moreButton,
    moreButtonText,
    participantChip,
    participantChipText,
    participantsContainer,
    voteItemContent
} from './CurrentStatusModal.css'
import Icon from '@mdi/react'
import { mdiClose, mdiAccountMultipleOutline, mdiChevronDown, mdiMinusBoxOutline, mdiPlusBoxOutline, mdiStarOutline } from '@mdi/js'
import { subtle1, accent, subtle2 } from '../../../../../style/color.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Participant {
    id: string
    name: string
    star: boolean
}

interface Vote {
    id: string
    date: string
    dayOfWeek: string
    mealType: string
    participants: Participant[]
}

interface CurrentStatusModalProps {
    isOpen: boolean
    onClose: () => void
    votes: Vote[]
    onMoreClick?: () => void
}

export default function CurrentStatusModal({ isOpen, onClose, votes, onMoreClick }: CurrentStatusModalProps) {
    const [expandedVotes, setExpandedVotes] = useState<Set<string>>(new Set())
    const [showAll, setShowAll] = useState(false)
    
    const displayedVotes = showAll ? votes : votes.slice(0, 3)
    
    const colorSets = [
        { background: '#F64900', text: '#FFFFFF', border: 'none' },
        { background: '#FFB86A', text: '#FFFFFF', border: 'none' },
        { background: '#FFEDD4', text: '#F64900', border: 'none' },
        { background: '#FFFFFF', text: '#F64900', border: '1px solid #F64900' },
        { background: '#CEFAFE', text: '#0092B9', border: 'none' },
        { background: '#54EAFD', text: accent, border: 'none' },
        { background: '#0092B9', text: '#FFFFFF', border: 'none' },
        { background: '#C0BBB7', text: accent, border: 'none' },
        { background: '#6E6A68', text: '#FFFFFF', border: 'none' },
        { background: accent, text: '#FFFFFF', border: 'none' },
    ]
    
    const getColorSet = (index: number) => {
        return colorSets[index % colorSets.length]
    }
    
    const toggleVote = (voteId: string) => {
        setExpandedVotes(prev => {
            const newSet = new Set(prev)
            if (newSet.has(voteId)) {
                newSet.delete(voteId)
            } else {
                newSet.add(voteId)
            }
            return newSet
        })
    }
    
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className={modalOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                >
                    <motion.div 
                        className={modalContainer}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={modalHeader}>
                            <h2 className={modalTitle}>투표 현황</h2>
                            <button className={closeButton} onClick={onClose}>
                                <Icon path={mdiClose} size={1} color="#FFFFFF" />
                            </button>
                        </div>
                        
                        <div className={modalContent}>
                            {displayedVotes.map((vote, index) => {
                                const isExpanded = expandedVotes.has(vote.id)
                                return (
                                    <motion.div 
                                        key={vote.id}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ 
                                            duration: 0.2, 
                                            delay: index * 0.05,
                                            ease: 'easeOut'
                                        }}
                                    >
                                        <div 
                                            className={voteItem}
                                            onClick={() => toggleVote(vote.id)}
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <div className={voteItemContent}
                                                style={{
                                                    borderBottom: isExpanded ? `1px solid ${subtle2}` : 'none'
                                                }}
                                            >
                                                <div className={voteIndex}>{index + 1}</div>
                                                <div className={voteInfo}>
                                                    <div className={voteDate}>
                                                        {vote.date} ({vote.dayOfWeek})
                                                    </div>
                                                    <div className={voteMealType}>{vote.mealType}</div>
                                                </div>
                                                <div className={voteStats}>
                                                    <Icon 
                                                        path={mdiAccountMultipleOutline} 
                                                        size={0.8} 
                                                        color={subtle1} 
                                                    />
                                                    <span className={participantCount}>{vote.participants.length}</span>
                                                    <motion.div
                                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        style={{ display: 'flex', alignItems: 'center' }}
                                                    >
                                                        <Icon 
                                                            path={mdiChevronDown} 
                                                            size={0.8} 
                                                            color={subtle1} 
                                                        />
                                                    </motion.div>
                                                </div>
                                            </div>
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        style={{ overflow: 'hidden', width: '100%' }}
                                                    >
                                                        <div className={participantsContainer}>
                                                            {vote.participants.map((participant, pIndex) => {
                                                                const colorSet = getColorSet(pIndex)
                                                                return (
                                                                    <motion.div
                                                                        key={participant.id}
                                                                        className={participantChip}
                                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        transition={{
                                                                            duration: 0.2,
                                                                            delay: pIndex * 0.03
                                                                        }}
                                                                        style={{
                                                                            backgroundColor: colorSet.background,
                                                                            border: colorSet.border
                                                                        }}
                                                                    >
                                                                        <span 
                                                                            className={participantChipText}
                                                                            style={{ color: colorSet.text }}
                                                                        >
                                                                            {participant.name}
                                                                        </span>
                                                                        {participant.star && (
                                                                            <span style={{ marginLeft: '4px' }}>
                                                                                <Icon 
                                                                                    path={mdiStarOutline} 
                                                                                    size={0.6} 
                                                                                    color={colorSet.text} 
                                                                                />
                                                                            </span>
                                                                        )}
                                                                    </motion.div>
                                                                )
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )
                            })}
                            
                            {votes.length > 3 && (
                                <div className={moreButtonContainer}>
                                    <button className={moreButton} onClick={() => setShowAll(!showAll)}>
                                        <Icon path={showAll ? mdiMinusBoxOutline : mdiPlusBoxOutline} size={0.7} color="#F64900" />
                                        <span className={moreButtonText}>{showAll ? '접기' : '더보기'}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

