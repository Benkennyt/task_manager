import { useState } from "react";
import "./Settings.css";
import AccountSettings from "./account/AccountSettings";
import Security from "./security/Security";
import { ProfileIcon, SecurityIcon } from "../../assets/svg/SVG";
import { useNavigate } from "react-router-dom";


const Settings = () => {
  const [openSection, setOpenSection] = useState(1);
  const navigate = useNavigate()





  return (
    <div className="settings-container">
      <nav className="home-nav">
        <label onClick={ () => navigate('/home')} className="logo">TaskBender <div className='logo-2'>TB</div></label>
        
      </nav>

      <div className="setting-cont-2">
        <header>
          <h1>Acount Settings</h1>
          <p>Change your profile and account settings</p>
        </header>
        <div className="settings-container-1">
          <div className="side-nav">
            <ul>
              <li className={openSection === 1 ? "active" : ''} onClick={() => { setOpenSection(1) }}>
                <ProfileIcon />
                Account
              </li>
              <li className={openSection === 2 ? "active" : ''} onClick={() => { setOpenSection(2) }}><SecurityIcon /> Security</li>
            </ul>
          </div>
          <div className="main-disp">
            {openSection === 1 ? <AccountSettings /> :
              <Security />}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;
