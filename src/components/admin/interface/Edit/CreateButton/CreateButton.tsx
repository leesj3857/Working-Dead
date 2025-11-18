import { useState } from 'react'
import { createButton, buttonIcon, buttonText } from './CreateButton.css'

export default function CreateButton({ onSaveClick, isEditMode = false }: { onSaveClick: () => void, isEditMode?: boolean }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <button 
            className={createButton}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onSaveClick}
        >
            <img 
                src={isHovered ? "/TickSquareOrange.png" : "/TickSquare.png"} 
                alt="Tick" 
                className={buttonIcon} 
            />
            <span className={buttonText}>{isEditMode ? '투표 수정' : '투표 생성'}</span>
        </button>
    )
}
