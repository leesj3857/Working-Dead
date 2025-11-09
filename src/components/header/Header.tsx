import { useLocation } from 'react-router-dom'
import { header, logo, icon } from './Header.css'

export default function Header() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <header className={header}>
      <img src="/logo.png" alt="When:D Logo" className={logo} />
      <img 
        src={isAdmin ? "/blueicon.png" : "/redicon.png"} 
        alt="Icon" 
        className={icon} 
      />
    </header>
  )
}

