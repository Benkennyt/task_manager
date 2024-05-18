import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import LandingPage from '../../features/landingPage/LandingPage';
import NavBar from './navbar/NavBar';
import { ACCESS_TOKEN } from '../../constants';

function App() {
  const token = localStorage.getItem(ACCESS_TOKEN)
  const location = useLocation();
  return (
    <div className='App'>
      {location.pathname === '/' ? <LandingPage /> : (
        <>
          {location.pathname === '/' && <NavBar/>}
          <div>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default App
