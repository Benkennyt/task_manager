import { useNavigate } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="not-found">
      <h1 className='four-oo-four'>404</h1>
      <h1 className='pg-nt-fnd'>Uh-oh! Page Not Found</h1>
      <p>We couldn't fint the page you were looking for.</p>
      <p>No worries! Let's get you back to where the real action happens</p>
      <button  onClick={() => navigate('/')}>Home</button>
    </div>
  )
}

export default NotFound