import './UpdateBoard.css'
import ReactModal from 'react-modal';
import { useAppDispatch } from '../../../../app/stores/stores';
import { getBoards, updateBoard } from '../../../../app/api/boardSlice';
import { useSelector } from 'react-redux';
import { CloseIcon } from '../../../../assets/svg/SVG';
import SuccessIcon from "../../../../assets/svg/success_icon.svg";
import errIcon from "../../../../assets/svg/errIcon.svg";
import { Field, Formik } from 'formik';
import { Form } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InitialValues2 } from '../../../../app/models/user';


interface IcolumnObj {
  [keys: string]: any
}

interface INewColumnsState {
  columnsObj: IcolumnObj;
}

const NewColumnsState: INewColumnsState = {
  columnsObj: {},
};

interface UpdateBoardProps {
  modal: string;
  handleModals: (modalType: string) => void;
  boardID2: string;
  boardIndex: null;
}

const UpdateBoard = (props: UpdateBoardProps) => {
  const { modal, handleModals, boardID2, boardIndex } = props;
  const [modalReset, setModalReset] = useState(false);
  const [boardUpdated, setBoardUpdated] = useState(false);
  const [newColumns, setNewColumns] = useState(NewColumnsState);
  const [inputField, setInputField] = useState<InitialValues2>({ name: '' });
  const { data, isError, isLoading } = useSelector((state: any) => state.boards);
  const dispatch = useAppDispatch();
  const columns = ['todo_column', 'overdue_column', 'inprogress_column', 'completed_column'];


  useEffect(() => {
    if (data?.boardData?.data?.[boardIndex === null ? '' : boardIndex]) {
      setInputField({ name: data.boardData.data[boardIndex === null ? '' : boardIndex].name });
    };

    if(modal === 'updateBoard') {
      setModalReset(false)
    };
  }, [boardID2, modal]);

  const handleUpdateBoard = (values: any) => {
    const newValues: IcolumnObj = {
      name: values.name,
      id: values.id,
      todo_column: values.columns.columnsObj.todo_column,
      overdue_column: values.columns.columnsObj.overdue_column,
      inprogress_column: values.columns.columnsObj.inprogress_column,
      completed_column: values.columns.columnsObj.completed_column
    };

    Object.keys(newValues).forEach(key => {
      if (newValues[key] === undefined) {
        delete newValues[key];
      }
    });

    dispatch(updateBoard(newValues)).
      then((res) => {
        if (res.payload.status === 200) {
          dispatch(getBoards())
          setBoardUpdated(true)
        }
      });
  };

  const handleCreateBoardCloseBtn = () => {
    handleModals("updateBoard")
    setModalReset(true)
    setBoardUpdated(false)
  }

  const handleCheckboxChange = (event: { target: { checked: any; }; }, column: string,) => {
    const isChecked = event.target.checked;
    setNewColumns((prevColumns) => ({
      ...prevColumns, columnsObj: { ...prevColumns.columnsObj, [column]: isChecked }
    }));
  };

  const handleColumnName = (column: string) => {
    const columnNames: { [key: string]: string } = {
      todo_column: 'ToDo',
      overdue_column: 'Overdue',
      inprogress_column: 'Inprogress',
      completed_column: 'Completed',
    };
    return columnNames[column];
  };

  const renderSuccessMessage = () => (
    <div className="successful-201">
      <div onClick={handleCreateBoardCloseBtn} className="close-successful-modal">
        <CloseIcon />
      </div>
      <img src={SuccessIcon} alt="success Icon" />
      <h3>SUCCESS!</h3>
      <p>Board updated successfully.</p>
    </div>
  );

  const renderErrorMessage = () => (
    <div className="err-mdal">
      <div className="err-hd-closebtn">
        <div onClick={handleCreateBoardCloseBtn} className="close-err-modal">
          <CloseIcon />
        </div>
      </div>
      <img src={errIcon} alt="error icon" />
      <h3>ERROR!</h3>
      <p>An error occurred while trying to update the board.</p>
    </div>
  );

  const renderForm = () => (
    <Formik
      initialValues={{ ...inputField, id: boardID2, columns: newColumns }}
      enableReinitialize
      onSubmit={(values) => handleUpdateBoard(values)}
    >
      {({ handleSubmit, handleBlur, handleChange, values, touched, dirty }) => (
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
          {columns.map((column: string, index: number) => (
            <div className="columns-update" key={index}>
              <p>{handleColumnName(column)}</p>
              <div className="checkbox-wrapper">
                <Field
                  name={`checked${index}`}
                  type={'checkbox'}
                  checked={values.columns.columnsObj[index]}
                  defaultChecked={data.boardData.data[boardIndex === null ? '' : boardIndex][column]}
                  id={`cbtest-19${index}`}
                  onChange={(event: { target: { checked: any; }; }) => { handleCheckboxChange(event, column) }}
                />
                <label htmlFor={`cbtest-19${index}`} className="check-box"></label>
              </div>
            </div>
          ))}
          {isLoading?.isUpdateBoardLoading ? (
            <button className="create_board" type="submit">
              <i className="fa fa-spinner fa-spin"></i>Loading...
            </button>
          ) : (
            <button disabled={!dirty && Object.keys(newColumns.columnsObj).length === 0} className="create_board" type="submit">
              Update Board
            </button>
          )}
        </Form>
      )}
    </Formik>
  )

  return (
    <ReactModal
      isOpen={modal === 'updateBoard'}
      contentLabel="update board modal"
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      shouldReturnFocusAfterClose
      ariaHideApp={false}
      id='update-board-modal'
    >
      {!modalReset && boardUpdated ? (
        renderSuccessMessage()
      ) : !modalReset && isError.isUpdateBoardError ? (
        renderErrorMessage()
      ) : (
        <>
          <div className="board-hd-closebtn">
            <h3 className='add-new-board-hd'>Update board</h3>
            <div onClick={() => handleModals("updateBoard")} className="close-board-modal">
              <CloseIcon />
            </div>
          </div>
          {renderForm()}
        </>
      )}
    </ReactModal>
  );
}

export default UpdateBoard