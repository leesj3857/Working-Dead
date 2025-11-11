import { selectUserContainer, userSelectBox, userNamePlaceHolder, 
    goContainer, dropDownContainer, participantChip, participantChipText, 
    userSelectButton, userSelectBoxContent, dropDownContent } from './SelectUser.css'
import { useState, useMemo } from 'react'
import Icon from '@mdi/react';
import { mdiAccountOutline, mdiChevronDown, mdiArrowRight } from '@mdi/js';
import { subtle1, subtle2, accent } from '../../../../../style/color.css'
import { motion, AnimatePresence } from 'framer-motion'
export default function SelectUser({ userList, onNext }: { userList: { id: string, name: string }[], onNext: ({ id }: { id: string }) => void }) {
    const [user, setUser] = useState('')
    const [isOpen, setIsOpen] = useState(true)
    const [isAnimationComplete, setIsAnimationComplete] = useState(false)
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
    
    const selectedUserIndex = useMemo(() => {
        return user ? userList.findIndex(({ id }) => id === user) : -1
    }, [user, userList])
    
    const selectedColorSet = useMemo(() => {
        return selectedUserIndex !== -1 ? getColorSet(selectedUserIndex) : null
    }, [selectedUserIndex])
    
    return (
        <div className={selectUserContainer}>
            <div className={userSelectBox} onClick={() => setIsOpen(!isOpen)}>
                <div className={userSelectBoxContent}>
                    <Icon path={mdiAccountOutline} size={1} color={subtle1} />
                    {!user ? <span className={userNamePlaceHolder}>NAME</span> 
                    : 
                    (
                        <div 
                            className={participantChip}
                            style={{ 
                                backgroundColor: selectedColorSet!.background,
                                border: selectedColorSet!.border,
                                marginLeft: '8px',
                            }}
                        >
                            <span 
                                className={participantChipText}
                                style={{ color: selectedColorSet!.text }}
                            >
                                {userList.find(({ id }) => id === user)?.name}
                            </span>
                        </div>
                    )}
                </div>
                <button className={userSelectButton}>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Icon 
                            path={mdiChevronDown} 
                            size={0.8} 
                            color={subtle1} 
                        />
                    </motion.div>
                </button>
                <AnimatePresence
                    onExitComplete={() => setIsAnimationComplete(false)}
                >
                    {isOpen && (
                        <motion.div 
                            className={dropDownContainer}
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            transition={{ 
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                            onAnimationComplete={() => setIsAnimationComplete(true)}
                            style={{ overflow: 'hidden' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div 
                                className={dropDownContent}
                                style={{ 
                                    overflowY: isAnimationComplete ? 'auto' : 'hidden' 
                                    }}
                                >
                                    {userList.map(({ id, name }, index) => {
                                    const colorSet = getColorSet(index)
                                    return (
                                        <motion.div 
                                            className={participantChip}
                                            key={id}
                                            onClick={() => {
                                                setUser(id)
                                                setIsOpen(false)
                                            }}
                                            style={{ 
                                                backgroundColor: colorSet.background,
                                                border: colorSet.border
                                            }}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ 
                                                duration: 0.2,
                                                delay: index * 0.05,
                                                ease: 'easeOut'
                                            }}
                                        >
                                            <span 
                                                className={participantChipText}
                                                style={{ color: colorSet.text }}
                                            >
                                                {name}
                                            </span>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <motion.div 
                className={goContainer} 
                onClick={() => onNext({ id: user })}
                animate={{
                    backgroundColor: selectedColorSet ? selectedColorSet.background : subtle2
                }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
            >
                <motion.div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    animate={{
                        color: selectedColorSet ? selectedColorSet.text : '#FFFFFF'
                    }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                >
                    <Icon path={mdiArrowRight} size={1} color="currentColor" />
                </motion.div>
            </motion.div>
        </div>
    )
}