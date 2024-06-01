import ReactModal from 'react-modal';
import './DeleteBoard.css'
import { useAppDispatch } from '../../../../app/stores/stores';
import { deleteBoard, getBoards } from '../../../../app/api/boardSlice';
import { useSelector } from 'react-redux';
import { CloseIcon, TrashIcon } from '../../../../assets/svg/SVG';
import { useEffect, useState } from 'react';
import SuccessIcon from "../../../../assets/svg/success_icon.svg";
import errIcon from "../../../../assets/svg/errIcon.svg";

interface DeleteBoardProps {
  modal: string;
  handleModals: (modalType: string) => void;
  boardID2: string;
  setActiveBoard: (modalType: number) => void;
}

const DeleteBoard = (props: DeleteBoardProps) => {
  const { modal, handleModals, boardID2, setActiveBoard } = props;
  const [boardDeleted, setBoardDeleted] = useState(false);
  const [modalReset, setModalReset] = useState(false);
  const {isError, isLoading } = useSelector((state: any) => state.boards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(modal === 'deleteBoard') {
      setModalReset(false)
    }
  }, [modal])
  

  const handleDeleteBoard = () => {
    dispatch(deleteBoard(boardID2)).
      then((res) => {
        if (res.payload.status === 204) {
          dispatch(getBoards())
          setActiveBoard(0)
          setBoardDeleted(true)
        }
      });
  };


  const handleBoardDeleteCloseBtn = () => {
    handleModals("deleteBoard")
    setBoardDeleted(false)
    setModalReset(true)
  }

  const renderSuccessMessage = () => (
    <div className="successful-201">
      <div onClick={handleBoardDeleteCloseBtn} className="close-successful-modal">
        <CloseIcon />
      </div>
      <img src={SuccessIcon} alt="success Icon" />
      <h3>SUCCESS!</h3>
      <p>Board deleted successfully.</p>
    </div>
  );

  const renderErrorMessage = () => (
    <div className="err-mdal">
      <div className="err-hd-closebtn">
        <div onClick={handleBoardDeleteCloseBtn} className="close-err-modal">
          <CloseIcon />
        </div>
      </div>
      <img src={errIcon} alt="error icon" />
      <h3>ERROR!</h3>
      <p>An error occurred while trying to delete the board.</p>
    </div>
  );

  const renderDeleteConfirmation = () => (
    <>
      <div className='trash'>
        <TrashIcon />
      </div>
      <h3>You are about to delete a board</h3>
      <p>This will delete your board permanently</p>
      <p className='ar-u-sr'>Are you sure?</p>
      <div className="delete-btns">
        <button onClick={() => handleModals('deleteBoard')}>Cancel</button>
        {isLoading.isDeleteBoardLoading ? (
          <button>
            <i className="fa fa-spinner fa-spin"></i>Deleting...
          </button>
        ) : (
          <button onClick={handleDeleteBoard}>Delete</button>
        )}
      </div>
    </>
  );

  return (
    <ReactModal
      isOpen={modal === 'deleteBoard'}
      contentLabel="delete board modal"
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      shouldReturnFocusAfterClose
      preventScroll
      ariaHideApp={false}
      id='delete-board-modal'
    >
      {!modalReset && boardDeleted ? (
        renderSuccessMessage()
      ) : !modalReset && isError.isDeleteBoardError ? (
        renderErrorMessage()
      ) : (
        renderDeleteConfirmation()
      )}
    </ReactModal>
  );
}

export default DeleteBoard