import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import LandingPage from '../../../features/landingPage/LandingPage'
import NavBar from './navbar/NavBar'

function App() {
  const location = useLocation();
  return (
    <div className='App'>
      {location.pathname === '/' ? <LandingPage /> : (
        <>
          {location.pathname != '/sign-up' && location.pathname != '/sign-in' && <NavBar/>}
          <div>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default App
