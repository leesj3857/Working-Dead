import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@mdi/react'
import { mdiCheck, mdiSquareEditOutline, mdiHomeVariant, mdiContentCopy } from '@mdi/js'
import { 
    modalOverlay, 
    modalContent, 
    checkIconWrapper,
    checkIcon,
    modalTitle, 
    shareSection,
    shareTitle,
    linkContainer,
    copyIcon,
    linkText,
    shareButton,
    shareIcon,
    buttonContainer, 
    editButton, 
    homeButton, 
    buttonIcon, 
    buttonText 
} from './SavedModal.css'

interface SavedModalProps {
    onEdit: () => void
    onHome: () => void
    shareLink: string
}

export default function SavedModal({ onEdit, onHome, shareLink }: SavedModalProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(shareLink)
    }

    const handleShare = () => {
        // 공유 기능 구현
        if (navigator.share) {
            navigator.share({
                title: '약속 공유',
                url: shareLink
            })
        }
    }

    return (
        <AnimatePresence>
            <motion.div 
                className={modalOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div 
                    className={modalContent} 
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                    <div className={checkIconWrapper}>
                        <Icon path={mdiCheck} size={1.5} className={checkIcon} />
                    </div>
                    <h2 className={modalTitle}>투표가 저장되었습니다!</h2>
                    
                    <div className={shareSection}>
                        <span className={shareTitle}>약속 공유하기</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div className={linkContainer}>
                                <div onClick={handleCopy} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                    <Icon path={mdiContentCopy} size={0.75} className={copyIcon} />
                                </div>
                                <span className={linkText}>{shareLink}</span>
                            </div>
                            <button className={shareButton} onClick={handleShare}>
                                <img src="/Send.png" alt="Share" className={shareIcon} />
                            </button>
                        </div>
                    </div>

                    <div className={buttonContainer}>
                        <button className={editButton} onClick={onEdit}>
                            <Icon path={mdiSquareEditOutline} size={0.8} className={buttonIcon} />
                            <span className={buttonText}>수정하기</span>
                        </button>
                        <button className={homeButton} onClick={onHome}>
                            <Icon path={mdiHomeVariant} size={0.8} className={buttonIcon} />
                            <span className={buttonText}>돌아가기</span>
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

