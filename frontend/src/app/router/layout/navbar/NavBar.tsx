import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <label className="logo">TaskBender</label>
      <ul>
        <li><a className="active" href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Feedback</a></li>
      </ul>
      <div className='signbtn'>
        <button className='sign-in-btn'>Sign In</button>
        <button className='sign-up-btn'>Sign Up</button>
      </div>
    </nav>
  )
}

export default NavBar


