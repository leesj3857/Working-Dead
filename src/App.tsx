import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/header/Header'
import { appContainer } from './App.css'
import { background, subtle3 } from './style/color.css'

function App() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'
  
  return (
    <div 
      className={appContainer} 
      style={{ backgroundColor: isAdmin ? background : subtle3 }}
    >
      <Header />
      <Outlet />
    </div>
  )
}

export default App
