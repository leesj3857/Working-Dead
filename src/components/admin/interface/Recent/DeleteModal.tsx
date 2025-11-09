import { motion, AnimatePresence } from 'framer-motion'
import { modalOverlay, modalContent, deleteIcon, modalTitle, buttonContainer, cancelButton, confirmButton, buttonIcon, buttonText } from './DeleteModal.css'

interface DeleteModalProps {
    onClose: () => void
    onConfirm: () => void
}

export default function DeleteModal({ onClose, onConfirm }: DeleteModalProps) {
    return (
        <AnimatePresence>
            <motion.div 
                className={modalOverlay} 
                onClick={onClose}
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
                    <img src="/Delete.png" alt="Delete" className={deleteIcon} />
                    <h2 className={modalTitle}>일정을 삭제하시겠습니까?</h2>
                    <div className={buttonContainer}>
                        <button className={cancelButton} onClick={onClose}>
                            <img src="/CloseSquare.png" alt="Cancel" className={buttonIcon} />
                            <span className={buttonText}>취소</span>
                        </button>
                        <button className={confirmButton} onClick={onConfirm}>
                            <img src="/TickSquare.png" alt="Confirm" className={buttonIcon} />
                            <span className={buttonText}>확인</span>
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

