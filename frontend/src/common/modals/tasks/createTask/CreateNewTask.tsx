import ReactModal from 'react-modal';
import './CreateNewTask.css';
import { Field, Formik } from 'formik';
import { Form } from 'react-router-dom';
import { CloseIcon } from '../../../../assets/svg/SVG';
import SuccessIcon from "../../../../assets/svg/success_icon.svg";
import { useAppDispatch } from '../../../../app/stores/stores';
import { getTasks } from '../../../../app/api/taskSlice';
import { useSelector } from 'react-redux';
import { createTask } from '../../../../app/api/taskSlice';
import { useState } from 'react';
import { InitialValues1, Subtask } from '../../../../app/models/user';
import errIcon from "../../../../assets/svg/errIcon.svg";



const CreateNewTask = (props: any) => {
  const { modal, handleModals, boardID, activeBoard } = props;
  const [modalReset, setModalReset] = useState(false)
  const [inputField, setInputField] = useState(new InitialValues1());
  const { data, isError, isLoading } = useSelector((state: any) => state.tasks)
  const { data:data1 } = useSelector((state: any) => state.boards)
  const [subtaskList, setSubtaskList] = useState<Subtask[]>([])
  const dispatch = useAppDispatch()

  const handleCreateTask = (val: any) => {
    dispatch(createTask(val)).
    then((res) => {
      if (res.payload.status === 201){
        dispatch(getTasks(boardID))
      }
    })
    setModalReset(false)
  }

  const handleSubtaskAdd = () => {
    setSubtaskList([...subtaskList, { subtask: '' }])
  }

  const handleSubtaskRemove = (index: number) => {
    const List = [...subtaskList]
    List.splice(index, 1)
    setSubtaskList(List)
  }



  const handleSubtaskChange = (e: { target: { name: any; value: any; }; }, index: number) => {
    const { name, value } = e.target
    const list = [...subtaskList]
    list[index][name as keyof Subtask] = value;
    setSubtaskList(list)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }


  const handleFormReset = () => {
    setInputField(new InitialValues1);
    setSubtaskList([])
  }



  return (
    <ReactModal
      isOpen={modal == 'newTask'}
      contentLabel="create task modal"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldReturnFocusAfterClose={true}
      id='newTaskModal'
      ariaHideApp={false}
    >
      {
        data.createTaskData?.status === 201 && !modalReset ?


          <div className="successful-201">
            <div onClick={() => { handleModals("newTask"), setModalReset(true), handleFormReset() }} className="close-successful-modal">
              <CloseIcon />
            </div>
            <img src={SuccessIcon} alt="success Icon" />
            <h3>SUCCESS!</h3>
            <p>New task created successfully.</p>
          </div>
          : isError.isCreateTaskError && !modalReset ?

            <div className="err-mdal">
              <div className="err-hd-closebtn">
                <div onClick={() => { handleModals("newTask"), setModalReset(true), handleFormReset() }} className="close-err-modal">
                  <CloseIcon />
                </div>
              </div>
              <img src={errIcon} alt="error icon" />
              <h3>ERROR!</h3>
              <p>An error occured while trying to create task.</p>
            </div>
            :
            <>
              <div className="task-hd-closebtn">

                <h3 className='add-new-task-hd'>Add new task
                </h3>
                <div onClick={() => handleModals("newTask")} className="close-task-modal">
                  <CloseIcon />
                </div>
              </div>

              <Formik
                initialValues={{ ...inputField, subtaskList, boardID: boardID, status2: 'false' }}
                enableReinitialize
                onSubmit={(values) => {
                  handleCreateTask(values);
                }}

              >
                {({ handleSubmit, handleBlur, values, touched, isSubmitting
                }) => (
                  <Form onSubmit={handleSubmit} autoComplete='off' className='new_task_form'>
                    <label className='pp'>Task Name</label>
                    <Field
                      name="name"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      placeholder="e.g Finish the summary."
                      touched={touched}
                    />

                    <label className='pp'>Description</label>
                    <Field
                      name="description"
                      type="text"
                      as='textarea'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      touched={touched}
                    />

                    <div className="task-columns">
                      <label className='pp'>Task Status</label>
                    </div>
                    <Field
                      name="status"
                      as="select"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.status}
                    >
                      <option value="" disabled className='go'>select status</option>
                      {data1 && data1.boardData && data1.boardData.data && data1.boardData.data[activeBoard] && data1.boardData.data[activeBoard].todo_column &&
                      <option value="TODO">TODO</option>}
                      {data1 && data1.boardData && data1.boardData.data && data1.boardData.data[activeBoard] && data1.boardData.data[activeBoard].overdue_column &&
                      <option value="OVERDUE">OVERDUE</option>}
                      {data1 && data1.boardData && data1.boardData.data && data1.boardData.data[activeBoard] && data1.boardData.data[activeBoard].inprogress_column &&
                      <option value="INPROGRESS">INPROGRESS</option>}
                      {data1 && data1.boardData && data1.boardData.data && data1.boardData.data[activeBoard] && data1.boardData.data[activeBoard].completed_column &&
                      <option value="COMPLETED">COMPLETED</option>}
                    </Field>

                    <div className="add-subtask-hd">
                      <label className='pp'>Subtask</label>
                    </div>

                    {subtaskList.map((_data, index) => {
                      return (
                        <div className="subtask-input" key={index}>
                          <Field
                            name={`subtask`}
                            type="text"
                            onBlur={handleBlur}
                            onChange={(e: any) => handleSubtaskChange(e, index)}
                            placeholder="Add subtask."
                          />
                          <button type='button' onClick={() => handleSubtaskRemove(index)}><CloseIcon /></button>
                        </div>
                      )
                    })}
                    <button type='button' className='add-subtask' onClick={handleSubtaskAdd}>Add Subtask</button>

                    {isLoading?.isCreateTaskLoading ? <button className="create_task_btn" type="submit">
                      <i className="fa fa-spinner fa-spin"></i>Loading...
                    </button> : <button disabled={values.name === '' || values.description === '' || values.status === '' || isSubmitting} className="create_task_btn" type="submit">
                      Create Task
                    </button>}
                  </Form>
                )}
              </Formik>
            </>}
    </ReactModal>
  )
}

export default CreateNewTask