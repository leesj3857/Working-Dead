import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/header/Header'
import { appContainer } from './App.css'
import { background, subtle3 } from './style/color.css'
import { DisplayNameProvider } from './context/DisplayNameContext'

function App() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'
  
  return (
    <DisplayNameProvider>
      <div 
        className={appContainer} 
        style={{ backgroundColor: background }}
      >
        <Header />
        <Outlet />
      </div>
    </DisplayNameProvider>
  )
}

export default App
