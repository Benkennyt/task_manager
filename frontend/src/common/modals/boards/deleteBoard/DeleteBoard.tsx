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
  const { modal, handleModals, boardID2 } = props
  const [boardDeleted, setBoardDeleted] = useState(false)
  const [modalReset, setModalReset] = useState(false)
  const { data, isError, isLoading } = useSelector((state: any) => state.boards)

  const dispatch = useAppDispatch()

  const handleDeleteBoard = () => {
    dispatch(deleteBoard(boardID2)).
      then((res) => {
        if (res.payload.status === 204) {
          dispatch(getBoards())
        }
      })
  }

  const handleBoardDeleteCloseBtn = () => {
    handleModals("deleteBoard")
    setBoardDeleted(false)
    setModalReset(false)
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
      {!modalReset && boardDeleted ?
        <div className="successful-201">
          <div onClick={() => handleBoardDeleteCloseBtn()} className="close-successful-modal">
            <CloseIcon />
          </div>
          <img src={SuccessIcon} alt="success Icon" />
          <h3>SUCCESS!</h3>
          <p>Board deleted successfully.</p>
        </div>

        :
        !modalReset && isError.isDeleteBoardError ? <div className="err-mdal">
          <div className="err-hd-closebtn">
            <div onClick={() => handleBoardDeleteCloseBtn()} className="close-err-modal">
              <CloseIcon />
            </div>
          </div>
          <img src={errIcon} alt="error icon" />
          <h3>ERROR!</h3>
          <p>An error occured while trying to delete board.</p>
        </div> :
          <>
            <div className='trash'>
              <TrashIcon />
            </div>
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