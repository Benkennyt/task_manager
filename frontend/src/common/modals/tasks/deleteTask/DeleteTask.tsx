import ReactModal from 'react-modal';
import './DeleteBoard.css'
import { useAppDispatch } from '../../../../app/stores/stores';
import { deleteBoard, getBoards } from '../../../../app/api/boardSlice';
import { useSelector } from 'react-redux';
import { CloseIcon, TrashIcon } from '../../../../assets/svg/SVG';
import { useEffect, useState } from 'react';
import SuccessIcon from "../../../../assets/svg/success_icon.svg";

const DeleteBoard = (props:any) => {
    const {deleteBoardModal, handleModals, boardID} = props   
    const [boardDeleted, setBoardDeleted] = useState(false)
    const {data, isError, isLoading } = useSelector((state:any) => state.boards)

    const dispatch = useAppDispatch()

    const handleDeleteBoard = () => {
        dispatch(deleteBoard(boardID))
    }

    useEffect(() => {
        if (data.deleteBoardData.status === 204) {
            setBoardDeleted(true)
        }
    }, [isLoading.isDeleteBoardLoading])
    

  return (
    <ReactModal
    isOpen={deleteBoardModal}
    contentLabel="delete board modal"
    shouldCloseOnOverlayClick={true}
    shouldCloseOnEsc={true}
    shouldReturnFocusAfterClose={true}
    preventScroll={true}
    ariaHideApp={false}
    id='delete-board-modal'
    >
        {boardDeleted ? 
        <div className="board-deleted">
            <button onClick={() => {handleModals("deleteBoard"), dispatch(getBoards()), setBoardDeleted(false)}}><CloseIcon/></button>
            <img src={SuccessIcon} />
            <p>Board successfully deleted.</p>
        </div> : 
        isError.isDeleteBoardError ? <div className="delete-error"></div> :
        <>
            <TrashIcon />
            <h3>You are about to delete a board</h3>
            <p>This will delete your board permanently</p>
            <p className='ar-u-sr'>Are you sure?</p>
            <div className="delete-btns">
              <button onClick={() => handleModals('deleteBoard')}>Cancel</button>
              {isLoading.isDeleteBoardLoading ? <button>
                          <i className="fa fa-spinner fa-spin"></i>Deleting...
                        </button> : <button  onClick={() => handleDeleteBoard()} >
                          Delete
                        </button>}
            </div>
        </>}
       
  </ReactModal>
  )
}

export default DeleteBoard