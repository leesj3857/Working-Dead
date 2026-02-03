import { useState, useEffect } from 'react'
import {
  nameModalOverlay,
  nameModalContainer,
  nameIcon,
  bubble,
  bubbleText,
  nameInput,
  saveButton,
  saveButtonDisabled,
  saveButtonIcon,
} from './NameModal.css'

interface NameModalProps {
  isOpen: boolean
  initialName?: string
  onSave: (name: string) => void
}

export default function NameModal({ isOpen, initialName, onSave }: NameModalProps) {
  const [name, setName] = useState(initialName ?? '')

  useEffect(() => {
    setName(initialName ?? '')
  }, [initialName])

  if (!isOpen) return null

  const trimmed = name.trim()

  const handleSubmit = () => {
    if (!trimmed) return
    onSave(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className={nameModalOverlay}>
      <div className={nameModalContainer}>
        <img src="/redicon.png" alt="icon" className={nameIcon} />
        <div className={bubble}>
          <p className={bubbleText}>
            {'투표 시 참여자들에게 공유될\n이름을 입력해주세요!'}
          </p>
        </div>
        <input
          className={nameInput}
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="나의 이름"
        />
        <button
          type="button"
          className={trimmed ? saveButton : saveButtonDisabled}
          onClick={handleSubmit}
          disabled={!trimmed}
        >
          <img src="/TickSquare.png" alt="저장" className={saveButtonIcon} />
          <span>저장하기</span>
        </button>
      </div>
    </div>
  )
}

