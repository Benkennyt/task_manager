import ReactModal from 'react-modal';
import './DeleteBoard.css'
import { useAppDispatch } from '../../../../app/stores/stores';
import { deleteBoard, getBoards } from '../../../../app/api/boardSlice';
import { useSelector } from 'react-redux';
import { CloseIcon, TrashIcon } from '../../../../assets/svg/SVG';
import { useEffect, useState } from 'react';
import SuccessIcon from "../../../../assets/svg/success_icon.svg";
import errIcon from "../../../../assets/svg/errIcon.svg";

const DeleteBoard = (props: any) => {
  const { modal, handleModals, boardID2, setActiveBoard } = props
  const [boardDeleted, setBoardDeleted] = useState(false)
  const [modalReset, setModalReset] = useState(false)
  const { data, isError, isLoading } = useSelector((state: any) => state.boards)

  const dispatch = useAppDispatch()

  const handleDeleteBoard = () => {
    dispatch(deleteBoard(boardID2))

  }

  useEffect(() => {
    if (data.deleteBoardData.status === 204) {
      setBoardDeleted(true)
    }
  }, [isLoading.isDeleteBoardLoading])


  return (
    <ReactModal
      isOpen={modal == 'deleteBoard'}
      contentLabel="delete board modal"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldReturnFocusAfterClose={true}
      preventScroll={true}
      ariaHideApp={false}
      id='delete-board-modal'
    >
      {boardDeleted ?

        <div className="successful-201">
          <div onClick={() => { handleModals("deleteBoard"), dispatch(getBoards()), setBoardDeleted(false), setModalReset(true) }} className="close-successful-modal">
            <CloseIcon />
          </div>
          <img src={SuccessIcon} alt="success Icon" />
          <h3>Board deleted</h3>
        </div>

        :
        isError.isDeleteBoardError ? <div className="err-mdal">
          <div className="err-hd-closebtn">
            <div onClick={() => { handleModals("deleteBoard"), dispatch(getBoards()), setBoardDeleted(false) }} className="close-err-modal">
              <CloseIcon />
            </div>
          </div>
          <img src={errIcon} alt="error icon" />
          <p>An error occured while trying to delete board.</p>
        </div> :
          <>
            <TrashIcon />
            <h3>You are about to delete a board</h3>
            <p>This will delete your board permanently</p>
            <p className='ar-u-sr'>Are you sure?</p>
            <div className="delete-btns">
              <button onClick={() => handleModals('deleteBoard')}>Cancel</button>
              {isLoading.isDeleteBoardLoading ? <button>
                <i className="fa fa-spinner fa-spin"></i>Deleting...
              </button> : <button onClick={() => handleDeleteBoard()} >
                Delete
              </button>}
            </div>
          </>}

    </ReactModal>
  )
}

export default DeleteBoard