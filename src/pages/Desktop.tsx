import { useState } from 'react'
import MobileOnlyModal from '../components/MobileOnlyModal/MobileOnlyModal'

export default function Desktop() {
  const [closeFailed, setCloseFailed] = useState(false)

  const handleClose = () => {
    window.open('', '_self')
    window.close()
    setTimeout(() => {
      if (!window.closed) {
        setCloseFailed(true)
      }
    }, 100)
  }

  return (
    <MobileOnlyModal
      onClose={handleClose}
      onConfirm={handleClose}
      closeFailed={closeFailed}
    />
  )
}
