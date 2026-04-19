import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/header/Header'
import { appContainer } from './App.css'
import { background } from './style/color.css'
import { DisplayNameProvider } from './context/DisplayNameContext'
import { isMobileDevice } from './utils/device'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/desktop') return
    if (!isMobileDevice()) {
      navigate('/desktop', {
        replace: true,
        state: { from: location.pathname + location.search },
      })
    }
  }, [location.pathname, location.search, navigate])

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
