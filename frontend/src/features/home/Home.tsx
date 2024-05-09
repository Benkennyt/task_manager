import Sidebar from "./sidebar/Sidebar";
import './Home.css';
import ProfileImage from '../../assets/images/profile-image.jpg'
import { useState } from "react";
import { CloseIcon, HamburgerIcon } from "../../assets/svg/SVG";
import CreateNewBoards from "../../common/modals/boards/createBoard/CreateNewBoards";
import DeleteBoard from "../../common/modals/boards/deleteBoard/DeleteBoard";
import { useSelector } from "react-redux";
import { USER_DETAILS } from "../../constants";
import UpdateBoard from "../../common/modals/boards/editBoard/UpdateBoard";
import CreateNewTask from "../../common/modals/tasks/createTask/CreateNewTask";

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false)
  const [modal, setModal] = useState('')
  const [boardID, setBoardID] = useState('');
  const [boardIndex, setBoardIndex] = useState(null);
  const [activeBoard, setActiveBoard] = useState(null)
  const {data } = useSelector((state:any) => state.boards)
  // const {data, isError, isLoading } = useSelector((state:any) => state.users)
  // const dispatch = useAppDispatch()

  const getUserDetails = localStorage.getItem(USER_DETAILS) || ''
  const userDetails = JSON.parse(getUserDetails)

  const handleToggle = () => {
    if (toggleSideBar) {
        setToggleSideBar(false)
    } else {
      setToggleSideBar(true)
    }
  }


  const handleModals = (id: string) => {
    if (modal === '') {
      setModal(id)
    } else {
      setModal('')
    }
  }

  const capitalizeFirstLetter = (name: string) => {
    const words = name.split(' ')

    for (let i = 0; i < words.length; i++) {
     words[i] = words[i][0].toUpperCase() + words[i].slice(1) 
     }
      return words.join(" ")
    }

  const handleBoardNameHeader = () => {
    if (activeBoard != null && data.boardData && data.boardData.data) {
      return capitalizeFirstLetter(data.boardData?.data[activeBoard].name)
    } else if (activeBoard === null && data.boardData && data.boardData.data && data.boardData.data[0]){
      return capitalizeFirstLetter(data.boardData.data[0].name)
    } else if (!data.boardData){
      return "Board"
    }
  }
  
  
  console.log(boardID)

  return (
    <div className="home-cont">
      <Sidebar toggleSideBar={toggleSideBar} handleModals={handleModals} setBoardID={setBoardID} boardID={boardID} boardIndex={boardIndex} setBoardIndex={setBoardIndex} activeBoard={activeBoard} setActiveBoard={setActiveBoard} setToggleSideBar={setToggleSideBar}/>
      <CreateNewBoards handleModals={handleModals}  modal={modal}/>
      <DeleteBoard handleModals={handleModals}  modal={modal} boardID={boardID} />
      <UpdateBoard handleModals={handleModals}  modal={modal} boardID={boardID} boardIndex={boardIndex} />
      <CreateNewTask handleModals={handleModals}  modal={modal} boardID={boardID}/>
      <div className="home-cont-2">
        <div className="board-cont">
          <div className="board-cont-header">
            <div className="board-cont-header-2">
              <div className="add-new-task">
                <label className="logo">
                  <div className='logo-2'>TB</div>
                </label>
                  <h2>{handleBoardNameHeader()}</h2>
                  <button onClick={() => handleModals('newTask')}>+Add New Task</button>
              </div>
              <div className="profile">
                  <p>Welcome, {capitalizeFirstLetter(userDetails.username)}</p>
                  <img src={ProfileImage} alt="" />
                  <div className="nav-btn">
                    <button className="button-one" onClick={() => handleToggle()}>
                      {toggleSideBar ? <CloseIcon/> : <HamburgerIcon/>}
                    </button>
                  </div>
              </div>
            </div>
          </div>

          <div className="board-contents">
            <div className="board-contents-2">
              <div className="add-new-task">
                <button>+Add New Task</button>
              </div>
              <div className="todo section">
                <div className="content-headers">
                  <p>TODO</p>
                  <div className="line" style={{backgroundColor: 'gray'}}></div>
                </div>
                <div className="tasks">
                  <div className="task">
                    <p className="task-header">Build UI for onboarding flow </p>
                    <p className="substacks-count">0 of 3 substasks</p>
                  </div>
                  <div className="task">
                    <p className="task-header">Build UI for onboarding flow </p>
                    <p className="substacks-count">0 of 3 substasks</p>
                  </div>
                  <div className="task">
                    <p className="task-header">Build UI for onboarding flow </p>
                    <p className="substacks-count">0 of 3 substasks</p>
                  </div>
                  <div className="task">
                    <p className="task-header">Build UI for onboarding flow </p>
                    <p className="substacks-count">0 of 3 substasks</p>
                  </div>
                  <div className="task">
                    <p className="task-header">Build UI for onboarding flow </p>
                    <p className="substacks-count">0 of 3 substasks</p>
                  </div>
                </div>
              </div>

              <div className="overdue section">
                <div className="content-headers">
                  <p>OVERDUE</p>
                  <div className="line" style={{backgroundColor: 'rgb(198, 68, 68)'}}></div>
                </div>
                <div className="tasks">
                  <div className="task">
                    <p className="task-header">Build UI for onboarding flow</p>
                    <p className="substacks-count">0 of 3 substasks</p>
                  </div>
                </div>
              </div>

              <div className="in-progress section">
                <div className="content-headers">
                  <p>IN PROGRESS</p>
                  <div className="line" style={{backgroundColor: 'rgb(185, 146, 73)'}}></div>
                </div>
                <div className="tasks">
                  <div className="task">
                    <p className="task-header">Build UI for onboarding flow</p>
                    <p className="substacks-count">0 of 3 substasks</p>
                  </div>
                </div>
              </div>

              <div className="done section">
                <div className="content-headers">
                  <p>COMPLETED</p>
                  <div className="line" style={{backgroundColor: 'rgb(69, 173, 69)'}}></div>
                </div>

                <div className="tasks">
                  <div className="task">
                    <p className="task-header">Build UI for onboarding flow</p>
                    <p className="substacks-count">0 of 3 substasks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default Home