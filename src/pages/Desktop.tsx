import MobileOnlyModal from '../components/MobileOnlyModal/MobileOnlyModal'

export default function Desktop() {
  const handleClose = () => {
    window.open('', '_self')
    window.close()
  }

  return (
    <MobileOnlyModal
      onClose={handleClose}
      onConfirm={handleClose}
    />
  )
}
