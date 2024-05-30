import ReactModal from 'react-modal';
import './DeleteTask.css'
import { useAppDispatch } from '../../../../app/stores/stores';

import { useSelector } from 'react-redux';
import { CloseIcon, TrashIcon } from '../../../../assets/svg/SVG';
import { useEffect, useState } from 'react';
import SuccessIcon from "../../../../assets/svg/success_icon.svg";
import { deleteTask, getTasks } from '../../../../app/api/taskSlice';
import errIcon from "../../../../assets/svg/errIcon.svg";

interface DeleteTaskProps {
  handleModals: (modalType: string) => void;
  taskID: string;
  modal: string;
  boardID: string;
}

const DeleteTask = (props:DeleteTaskProps) => {
    const { handleModals, taskID, modal, boardID} = props   
    const [taskDeleted, setTaskDeleted] = useState(false);
    const [modalReset, setModalReset] = useState(false);
    const {isError, isLoading } = useSelector((state:any) => state.tasks);
    const dispatch = useAppDispatch()

    useEffect(() => {
      if(modal === 'deleteTask') {
        setModalReset(false)
      }
    }, [modal])

    const values = {
      boardID:boardID,
      taskID:taskID
    };

    const handleDeleteTask = () => {
      dispatch(deleteTask(values)).
      then((res) => {
        if (res.payload.status === 204){
          dispatch(getTasks(boardID))
          setTaskDeleted(true)
        }
      })
    };
    
    const handleTaskDeleteBtn =() => {
      handleModals("deleteTask")
      setTaskDeleted(false)
      setModalReset(true)
    }

    const renderSuccessMessage = () => (
      <div className="successful-201">
        <div onClick={() => handleTaskDeleteBtn()} className="close-successful-modal">
          <CloseIcon />
        </div>
        <img src={SuccessIcon} alt="success Icon" />
        <h3>SUCCESS!</h3>
        <p>Task deleted successfully.</p>
      </div>
    );
  
    const renderErrorMessage = () => (
      <div className="err-mdal">
        <div className="err-hd-closebtn">
          <div onClick={() => handleTaskDeleteBtn()} className="close-err-modal">
            <CloseIcon />
          </div>
        </div>
        <img src={errIcon} alt="error icon" />
        <h3>ERROR!</h3>
        <p>An error occurred while trying to delete the task.</p>
      </div>
    );

    const renderDeleteConfirmation = () => (
      <>
        <div className='trash'>
          <TrashIcon />
        </div>
        <p>You are about to delete a task</p>
        <p className='ar-u-sr'>Are you sure?</p>
        <div className="delete-btns">
          <button onClick={() => handleModals('deleteTask')}>Cancel</button>
          {isLoading?.isDeleteTaskLoading ? (
            <button>
              <i className="fa fa-spinner fa-spin"></i>Deleting...
            </button>
          ) : (
            <button onClick={() => handleDeleteTask()}>
              Delete
            </button>
          )}
        </div>
      </>
    );
  
    return (
      <ReactModal
        isOpen={modal === 'deleteTask'}
        contentLabel="delete task modal"
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        shouldReturnFocusAfterClose
        preventScroll
        ariaHideApp={false}
        id='delete-task-modal'
      >
        {!modalReset && taskDeleted ? renderSuccessMessage() : !modalReset && isError?.isDeleteTaskError ? renderErrorMessage() : renderDeleteConfirmation()}
      </ReactModal>
    );
}

export default DeleteTask