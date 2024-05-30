import ReactModal from 'react-modal';
import './CreateNewBoards.css';
import { Field, Formik } from 'formik';
import { Form } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BoardForm } from '../../../../app/models/user';
import { CloseIcon } from '../../../../assets/svg/SVG';
import SuccessIcon from "../../../../assets/svg/success_icon.svg";
import { useAppDispatch } from '../../../../app/stores/stores';
import { createBoard, getBoards } from '../../../../app/api/boardSlice';
import errIcon from "../../../../assets/svg/errIcon.svg";
import { useSelector } from 'react-redux';

interface CreateNewBoardsProps {
    modal: string;
    handleModals: (modalType: string) => void;
    setActiveBoard: (index: number) => void;
}

const CreateNewBoards = (props: CreateNewBoardsProps) => {
    const { modal, handleModals, setActiveBoard } = props;
    const [modalReset, setModalReset] = useState(false);
    const [boardCreated, setBoardCreated] = useState(false);
    const inputField = new BoardForm();
    const { data, isError, isLoading } = useSelector((state: any) => state.boards)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(modal === 'newBoard') {
          setModalReset(false)
        }
      }, [modal])


    const handleCreateBoard = (val: any) => {
        dispatch(createBoard(val)).
            then((res) => {
                if (res.payload.status === 201) {
                    dispatch(getBoards())
                    setBoardCreated(true)
                }
            }).then(() => setActiveBoard(data.boardData.data.length))
    }

    const handleCreateBoardCloseBtn2 = () => {
        handleModals("newBoard")
        setModalReset(true)
        setBoardCreated(false)
    }

    const renderSuccessMessage = () => (
        <div className="successful-201">
            <div onClick={handleCreateBoardCloseBtn2} className="close-successful-modal">
                <CloseIcon />
            </div>
            <img src={SuccessIcon} alt="success Icon" />
            <h3>SUCCESS!</h3>
            <p>New board created successfully.</p>
        </div>
    );

    const renderErrorMessage = () => (
        <div className="err-mdal">
            <div className="err-hd-closebtn">
                <div onClick={handleCreateBoardCloseBtn2} className="close-err-modal">
                    <CloseIcon />
                </div>
            </div>
            <img src={errIcon} alt="error icon" />
            <h3>ERROR!</h3>
            <p>An error occurred while trying to create the board.</p>
        </div>
    );

    const renderCreateBoardForm = () => (
        <>
            <div className="board-hd-closebtn">
                <h3 className='add-new-board-hd'>Add new board</h3>
                <div onClick={() => handleModals("newBoard")} className="close-board-modal">
                    <CloseIcon />
                </div>
            </div>
            <Formik
                initialValues={inputField}
                enableReinitialize
                onSubmit={async (value) => {
                    const newCheck: { [key: string]: any; } = { name: value.name };
                    value.checked.forEach((item: string) => {
                        newCheck[item] = true;
                    });
                    handleCreateBoard(newCheck);
                }}
            >
                {({ handleSubmit, handleBlur, handleChange, values, touched, isValid, dirty, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
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
                        <div className="board-columns">
                            <p className='pp'>Board columns</p>
                            {['todo_column', 'overdue_column', 'inprogress_column', 'completed_column'].map((column, index) => (
                                <div key={index} className={`${column} column`}>
                                    <p>{column.split('_').join(' ')}</p>
                                    <div className="checkbox-wrapper">
                                        <Field
                                            name="checked"
                                            type="checkbox"
                                            value={column}
                                            id={`cbtest-19-${index}`}
                                        />
                                        <label htmlFor={`cbtest-19-${index}`} className="check-box"></label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {isLoading?.isCreateBoardLoading ? (
                            <button className="create_board" type="submit">
                                <i className="fa fa-spinner fa-spin"></i>Loading...
                            </button>
                        ) : (
                            <button
                                disabled={!isValid || !dirty || values.name === '' || values.checked.length === 0 || isSubmitting}
                                className="create_board"
                                type="submit"
                            >
                                Create Board
                            </button>
                        )}
                    </Form>
                )}
            </Formik>
        </>
    );

    return (
        <ReactModal
            isOpen={modal === 'newBoard'}
            contentLabel="create board modal"
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            shouldReturnFocusAfterClose
            ariaHideApp={false}
            id='create-board-modal'
        >
            {!modalReset && boardCreated
                ? renderSuccessMessage()
                :!modalReset && isError.isCreateBoardError
                    ? renderErrorMessage()
                    : renderCreateBoardForm()}
        </ReactModal>
    );
}

export default CreateNewBoards