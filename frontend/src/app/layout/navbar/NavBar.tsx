import { useNavigate } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  const navigate = useNavigate()
  return (
    <nav>
      <label className="logo">TaskBender <div className='logo-2'>TB</div></label>
      <ul>
        <li><a className="active" href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Feedback</a></li>
      </ul>
      <div className='signbtn'>
        <button className='sign-in-btn' onClick={() => navigate('sign-in')}>Sign In</button>
        <button className='sign-up-btn' onClick={() => navigate('sign-up')}>Sign Up</button>
      </div>
    </nav>
  )
}

export default NavBar


