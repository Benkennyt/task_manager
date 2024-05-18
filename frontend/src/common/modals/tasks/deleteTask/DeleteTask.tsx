import ReactModal from 'react-modal';
import './DeleteTask.css'
import { useAppDispatch } from '../../../../app/stores/stores';

import { useSelector } from 'react-redux';
import { CloseIcon, TrashIcon } from '../../../../assets/svg/SVG';
import { useEffect, useState } from 'react';
import SuccessIcon from "../../../../assets/svg/success_icon.svg";
import { deleteTask, getTasks } from '../../../../app/api/taskSlice';
import errIcon from "../../../../assets/svg/errIcon.svg";

const DeleteTask = (props:any) => {
    const { handleModals, taskID, modal, boardID} = props   
    const [taskDeleted, setTaskDeleted] = useState(false)
    const {data, isError, isLoading } = useSelector((state:any) => state.tasks)
    const values = {
      boardID:boardID,
      taskID:taskID
    }

    const dispatch = useAppDispatch()

    const handleDeleteTask = () => {
        dispatch(deleteTask(values))
        setTimeout(() => {
          dispatch(getTasks(boardID))
        }, 100)
        
    }

    useEffect(() => {
        if (data.deleteTaskData.status === 204) {
            setTaskDeleted(true)
        }
    }, [isLoading.isDeleteTaskLoading])
    
    const handleTaskDeleteBtn =() => {
      handleModals("deleteTask")
      setTaskDeleted(false)
    }

  return (
    <ReactModal
    isOpen={modal === 'deleteTask'}
    contentLabel="delete task modal"
    shouldCloseOnOverlayClick={true}
    shouldCloseOnEsc={true}
    shouldReturnFocusAfterClose={true}
    preventScroll={true}
    ariaHideApp={false}
    id='delete-task-modal'
    >
        {taskDeleted ? 
        
        <div className="successful-201">
        <div onClick={() => {handleTaskDeleteBtn()}} className="close-successful-modal">
            <CloseIcon />
        </div>
        <img src={SuccessIcon} alt="success Icon" />
        <h3>SUCCESS!</h3>
        <p>Task deleted successfully.</p>
    </div>
        
        : 
        isError.isDeleteTaskError ? 
          <div className="err-mdal">
            <div className="err-hd-closebtn">
              <div onClick={() => { { handleTaskDeleteBtn() } }} className="close-err-modal">
                <CloseIcon />
              </div>
            </div>
            <img src={errIcon} alt="error icon" />
            <h3>ERROR!</h3>
            <p>An error occured while trying to delete task.</p>
          </div>
          :
        <>
            <div className='trash'>
              <TrashIcon />
            </div>
            <p>You are about to delete a task</p>
            <p className='ar-u-sr'>Are you sure?</p>
            <div className="delete-btns">
              <button onClick={() => handleModals('deleteTask')}>Cancel</button>
              {isLoading.isDeleteTaskLoading ? <button>
                          <i className="fa fa-spinner fa-spin"></i>Deleting...
                        </button> : <button  onClick={() => handleDeleteTask()} >
                          Delete
                        </button>}
            </div>
        </>}
       
  </ReactModal>
  )
}

export default DeleteTask