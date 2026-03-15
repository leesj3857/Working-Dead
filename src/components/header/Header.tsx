import { useLocation } from 'react-router-dom'
import { header, logo, icon, name, nameContainer } from './Header.css'
import { useDisplayName } from '../../context/DisplayNameContext'

export default function Header() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'
  const { displayName } = useDisplayName()

  return (
    <header className={header}>
      <img src="/scheduly-logo-v2.svg" alt="When:D Logo" className={logo} />
      <div className={nameContainer}>
        <span className={name}>{displayName || 'Name'}</span>
        <img 
          src={isAdmin ? "/blueicon.png" : "/redicon.png"} 
          alt="Icon" 
          className={icon} 
        />
      </div>
    </header>
  )
}

