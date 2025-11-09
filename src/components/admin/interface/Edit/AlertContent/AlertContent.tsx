import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { alertContainer, alertText } from './AlertContent.css'

interface AlertContentProps {
    message: string
    show: boolean
}

export default function AlertContent({ message, show }: AlertContentProps) {
    const alertRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (show && alertRef.current) {
            alertRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center'
            })
        }
    }, [show])

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    ref={alertRef}
                    className={alertContainer}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <span className={alertText}>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

