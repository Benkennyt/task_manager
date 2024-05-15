import './UpdateBoard.css'
import ReactModal from 'react-modal';
import { useAppDispatch } from '../../../../app/stores/stores';
import {getBoards, updateBoard } from '../../../../app/api/boardSlice';
import { useSelector } from 'react-redux';
import { CloseIcon } from '../../../../assets/svg/SVG';
import SuccessIcon from "../../../../assets/svg/success_icon.svg";
import errIcon from "../../../../assets/svg/errIcon.svg";
import { Field, Formik } from 'formik';
import { Form } from 'react-router-dom';

const UpdateBoard = (props:any) => {
  const {modal, handleModals, boardID2, boardIndex} = props
  const {data, isError, isLoading } = useSelector((state:any) => state.boards)



  const dispatch = useAppDispatch()

  const handleUpdateBoard =(val: any)=> {
    dispatch(updateBoard(val))
  }

  const handleInitialBoardName = () => {
    if (data && data.boardData && data.boardData.data && data.boardData.data[boardIndex]) {
      return data.boardData.data[boardIndex].name
    } else {
      return ''
    }
  }

  const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));


  return (
    <ReactModal
    isOpen={modal == 'updateBoard'}
    contentLabel="update board modal"
    shouldCloseOnOverlayClick={true}
    shouldCloseOnEsc={true}
    shouldReturnFocusAfterClose={true}

    ariaHideApp={false}
    >
        {
            data?.updateBoardData && data.updateBoardData?.status === 200 ? 
               
                <div className="successful-201">
                <img src={SuccessIcon} alt="success Icon" />
                <h3>Board updated</h3>
              </div>
            : isError.isUpdateBoardError ? 
            <div className="err-mdal">
            {/* <div className="err-hd-closebtn">
              <div onClick={() => { { handleTaskDeleteBtn() } }} className="close-err-modal">
                <CloseIcon />
              </div>
            </div>
            <img src={errIcon} alt="error icon" /> */}
            <p>An error occured while trying to updating board.</p>
          </div>
            :
            <>
            <div className="board-hd-closebtn">

              <h3 className='add-new-board-hd'>Update board
              </h3>
              <div onClick={() => handleModals("updateBoard")} className="close-board-modal">
                  <CloseIcon />
              </div>
          </div><Formik
              initialValues={{name: handleInitialBoardName(), id: boardID2}}
              enableReinitialize
              onSubmit={ async (value) => {
                  handleUpdateBoard(value);
                  await delay(1000);
                  handleModals("updateBoard")
                  dispatch(getBoards())
                  
              } }

          >
                  {({ handleSubmit, handleBlur, handleChange, values, touched,
                  }) => (
                      <Form onSubmit={handleSubmit} autoComplete='off'>
                          <label className='pp'>Board Name</label>
                          <Field
                              name="name"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.name}
                              placeholder="e.g Marketing"
                              touched={touched} 
                              />
                          {isLoading?.isUpdateBoardLoading ? <button className="create_board" type="submit">
                          <i className="fa fa-spinner fa-spin"></i>Loading...
                        </button> : <button className="create_board" type="submit">
                        Update Board
                        </button>}
                      </Form>
                  )}
              </Formik>
            </>}
  </ReactModal>
  )
}

export default UpdateBoard