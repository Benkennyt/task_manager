import "./AccountSettings.css";
import { useEffect} from "react";
import { useAppDispatch } from "../../../app/stores/stores";
import { getUser } from "../../../app/api/userSlice";
import { useSelector } from "react-redux";

const AccountSettings = () => {
  const { userData } = useSelector((state: any) => state.user)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser(''))
  }, [])


  return (
    <div className={"account-settings-container"}>
      <h4 className="personal-info-h4">Personal Info</h4>
      <div className="name">
        <div className="firstName">
          <h5>
            First Name:
          </h5>
          <p>{userData && userData.data && userData.data.first_name || 'firstname'}</p>

        </div>
        <div className="displayname">
          <h5>
            Username:
          </h5>
          <p>{userData && userData.data && userData.data.username || 'username'}</p>

        </div>

        <div className="userid">
          <h5>
            User ID:
          </h5>
          <p>{userData && userData.data && userData.data.id}</p>
        </div>
      </div>

      <div className="edit-personal-info">
        <button className="btn-transparent" >Edit</button>
      </div>

      <div className="close-my-account">
        <h4 className="personal-info-h4">Delete my account</h4>
        <h5>When you Delete your account:</h5>
        <ul>
          <li>Permanently remove your data from the database.</li>
        </ul>

        <button className="delete-acc">Delete Account</button>
      </div>
    </div>
  );
};

export default AccountSettings;
