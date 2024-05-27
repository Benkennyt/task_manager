import Sidebar from "./sidebar/Sidebar";
import './Home.css';
import ProfileImage from '../../assets/images/profile-image.png'
import { useEffect, useState } from "react";
import { CloseIcon, HamburgerIcon, TrashIcon } from "../../assets/svg/SVG";
import CreateNewBoards from "../../common/modals/boards/createBoard/CreateNewBoards";
import DeleteBoard from "../../common/modals/boards/deleteBoard/DeleteBoard";
import { useSelector } from "react-redux";
import { USER_DETAILS } from "../../constants";
import UpdateBoard from "../../common/modals/boards/editBoard/UpdateBoard";
import CreateNewTask from "../../common/modals/tasks/createTask/CreateNewTask";
import { useAppDispatch } from "../../app/stores/stores";
import {getTasks } from "../../app/api/taskSlice";
import ViewTask from "../../common/modals/tasks/viewTask/ViewTask";
import DeleteTask from "../../common/modals/tasks/deleteTask/DeleteTask";

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false)
  const [modal, setModal] = useState('')
  const [boardID, setBoardID] = useState('');
  const [boardID2, setBoardID2] = useState('');
  const [boardIndex, setBoardIndex] = useState(null);
  const [taskID, setTaskID] = useState(null);
  const [activeBoard, setActiveBoard] = useState(0)
  const { data } = useSelector((state: any) => state.boards)
  const { data: data1 } = useSelector((state: any) => state.tasks)
  useSelector((state: any) => state.subtasks)
  const dispatch = useAppDispatch();


  const getUserDetails = localStorage.getItem(USER_DETAILS) || ''
  const userDetails = JSON.parse(getUserDetails)

  useEffect(() => {
    if (boardID != '') {
      dispatch(getTasks(boardID))
    }
  }, [boardID])
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
    if (activeBoard != null && data.boardData && data.boardData.data && data.boardData.data[activeBoard]) {
      return capitalizeFirstLetter(data.boardData?.data[activeBoard].name)
    } else if (activeBoard === null && data.boardData && data.boardData.data && data.boardData.data[0]) {
      return capitalizeFirstLetter(data.boardData.data[0].name)
    } else {
      return "Board"
    }
  }

  
 


  const handleSubtasks = (task: any) => {
    const total = task.subtasks.length
    const done = task.subtasks.filter((subtask: any) => subtask.status === true).length
    return (
      <p className="subtasks-count">{`${done} of ${total} subtasks`}</p>
    )
  }

  return (
    <div className="home-cont">
      <Sidebar toggleSideBar={toggleSideBar} handleModals={handleModals} setBoardID={setBoardID} setBoardID2={setBoardID2} setBoardIndex={setBoardIndex} activeBoard={activeBoard} setActiveBoard={setActiveBoard} setToggleSideBar={setToggleSideBar} />
      <CreateNewBoards handleModals={handleModals} modal={modal} activeBoard={activeBoard} setActiveBoard={setActiveBoard} boardID={boardID}  setBoardID={setBoardID}/>
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
                <button disabled={handleBoardNameHeader() === 'Board'} onClick={() => handleModals('newTask')}>+Add New Task</button>
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
                <button disabled={handleBoardNameHeader() === 'Board'} onClick={() => handleModals('newTask')} >+Add New Task</button>
              </div>
              {data && data.boardData && data.boardData.data && data.boardData.data[activeBoard] && data.boardData.data[activeBoard].todo_column && <div className="todo section">
                <div className="content-headers">
                  <p>TODO</p>
                  <div className="line" style={{ backgroundColor: 'gray' }}></div>
                </div>
                <div className="tasks">
                  {data1?.tasksData?.data?.filter((task: { status: string; }) => task.status === 'TODO').length > 0
                    ?
                    (data1?.tasksData?.data?.map((task: any, index: number) => {
                      if (task.status === 'TODO') {

                        return (
                          <div onClick={() => {handleModals('viewTask'), setTaskID(task.id)}} className="task" key={index}>
                            <div className="delete-task-icon" onClick={(e) => e.stopPropagation()}>
                              <div className="delete-task-icon-2" onClick={() => {setTaskID(task.id), handleModals('deleteTask')}}>
                                <TrashIcon/>
                              </div>
                            </div>
                            <p className="task-header">{task.name}</p>
                            {handleSubtasks(task)}
                          </div>
                        );
                      }
                      return null;
                    }))
                    :
                    (<div className="no-task">No <span>TODO</span> task.</div>)}
                </div>
              </div>}

              {data && data.boardData && data.boardData.data && data.boardData.data[activeBoard] && data.boardData.data[activeBoard].overdue_column && <div className="overdue section">
                <div className="content-headers">
                  <p>OVERDUE</p>
                  <div className="line" style={{ backgroundColor: 'rgb(198, 68, 68)' }}></div>
                </div>
                <div className="tasks">
                  {data1?.tasksData?.data?.filter((task: { status: string; }) => task.status === 'OVERDUE').length > 0 ? (data1?.tasksData?.data?.map((task: any, index: number) => {
                    if (task.status === 'OVERDUE') {
                      return (
                        <div onClick={() => {handleModals('viewTask'), setTaskID(task.id)}} className="task" key={index}>
                          <div className="delete-task-icon" onClick={(e) => e.stopPropagation()}>
                            <div className="delete-task-icon-2" onClick={() => {setTaskID(task.id), handleModals('deleteTask')}}>
                              <TrashIcon/>
                            </div>
                          </div>
                          <p className="task-header">{task.name}</p>
                          {handleSubtasks(task)}
                        </div>
                      );
                    }
                    return null;
                  }))
                    :
                    (<div className="no-task">No <span>OVERDUE</span> task.</div>)}
                </div>
              </div>}

              {data && data.boardData && data.boardData.data && data.boardData.data[activeBoard] && data.boardData.data[activeBoard].inprogress_column && <div className="in-progress section">
                <div className="content-headers">
                  <p>IN PROGRESS</p>
                  <div className="line" style={{ backgroundColor: 'rgb(185, 146, 73)' }}></div>
                </div>
                <div className="tasks">
                  {data1?.tasksData?.data?.filter((task: { status: string; }) => task.status === 'INPROGRESS').length > 0 ? (data1?.tasksData?.data?.map((task: any, index: number) => {
                    if (task.status === 'INPROGRESS') {
                      return (
                        <div onClick={() => {handleModals('viewTask'), setTaskID(task.id)}} className="task" key={index}>
                          <div className="delete-task-icon" onClick={(e) => e.stopPropagation()}>
                            <div className="delete-task-icon-2" onClick={() => {setTaskID(task.id), handleModals('deleteTask')}}>
                              <TrashIcon/>
                            </div>
                          </div>
                          <p className="task-header">{task.name}</p>
                          {handleSubtasks(task)}
                        </div>
                      );
                    }
                    return null;
                  }))
                    :
                    (<div className="no-task">No <span>IN-PROGRESS</span> task.</div>)}
                </div>
              </div>}

              {data && data.boardData && data.boardData.data && data.boardData.data[activeBoard] && data.boardData.data[activeBoard].completed_column && <div className="done section">
                <div className="content-headers">
                  <p>COMPLETED</p>
                  <div className="line" style={{ backgroundColor: 'rgb(69, 173, 69)' }}></div>
                </div>

                <div className="tasks">
                  {data1?.tasksData?.data?.filter((task: { status: string; }) => task.status === 'COMPLETED').length > 0 ? (data1?.tasksData?.data?.map((task: any, index: number) => {
                    if (task.status === 'COMPLETED') {
                      return (
                        <div onClick={() => {handleModals('viewTask'), setTaskID(task.id)}} className="task" key={index}>
                          <div className="delete-task-icon" onClick={(e) => e.stopPropagation()}>
                            <div className="delete-task-icon-2" onClick={() => {setTaskID(task.id), handleModals('deleteTask')}}>
                              <TrashIcon/>
                            </div>
                          </div>
                          <p className="task-header">{task.name}</p>
                          {handleSubtasks(task)}
                        </div>
                      );
                    }
                    return null;
                  }))
                    :
                    (<div className="no-task">No <span>COMPLETED</span> task.</div>)}
                </div>
              </div>}
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Home