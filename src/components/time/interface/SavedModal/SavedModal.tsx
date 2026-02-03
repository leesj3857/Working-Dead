import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@mdi/react'
import { mdiSquareEditOutline, mdiExitToApp, mdiClockTimeThreeOutline } from '@mdi/js'
import { 
    modalOverlay, 
    modalContent, 
    checkIconWrapper,
    checkIcon,
    modalTitle, 
    buttonContainer, 
    editButton, 
    exitButton, 
    buttonIcon, 
    buttonText 
} from './SavedModal.css'

interface SavedModalProps {
    onEdit: () => void
    onExit: () => void
}

export default function SavedModal({ onEdit, onExit }: SavedModalProps) {

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
                        <Icon path={mdiClockTimeThreeOutline} size={1.5} className={checkIcon} />
                    </div>
                    <span className={modalTitle}>시간이 저장되었습니다!</span>

                    <div className={buttonContainer}>
                        <button className={editButton} onClick={onEdit}>
                            <Icon path={mdiSquareEditOutline} size={0.8} className={buttonIcon} />
                            <span className={buttonText}>수정하기</span>
                        </button>
                        <button className={exitButton} onClick={onExit}>
                            <Icon path={mdiExitToApp} size={0.8} className={buttonIcon} />
                            <span className={buttonText}>채팅으로</span>
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

