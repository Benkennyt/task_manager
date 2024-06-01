import { Field, Formik } from 'formik';
import { useEffect, useState } from 'react';
import './ViewTask.css'
import ReactModal from 'react-modal';
import { Form } from 'react-router-dom';
import { CloseIcon, EditPen } from '../../../../assets/svg/SVG';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../app/stores/stores';
import {updateTask } from '../../../../app/api/taskSlice';
import SuccessIcon from "../../../../assets/svg/success_icon.svg";
import errIcon from "../../../../assets/svg/errIcon.svg";
import { updateSubtask } from '../../../../app/api/subtaskSlice';
import { getBoards } from '../../../../app/api/boardSlice';

interface ViewTaskProps {
    modal: string;
    handleModals: (modalType: string) => void;
    taskID: string | null;
    boardID: string;
    activeBoard: number;
}

const ViewTask = (props: ViewTaskProps) => {
    const { modal, handleModals, taskID, boardID, activeBoard } = props;
    const [editTitle, setEditTitle] = useState(false);
    const [editDescription, setEditDescription] = useState(false);
    const [modalReset, setModalReset] = useState(false);
    const [taskUpdated, setTaskUpdated] = useState(false);

    const {isError, isLoading } = useSelector((state: any) => state.tasks);
    const { data: boardsData } = useSelector((state: any) => state.boards)
    const dispatch = useAppDispatch();
    // console.log(boardsData?.boardData?.data?.[activeBoard]?.tasks?.[0])


    useEffect(() => {
        if(modal === 'updateTask') {
            setModalReset(false)
          };
    }, [ modal]);

    const handleCheckboxChange = (event: { target: { checked: any; }; }, subtask: any) => {
        const status = event.target.checked ? 'true' : 'false';
        const payload = {
            id: subtask.id,
            name: subtask.name,
            status,
            taskID,
        };

        dispatch(updateSubtask(payload)).then((res) => {
            if (res.payload.status === 200) {
                dispatch(getBoards())
            }
        });
    };

    const getTaskDetails = (taskID:string | null) => {
        const tasks = boardsData?.boardData?.data?.[activeBoard]?.tasks || [] ;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i]?.id === taskID) {
                return tasks[i]
            }
        }
        return null;
    }


    const handleTaskUpdate = (values: any) => {
        dispatch(updateTask(values)).then((res) => {
            if (res.payload.status === 200) {
                dispatch(getBoards())
                setTaskUpdated(true)
            }
        })
    }

    const handleTaskViewCloseBtn = () => {
        handleModals("updatetask")
        setEditTitle(false)
        setEditDescription(false)
        setModalReset(true)
        setTaskUpdated(false)
    }

    const renderSuccessMessage = () => (
        <div className="successful-201">
            <div onClick={() => handleTaskViewCloseBtn()} className="close-successful-modal">
                <CloseIcon />
            </div>
            <img src={SuccessIcon} alt="success Icon" />
            <h3>SUCCESS!</h3>
            <p>Task updated successfully.</p>
        </div>
    );

    const renderErrorMessage = () => (
        <div className="err-mdal">
            <div className="err-hd-closebtn">
                <div onClick={() => handleTaskViewCloseBtn()} className="close-err-modal">
                    <CloseIcon />
                </div>
            </div>
            <img src={errIcon} alt="error icon" />
            <h3>ERROR!</h3>
            <p>An error occurred while trying to update the task.</p>
        </div>
    );

    const renderForm = () => (
        <Formik
            initialValues={{ name: getTaskDetails(taskID)?.name, description: getTaskDetails(taskID)?.description, subtasks: [], status: getTaskDetails(taskID)?.status, boardID, taskID }}
            enableReinitialize
            onSubmit={(value) => {
                handleTaskUpdate(value);
            }}
        >
            {({ handleSubmit, handleBlur, handleChange, values, touched, dirty, isSubmitting }) => (
                <Form onSubmit={handleSubmit} autoComplete='off'>
                    <label className='pp'>Task Name</label>
                    {editTitle ? (
                        <Field
                            name="name"
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            placeholder="e.g Marketing"
                        />
                    ) : (
                        <div className='task-title-edit'>
                            <p>{getTaskDetails(taskID).name}</p>
                            <div className="task-edit" onClick={() => setEditTitle(true)}><EditPen /></div>
                        </div>
                    )}

                    <label className='pp'>Description</label>
                    {editDescription ? (
                        <Field
                            name="description"
                            as='textarea'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                            placeholder="e.g Marketing"
                            touched={touched}
                        />
                    ) : (
                        <div className='task-title-edit'>
                            <p>{getTaskDetails(taskID).description}</p>
                            <div className="task-edit" onClick={() => setEditDescription(true)}><EditPen /></div>
                        </div>
                    )}

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
                        {boardsData?.boardData?.data?.[activeBoard]?.todo_column && <option value="TODO">TODO</option>}
                        {boardsData?.boardData?.data?.[activeBoard]?.overdue_column && <option value="OVERDUE">OVERDUE</option>}
                        {boardsData?.boardData?.data?.[activeBoard]?.inprogress_column && <option value="INPROGRESS">INPROGRESS</option>}
                        {boardsData?.boardData?.data?.[activeBoard]?.completed_column && <option value="COMPLETED">COMPLETED</option>}
                    </Field>

                    <p className='subtasks'>Subtasks</p>
                    {getTaskDetails(taskID).subtasks?.map((subtask: any, index: number) => (
                        <div className="subtask" key={index}>
                            <p>{subtask.name}</p>
                            <div className="checkbox-wrapper">
                                <Field
                                    name={`checked${index}`}
                                    type='checkbox'
                                    checked={values.subtasks[index]}
                                    defaultChecked={subtask.status}
                                    id={`cbtest-19${index}`}
                                    onChange={(event: { target: { checked: any; }; }) => handleCheckboxChange(event, subtask)}
                                />
                                <label htmlFor={`cbtest-19${index}`} className="check-box"></label>
                            </div>
                        </div>
                    ))}

                    {isLoading?.isUpdateTaskLoading ? (
                        <button className="update_task" type="submit" disabled>
                            <i className="fa fa-spinner fa-spin"></i>Loading...
                        </button>
                    ) : dirty && (
                        <button disabled={isSubmitting} className="update_task" type="submit">
                            Update Task
                        </button>
                    )}
                </Form>
            )}
        </Formik>
    );




    return (
        <ReactModal
            isOpen={modal === 'viewTask'}
            contentLabel="update task modal"
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            shouldReturnFocusAfterClose={true}
            ariaHideApp={false}
            id='task-view'
        >
            {taskUpdated && !modalReset ? renderSuccessMessage() : !modalReset &&
                isError.isUpdateTaskError && !modalReset ? renderErrorMessage() :
                    <>
                        <div className="task-hd-closebtn">
                            <div onClick={handleTaskViewCloseBtn} className="close-task-modal">
                                <CloseIcon />
                            </div>
                        </div>
                        {renderForm()}
                    </>
            }
        </ReactModal>
    );
}

export default ViewTask