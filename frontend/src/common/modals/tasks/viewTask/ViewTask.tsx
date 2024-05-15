import { Field, Formik } from 'formik';
import { useEffect, useState } from 'react';
import './ViewTask.css'
import ReactModal from 'react-modal';
import { Form } from 'react-router-dom';
import { CloseIcon, EditPen, ErrorIcon } from '../../../../assets/svg/SVG';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../app/stores/stores';
import { getTask1, getTasks, updateTask } from '../../../../app/api/taskSlice';
import SuccessIcon from "../../../../assets/svg/success_icon.svg";
import errIcon from "../../../../assets/svg/errIcon.svg";

import { updateSubtask } from '../../../../app/api/subtaskSlice';

const ViewTask = (props: any) => {
    const { modal, handleModals, taskID, setTaskUpdated, taskUpdated, boardID } = props;
    const [editTitle, setEditTitle] = useState(false)
    const [modalReset, setModalReset] = useState(false)

    const [editDescription, setEditDescription] = useState(false)
    const { data, isError, isLoading } = useSelector((state: any) => state.tasks)
    const dispatch = useAppDispatch();
    const taskData = data.taskData1.data?.[0] || ''

    useEffect(() => {
        if (taskID != null) {
            dispatch(getTask1(taskID))
        }
    }, [taskID, taskUpdated])

    const handleCheckboxChange = (event: { target: { checked: any; }; }, subtask: any) => {
        const isChecked = event.target.checked;
        const checked = {
            id: subtask.id,
            name: subtask.name,
            status: 'true',
            taskID: taskID
        }

        const unChecked = {
            id: subtask.id,
            name: subtask.name,
            status: 'false',
            taskID: taskID
        }
        if (isChecked) {
            dispatch(updateSubtask(checked))
        } else {
            dispatch(updateSubtask(unChecked))
        }
    };

    const handleTaskUpdate = (values: any) => {
        dispatch(updateTask(values))
        setModalReset(false)
    }

    const handleTaskUpdateBtn = () => {
        setEditTitle(false)
        setEditDescription(false)
        if (taskUpdated) {
            setTaskUpdated(false)
        } else {
            setTaskUpdated(true)
        }
    }

    const handleTaskViewCloseBtn = () => {
        handleModals("updatetask")
        setEditTitle(false)
        setEditDescription(false)
        setModalReset(true)
        if (taskUpdated) {
            setTaskUpdated(false)
        } else {
            setTaskUpdated(true)
        }
    }

    return (
        <ReactModal
            isOpen={modal == 'viewTask'}
            contentLabel="update task modal"
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            shouldReturnFocusAfterClose={true}
            ariaHideApp={false}
            id='task-view'
        >
            {
                data.updateTaskData?.status === 200 && !modalReset ?

                    <div className="successful-201">
                        <div onClick={() => handleTaskViewCloseBtn()} className="close-successful-modal">
                            <CloseIcon />
                        </div>
                        <img src={SuccessIcon} alt="success Icon" />
                        <h3>New Board Created</h3>
                    </div>
                    : isError.isUpdateTaskError && !modalReset ?


                        <div className="err-mdal">
                            <div className="err-hd-closebtn">
                                <div onClick={() => { handleModals("updatetask"), setEditTitle(false), setEditDescription(false), setModalReset(true) }} className="close-err-modal">
                                    <CloseIcon />
                                </div>
                            </div>
                            <img src={errIcon} alt="error icon" />
                            <p>An error occured while trying to update task.</p>
                        </div>

                        :
                        <>
                            <div className="task-hd-closebtn">
                                <div onClick={() => handleTaskViewCloseBtn()} className="close-task-modal">
                                    <CloseIcon />
                                </div>
                            </div>
                            <Formik
                                initialValues={{ name: taskData.name, description: taskData.description, subtasks: [], status: taskData.status, boardID: boardID, taskID: taskID }}
                                enableReinitialize
                                onSubmit={async (value) => {
                                    handleTaskUpdate(value);
                                }}
                            >
                                {({ handleSubmit, handleBlur, handleChange, values, touched, isValid, dirty, isSubmitting
                                }) => (
                                    <Form onSubmit={handleSubmit} autoComplete='off'>
                                        <label className='pp'>Task Name</label>
                                        {editTitle ? <Field
                                            name="name"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name}
                                            placeholder="e.g Marketing"
                                        />
                                            :
                                            <div className='task-title-edit'>
                                                <p>{taskData.name}</p>
                                                <div className="task-edit" onClick={() => setEditTitle(true)}><EditPen /></div>
                                            </div>}

                                        <label className='pp'>Description</label>
                                        {editDescription ? <Field
                                            name="description"
                                            type="textarea"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.description}
                                            placeholder="e.g Marketing"
                                            touched={touched}
                                        />
                                            :
                                            <div className='task-title-edit'>
                                                <p>{taskData.description}</p>
                                                <div className="task-edit" onClick={() => setEditDescription(true)}><EditPen /></div>
                                            </div>}

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

                                        <>
                                            <p className='subtasks'>Subtasks</p>

                                            {taskData.subtasks?.map((subtask: any, index: number) => {

                                                return <div className="subtask" key={index}>
                                                    <p>{subtask.name}</p>
                                                    <div className="checkbox-wrapper">
                                                        <Field
                                                            name={`checked${index}`}
                                                            type={'checkbox'}
                                                            checked={values.subtasks[index]}
                                                            defaultChecked={subtask.status}
                                                            id={`cbtest-19${index}`}
                                                            onChange={(event: { target: { checked: any; }; }) => { handleCheckboxChange(event, subtask) }}
                                                        />
                                                        <label htmlFor={`cbtest-19${index}`} className="check-box"></label>
                                                    </div>
                                                </div>
                                            })
                                            }
                                        </>

                                        {isLoading?.isUpdateTaskLoading ? <button className="update_task" type="submit">
                                            <i className="fa fa-spinner fa-spin"></i>Loading...
                                        </button> : dirty ? <button disabled={isSubmitting} onClick={() => handleTaskUpdateBtn()} className="update_task" type="submit">
                                            Update Task
                                        </button> : null}
                                    </Form>
                                )}
                            </Formik>
                        </>}
        </ReactModal>
    )
}

export default ViewTask