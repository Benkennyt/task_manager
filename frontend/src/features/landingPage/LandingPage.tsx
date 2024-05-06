
import './LandingPage.css';
import ImageForLandpg from "../../assets/svg/undraw_completed_tasks_vs6q.svg"
import NavBar from '../../app/layout/navbar/NavBar';

const LandingPage = () => {
  return (
    <div className="landn-pg-cont">
      <NavBar/>
      <div className="landn-pg-cont-2">
        <section className="intro">
          <h1>Manage Your Task</h1>
          <br /> 
          <h1>Fuel Your Progress</h1> 
          <br /> 
          <h1>Increase Your Productivity</h1>
          
          <p> 
            <span>TaskBender</span> is the ultimate task management solution designed to help you stay organized, focused, and productive. With intuitive features and seamless integration, managing your tasks has never been easier.
          </p>
          <button className="get-started">Get Started</button>
        </section>
        <img src={ImageForLandpg} alt="" />
      </div>
    </div>
  )
}

export default LandingPage