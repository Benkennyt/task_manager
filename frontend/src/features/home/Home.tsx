import Sidebar from "./sidebar/Sidebar";
import './Home.css';
import ProfileImage from '../../assets/images/profile-image.png';
import { useState } from "react";
import { CloseIcon, HamburgerIcon, TrashIcon } from "../../assets/svg/SVG";
import CreateNewBoards from "../../common/modals/boards/createBoard/CreateNewBoards";
import DeleteBoard from "../../common/modals/boards/deleteBoard/DeleteBoard";
import { useSelector } from "react-redux";
import { USER_DETAILS } from "../../constants";
import UpdateBoard from "../../common/modals/boards/editBoard/UpdateBoard";
import CreateNewTask from "../../common/modals/tasks/createTask/CreateNewTask";
import ViewTask from "../../common/modals/tasks/viewTask/ViewTask";
import DeleteTask from "../../common/modals/tasks/deleteTask/DeleteTask";

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [modal, setModal] = useState<string>('');
  const [boardID, setBoardID] = useState<string>('');
  const [boardID2, setBoardID2] = useState<string>('');
  const [boardIndex, setBoardIndex] = useState<number | null>(null);
  const [taskID, setTaskID] = useState<string>('');
  const [activeBoard, setActiveBoard] = useState<number>(0);

  const { data } = useSelector((state: any) => state.boards);
 

  const getUserDetails = localStorage.getItem(USER_DETAILS) || ''
  const userDetails = JSON.parse(getUserDetails)
  const handleToggle = () => setToggleSideBar(prev => !prev);


  const handleModals = (id: string) => {
    if (id === 'alert') {
      alert("Please create a board first");
    } else {
      setModal(prev => (prev === '' ? id : ''));
    }
      // or
      // if (modal === '') {
      //   setModal(id)
      // } else {
      //   setModal('')
      // }
    
  }


  const capitalizeFirstLetter = (name: string) => {
    const words = name.split(' ')

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1)
    }
    return words.join(" ")
  }

  const handleBoardNameHeader = () => {
    if (data.boardData?.data?.[activeBoard]) {
      return capitalizeFirstLetter(data.boardData.data[activeBoard].name);
    } else if (data.boardData?.data?.[0]) {
      return capitalizeFirstLetter(data.boardData.data[0].name);
    }
  };
  
 


  const handleSubtasks = (task: any) => {
    const total = task.subtasks.length;
    const done = task.subtasks.filter((subtask: any) => subtask.status === true).length;
    return (
      <p className="subtasks-count">{`${done} of ${total} subtasks`}</p>
    )
  }

  return (
    <div className="home-cont">
      <Sidebar toggleSideBar={toggleSideBar} handleModals={handleModals} setBoardID={setBoardID} setBoardID2={setBoardID2} setBoardIndex={setBoardIndex} activeBoard={activeBoard} setActiveBoard={setActiveBoard} setToggleSideBar={setToggleSideBar} />
      <CreateNewBoards handleModals={handleModals} modal={modal} setActiveBoard={setActiveBoard}/>
      <DeleteBoard handleModals={handleModals} modal={modal} boardID2={boardID2} setActiveBoard={setActiveBoard} />
      <UpdateBoard handleModals={handleModals} modal={modal} boardID2={boardID2} boardIndex={boardIndex} />
      <CreateNewTask handleModals={handleModals} modal={modal} boardID={boardID} activeBoard={activeBoard}  />
      <ViewTask handleModals={handleModals} modal={modal} taskID={taskID} boardID={boardID} activeBoard={activeBoard}/>
      <DeleteTask handleModals={handleModals} modal={modal} taskID={taskID} boardID={boardID}/>


      <div className="home-cont-2">
        <div className="board-cont">
          <div className="board-cont-header">
            <div className="board-cont-header-2">
              <div className="add-new-task">
                <label className="logo">
                  <div className='logo-2'>TB</div>
                </label>
                <h2>{handleBoardNameHeader()}</h2>
                <button className={handleBoardNameHeader() === 'Board Name' ? 'btn-diabled' : ''} onClick={() => handleModals(handleBoardNameHeader() === 'Board Name' ? 'alert' : 'newTask')}>+Add New Task</button>
              </div>
              <div className="profile">
                <p>Welcome, {capitalizeFirstLetter(userDetails.username)}</p>
                <img src={ProfileImage} alt="profile image" />
                <div className="nav-btn">
                  <button className="button-one" onClick={() => handleToggle()}>
                    {toggleSideBar ? <CloseIcon /> : <HamburgerIcon />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="board-contents">
            <div className="board-contents-2">
              <div className="add-new-task">
                <button 
                  className={handleBoardNameHeader() === 'Board Name' ? 'btn-disabled' : ''} 
                  onClick={() => handleModals(handleBoardNameHeader() === 'Board Name' ? 'alert' : 'newTask')}
                >
                  +Add New Task
                </button>
              </div>
              {['todo_column', 'overdue_column', 'inprogress_column', 'completed_column'].map((column, index) => {
                if (data.boardData?.data?.[activeBoard]?.[column]) {
                  const columnTasks = data?.boardData?.data?.[activeBoard]?.tasks.filter((task: any) => task.status.toUpperCase() === column.split('_')[0].toUpperCase()) || [];
                  return (
                    <div key={index} className={`${column} section`}>
                      <div className="content-headers">
                        <p>{column.split('_').join(' ').toUpperCase()}</p>
                        <div className="line" style={{ backgroundColor: column === 'todo_column' ? 'gray' : column === 'overdue_column' ? 'rgb(198, 68, 68)' : column === 'inprogress_column' ? 'rgb(185, 146, 73)' : 'rgb(69, 173, 69)' }}></div>
                      </div>

                      <div className="tasks">
                        {columnTasks.length > 0 ? (
                          columnTasks.map((task: any, taskIndex: number) => (
                            <div key={taskIndex} onClick={() => { handleModals('viewTask'); setTaskID(task.id); }} className="task">
                              <div className="delete-task-icon" onClick={(e) => e.stopPropagation()}>
                                <div className="delete-task-icon-2" onClick={() => { setTaskID(task.id); handleModals('deleteTask'); }}>
                                  <TrashIcon />
                                </div>
                              </div>
                              <p className="task-header">{task.name}</p>
                              {handleSubtasks(task)}
                            </div>
                          ))
                        ) : (
                          <div className="no-task">No <span>{column.split('_').join(' ').toUpperCase()}</span> task.</div>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Home