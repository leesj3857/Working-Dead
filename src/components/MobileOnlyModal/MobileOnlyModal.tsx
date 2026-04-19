import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import {
  modalOverlay,
  modalContent,
  header,
  headerLogo,
  closeButton,
  closeIcon,
  title,
  divider,
  description,
  phoneContainer,
  phoneImage,
  confirmButton,
} from './MobileOnlyModal.css'

interface MobileOnlyModalProps {
  onClose?: () => void
  onConfirm?: () => void
}

export default function MobileOnlyModal({ onClose, onConfirm }: MobileOnlyModalProps) {
  return (
    <div className={modalOverlay}>
      <div className={modalContent}>
        <div className={header}>
          <img src="/logo_color.png" alt="Scheduly" className={headerLogo} />
          <button className={closeButton} onClick={onClose} aria-label="닫기">
            <Icon path={mdiClose} size={0.9} className={closeIcon} />
          </button>
        </div>

        <span className={title}>모바일에서 이용해 주세요</span>

        <hr className={divider} />

        <p className={description}>
          {`현재 스케쥴리의 투표 기능은 모바일 브라우저에서만\n정상적으로 작동합니다.\nPC에서 접속할 경우 일부 정보가 전달되지 않을 수 있습니다.`}
        </p>

        <div className={phoneContainer}>
          <img src="/phone.png" alt="phone" className={phoneImage} />
        </div>

        <button className={confirmButton} onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  )
}
