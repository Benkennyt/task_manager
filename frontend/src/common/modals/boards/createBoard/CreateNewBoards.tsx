import ReactModal from 'react-modal';
import './CreateNewBoards.css';
import { Field, Formik } from 'formik';
import { Form } from 'react-router-dom';
import { useState } from 'react';
import { BoardForm } from '../../../../app/models/user';
import { CloseIcon } from '../../../../assets/svg/SVG';
import SuccessIcon from "../../../../assets/svg/success_icon.svg";
import { useAppDispatch } from '../../../../app/stores/stores';
import { createBoard, getBoards } from '../../../../app/api/boardSlice';
import { useSelector } from 'react-redux';

const CreateNewBoards = (props:any) => {
    const {createNewBoardModal, handleModals} = props
    const [inputField, setInputField] = useState(new BoardForm());
    
    const {data, isError, isLoading } = useSelector((state:any) => state.boards)

    const dispatch = useAppDispatch()
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputField({...inputField, [e.target.name]: e.target.value}) 
    }

    const handleCreateBoard =(val: any)=> {
        dispatch(createBoard(val))
    }

    const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

  return (
    <ReactModal
    isOpen={createNewBoardModal}
    contentLabel="create board modal"
    shouldCloseOnOverlayClick={true}
    shouldCloseOnEsc={true}
    shouldReturnFocusAfterClose={true}

    ariaHideApp={false}
    >
        {
            data?.createBoardData && data.createBoardData?.status === 201 ? 
                <div className="create-board-201">
                    <img src={SuccessIcon} alt="" />
                    <h3>New Board Created</h3>
                </div> 
            : isError.isCreateBoardError ? <div className="create-board-err"></div> 
            :
            <>
            <div className="board-hd-closebtn">

              <h3 className='add-new-board-hd'>Add new board
              </h3>
              <div onClick={() => handleModals("newBoard")} className="close-board-modal">
                  <CloseIcon />
              </div>
          </div><Formik
              initialValues={inputField}
              enableReinitialize
              onSubmit={ async (value) => {
                  let newCheck: { [key: string]: any; } = { name: value.name };
                  for (let i = 0; i < value.checked.length; i++) {
                      newCheck[value.checked[i]] = true;
                  }
                  handleCreateBoard(newCheck);
                  await delay(1000);
                  handleModals("newBoard")
                  dispatch(getBoards())
                  
              } }

          >
                  {({ handleSubmit, handleBlur, values, touched,
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
                              touched={touched} />

                          <div className="board-columns">
                              <p className='pp'>Board columns</p>

                              <div className="todo column">
                                  <p>ToDo</p>
                                  <div className="checkbox">
                                      <Field
                                          name="checked"
                                          type={'checkbox'}
                                          value={"todo_column"} />
                                      <svg viewBox="0 0 35.6 35.6">
                                          <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                          <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                          <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                      </svg>
                                  </div>
                              </div>

                              <div className="overdue column">
                                  <p>Overdue</p>
                                  <div className="checkbox">
                                      <Field
                                          name="checked"
                                          type={'checkbox'}
                                          value={"overdue_column"} />
                                      <svg viewBox="0 0 35.6 35.6">
                                          <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                          <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                          <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                      </svg>
                                  </div>

                              </div>

                              <div className="inprogress column">
                                  <p>Inprogress</p>
                                  <div className="checkbox">
                                      <Field
                                          name="checked"
                                          type={'checkbox'}
                                          value={"inprogress_column"} />
                                      <svg viewBox="0 0 35.6 35.6">
                                          <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                          <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                          <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                      </svg>
                                  </div>
                              </div>
                              <div className="completed column">
                                  <p>Completed</p>
                                  <div className="checkbox">
                                      <Field
                                          name="checked"
                                          type={'checkbox'}
                                          value={"completed_column"} />
                                      <svg viewBox="0 0 35.6 35.6">
                                          <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                          <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                          <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                      </svg>
                                  </div>
                              </div>
                          </div>
                          {isLoading?.isCreateBoardLoading ? <button className="create_board" type="submit">
                          <i className="fa fa-spinner fa-spin"></i>Loading...
                        </button> : <button className="create_board" type="submit">
                        Create Board
                        </button>}
                      </Form>
                  )}
              </Formik>
            </>}
  </ReactModal>
  )
}

export default CreateNewBoards