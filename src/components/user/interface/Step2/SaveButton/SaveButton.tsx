import { useState } from 'react'
import { saveButton, buttonIcon, buttonText } from './SaveButton.css'

export default function SaveButton({ onSaveClick }: { onSaveClick: () => void }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <button 
            className={saveButton}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onSaveClick}
        >
            <img 
                src={isHovered ? "/TickSquareOrange.png" : "/TickSquare.png"} 
                alt="Tick" 
                className={buttonIcon} 
            />
            <span className={buttonText}>저장하기</span>
        </button>
    )
}
