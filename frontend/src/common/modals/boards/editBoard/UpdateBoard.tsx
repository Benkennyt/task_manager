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

const UpdateBoard = (props: any) => {
  const [modalReset, setModalReset] = useState(false)
  const [newColumns, setNewColumns] = useState(NewColumnsState)
  const [inputField, setInputField] = useState<InitialValues2>({name:''});
  const { modal, handleModals, boardID2, boardIndex} = props
  const { data, isError, isLoading } = useSelector((state: any) => state.boards)
  const columns = ['todo_column', 'overdue_column', 'inprogress_column', 'completed_column'];
  const dispatch = useAppDispatch()


  useEffect(() => {
        setInputField((prev) => ({
          ...prev,
          name: handleInitialBoardName(),
        }));
      }, [boardID2]);

  const handleUpdateBoard = (values: any) => {
    const newValues: IcolumnObj = {
      name: values.name,
      id: values.id,
      todo_column: values.columns.columnsObj.todo_column,
      overdue_column: values.columns.columnsObj.overdue_column,
      inprogress_column: values.columns.columnsObj.inprogress_column,
      completed_column: values.columns.columnsObj.completed_column
    }

    Object.keys(newValues).forEach(key => {
      if (newValues[key] === undefined) {
        delete newValues[key];
      }
    });

    dispatch(updateBoard(newValues)).
    then((res) => {
      if (res.payload.status === 200){
        dispatch(getBoards())
      }
    })
    setModalReset(false)
  }

  const handleInitialBoardName = () => {
    if (data && data.boardData && data.boardData.data && data.boardData.data[boardIndex]) {
      return data.boardData.data[boardIndex].name
    } else {
      return ''
    }
  }

  const handleCreateBoardCloseBtn2 = () => {
    handleModals("updateBoard")
    setModalReset(true)
  }

  const handleCheckboxChange = (event: { target: { checked: any; }; }, column: string,) => {
    const isChecked = event.target.checked;
    setNewColumns((prevColumns) => ({...prevColumns, columnsObj: {...prevColumns.columnsObj,[column]:isChecked}
  }));
  };

  const handleColumnName = (column: string) => {
    if (column === 'todo_column') {
      return 'ToDo'
    } else if (column === 'overdue_column') {
      return 'Overdue'
    } else if (column === 'inprogress_column') {
      return 'Inprogress'
    } else {
      return 'Completed'
    }
  }

  return (
    <ReactModal
      isOpen={modal == 'updateBoard'}
      contentLabel="update board modal"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldReturnFocusAfterClose={true}
      ariaHideApp={false}
      id='update-board-modal'
    >
      {
        !modalReset && data?.updateBoardData && data.updateBoardData?.status === 200 ?


          <div className="successful-201">
            <div onClick={() => handleCreateBoardCloseBtn2()} className="close-successful-modal">
              <CloseIcon />
            </div>
            <img src={SuccessIcon} alt="success Icon" />
            <h3>SUCCESS!</h3>
            <p>Board updated successfully.</p>
          </div>
          : isError.isUpdateBoardError ?
          <div className="err-mdal">
          <div className="err-hd-closebtn">
            <div onClick={() => handleCreateBoardCloseBtn2()} className="close-err-modal">
              <CloseIcon />
            </div>
          </div>
          <img src={errIcon} alt="error icon" />
          <h3>ERROR!</h3>
          <p>An error occured while trying to update board.</p>
        </div>
            :
            <>
              <div className="board-hd-closebtn">

                <h3 className='add-new-board-hd'>Update board
                </h3>
                <div onClick={() => handleModals("updateBoard")} className="close-board-modal">
                  <CloseIcon />
                </div>
              </div>
              <Formik
                initialValues={{ ...inputField, id: boardID2, columns: newColumns }}
                enableReinitialize
                onSubmit={async (values) => {
                  handleUpdateBoard(values);
                  
                }}

              >
                {({ handleSubmit, handleBlur, handleChange, values, touched, dirty
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
                    {columns.map((column: string, index) => {
                      return <div className="columns-update" key={index}>
                        <p>{handleColumnName(column)}</p>
                        <div className="checkbox-wrapper">
                          <Field
                            name={`checked${index}`}
                            type={'checkbox'}
                            checked={values.columns.columnsObj[index]}
                            defaultChecked={data.boardData.data[boardIndex][column]}
                            id={`cbtest-19${index}`}
                            onChange={(event: { target: { checked: any; }; }) => { handleCheckboxChange(event, column) }}
                          />
                          <label htmlFor={`cbtest-19${index}`} className="check-box"></label>
                        </div>
                      </div>
                    })}

                    {isLoading?.isUpdateBoardLoading ? <button className="create_board" type="submit">
                      <i className="fa fa-spinner fa-spin"></i>Loading...
                    </button> : <button disabled={!dirty && Object.keys(newColumns.columnsObj).length === 0 } className="create_board" type="submit">
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