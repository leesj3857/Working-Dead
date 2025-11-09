import { useState } from 'react'
import { 
    participantContainer, 
    participantTitle, 
    participantDescription, 
    participantTitleContainer,
    participantList,
    participantItem,
    participantChip,
    participantChipText,
    participantActions,
    iconButton,
    participantInput,
    participantInputField,
    participantInputWrapper,
    saveButton,
    addButton,
    addButtonText
} from './EditParticipant.css'
import Icon from '@mdi/react';
import { mdiPlus, mdiPencil, mdiDelete, mdiCheck, mdiClose } from '@mdi/js';
import { accent } from '../../../../../style/color.css'

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


export default function EditParticipant({ participants, setParticipants }: { participants: string[], setParticipants: (participants: string[]) => void }) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [editValue, setEditValue] = useState<string>('')

    const handleAddParticipant = () => {
        setParticipants([...participants, ''])
        setEditingIndex(participants.length)
        setEditValue('')
    }

    const handleDeleteParticipant = (index: number) => {
        const newParticipants = participants.filter((_, i) => i !== index)
        setParticipants(newParticipants)
        if (editingIndex === index) {
            setEditingIndex(null)
            setEditValue('')
        }
    }

    const handleEditParticipant = (index: number) => {
        setEditingIndex(index)
        setEditValue(participants[index])
    }

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            if (editValue.trim()) {
                // 이름이 있으면 저장
                const newParticipants = [...participants]
                newParticipants[editingIndex] = editValue.trim()
                setParticipants(newParticipants)
                setEditingIndex(null)
                setEditValue('')
            } else {
                // 이름이 빈 문자열이면 아무것도 안함 (체크 눌러도 무시)
                return
            }
        }
    }

    const handleCancelEdit = () => {
        if (editingIndex !== null) {
            if (!participants[editingIndex]) {
                // 새로 추가하려다 취소한 경우 (빈 항목) 제거
                const newParticipants = participants.filter((_, i) => i !== editingIndex)
                setParticipants(newParticipants)
            }
        }
        setEditingIndex(null)
        setEditValue('')
    }

    const getColorSet = (index: number) => {
        return colorSets[index % colorSets.length]
    }

    return (
        <div className={participantContainer}>
            <div className={participantTitleContainer}>
                <span className={participantTitle}>이름 입력</span>
            </div>
            <span className={participantDescription}>약속 참여자들의 이름을 입력해주세요.</span>
            
            <div className={participantList}>
                {participants.map((participant, index) => {
                    const colorSet = getColorSet(index)
                    const isEditing = editingIndex === index
                    
                    return (
                        <div key={index} className={participantItem}>
                            {isEditing ? (
                                <div className={participantInputWrapper}>
                                    <div className={participantInput}>
                                        <input 
                                            type="text" 
                                            placeholder="이름을 입력해주세요." 
                                            className={participantInputField}
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    handleSaveEdit()
                                                } else if (e.key === 'Escape') {
                                                    e.preventDefault()
                                                    handleCancelEdit()
                                                }
                                            }}
                                            autoFocus
                                        />
                                    </div>
                                    <div className={participantActions}>
                                        <button 
                                            className={saveButton}
                                            onClick={handleSaveEdit}
                                            onMouseDown={(e) => e.preventDefault()} // blur 이벤트보다 먼저 실행되도록
                                        >
                                            <Icon path={mdiCheck} size={0.9} color="#6E6A68" />
                                        </button>
                                        <button 
                                            className={iconButton}
                                            onClick={() => handleCancelEdit()}
                                        >
                                            <Icon path={mdiClose} size={0.8} color="#6E6A68" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div 
                                    className={participantChip}
                                    style={{ 
                                        backgroundColor: colorSet.background,
                                        border: colorSet.border
                                    }}
                                >
                                    <span 
                                        className={participantChipText}
                                        style={{ color: colorSet.text }}
                                    >
                                        {participant}
                                    </span>
                                </div>
                            )}
                            {!isEditing && (
                                <div className={participantActions}>
                                    <button 
                                        className={iconButton}
                                        onClick={() => handleEditParticipant(index)}
                                    >
                                        <Icon path={mdiPencil} size={0.8} color="#6E6A68" />
                                    </button>
                                    <button 
                                        className={iconButton}
                                        onClick={() => handleDeleteParticipant(index)}
                                    >
                                        <Icon path={mdiDelete} size={0.8} color="#6E6A68" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <button className={addButton} onClick={handleAddParticipant}>
                <Icon path={mdiPlus} size={1} />
                <span className={addButtonText}>참여자 추가</span>
            </button>
        </div>
    )
}


