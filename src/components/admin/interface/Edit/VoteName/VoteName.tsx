import { useState } from 'react'
import { motion } from 'framer-motion'
import { voteNameContainer, voteIcon, voteTitle, 
    voteDescription, voteInput, voteLabel, voteInputField, voteTitleContainer } from './VoteName.css'

export default function VoteName({ voteName, setVoteName, isEditMode = false }: { voteName: string, setVoteName: (voteName: string) => void, isEditMode?: boolean }) {
    const [isFocused, setIsFocused] = useState(false)

    const isActive = isFocused || voteName.length > 0

    return (
        <div className={voteNameContainer}>
            <div className={voteTitleContainer}>
                <img src="/BlueFlake.png" alt="Blue Flake" className={voteIcon} />
                <span className={voteTitle}>{isEditMode ? '투표 수정' : '새 투표 생성'}</span>
            </div>
            <span className={voteDescription}>투표 이름을 입력해주세요.</span>
            <div className={voteInput}>
                <motion.span 
                    className={voteLabel}
                    animate={{
                        top: isActive ? '5px' : '50%',
                        translateY: isActive ? '0%' : '-50%',
                        fontSize: isActive ? '11px' : '17px',
                    }}
                    transition={{ duration: 0.1, ease: 'easeOut' }}
                >
                    투표 이름
                </motion.span>
                <input 
                    type="text" 
                    className={voteInputField}
                    value={voteName}
                    onChange={(e) => setVoteName(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
        </div>
    )
}