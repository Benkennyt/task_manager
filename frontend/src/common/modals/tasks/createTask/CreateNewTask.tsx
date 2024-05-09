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


interface Subtask {
  [key: string]: string;
}

const CreateNewTask = (props:any) => {
    const {modal, handleModals, boardID} = props;
    const [modalReset, setModalReset] = useState(false)

    const {data, isError, isLoading } = useSelector((state:any) => state.tasks)
    const [subtaskList, setSubtaskList] = useState<Subtask[]>([])
    const dispatch = useAppDispatch()

    const handleCreateTask =(val: any)=> {
        dispatch(createTask(val))
        setModalReset(true)
    }

    const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

    const handleSubtaskAdd = () => {
      setSubtaskList([...subtaskList, {subtask: ''} ])
    }

    const handleSubtaskRemove = (index: number) => {
      const List = [...subtaskList]
      List.splice(index, 1)
      setSubtaskList(List)
    }


    const handleSubtaskChange = (e: { target: { name: any; value: any; }; }, index: number) => {
      const {name, value} = e.target
      const list = [...subtaskList]
      list[index][name as keyof Subtask] = value;
      setSubtaskList(list)
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
            modalReset && data?.createTaskData && data.createTaskData?.status === 201 ? 
                <div className="create-task-201">
                    <img src={SuccessIcon} alt="" />
                    <h3>New Task Created</h3>
                </div> 
            : isError.isCreateTaskError ? <div className="create-task-err">Error</div> 
            :
            <>
            <div className="task-hd-closebtn">

              <h3 className='add-new-task-hd'>Add new task
              </h3>
              <div onClick={() => handleModals("newTask")} className="close-task-modal">
                  <CloseIcon />
              </div>
          </div><Formik
              initialValues={{name:'', status:'', description: '' , subtaskList, boardID: boardID}}
              enableReinitialize
              onSubmit={ async (value) => {
                  
                  handleCreateTask(value);
                  await delay(1000);
                  handleModals("newTask")
                  dispatch(getTasks(value))
                  setModalReset(false)
                console.log(value)
                  
              } }

          >
                  {({ handleSubmit, handleBlur, values, touched, handleChange
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
                            <option value="TODO">TODO</option>
                            <option value="OVERDUE">OVERDUE</option>
                            <option value="INPROGRESS">INPROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </Field>

                          <div className="add-subtask-hd">
                              <label className='pp'>Subtask</label>
                          </div>

                          {subtaskList.map((_data, index) => {
                            return(
                              <div className="subtask-input" key={index}>
                                <Field
                                name={`subtask`}
                                type="text"
                                onBlur={handleBlur}
                                onChange={(e: any) => handleSubtaskChange(e, index)}
                           
                                placeholder="Add subtask."
                                />
                                <button type='button' onClick={() => handleSubtaskRemove(index)}><CloseIcon/></button>
                              </div>
                            )
                          })}
                          <button type='button' className='add-subtask' onClick={handleSubtaskAdd}>Add Subtask</button>

                          {isLoading?.isCreateTaskLoading ? <button className="create_task_btn" type="submit">
                          <i className="fa fa-spinner fa-spin"></i>Loading...
                        </button> : <button className="create_task_btn" type="submit">
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