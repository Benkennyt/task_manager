import './Sidebar.css';
import 'react-tooltip/dist/react-tooltip.css';
import { BoardsIcon, TrashIcon, EditPen, SignOutIcon, SettingsIcon2 } from '../../../assets/svg/SVG';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/stores/stores';
import { getBoards } from '../../../app/api/boardSlice';

const Sidebar = (props: any) => {
    const { handleModals, setBoardID, setBoardID2, activeBoard, setActiveBoard, toggleSideBar, setToggleSideBar, setBoardIndex } = props;
    const { data } = useSelector((state: any) => state.boards)
    const dispatch = useAppDispatch()

    const capitalizeFirstLetter = (name: string) => {
        const words = name.split(' ')

        for (let i = 0; i < words.length; i++) {
            if (words[i] != '') {
                words[i] = words[i][0].toUpperCase() + words[i].slice(1)
            }
        }
        return words.join(" ")
    }


    useEffect(() => {
        dispatch(getBoards())
    }, [])

    useEffect(() => {
        if (data && data.boardData && data.boardData.data && data.boardData.data[0]) {
            setBoardID(data.boardData.data[activeBoard].id)
        }
    }, [data])


    const handleDeleteBoard = (id: string) => {
        setBoardID2(id)
        handleModals('deleteBoard')
    }

    const handleUpdateBoard = (options: { id: any; index: any; }) => {
        setBoardID2(options.id)
        setBoardIndex(options.index)
        handleModals('updateBoard')
    }


    return (
        <div className={toggleSideBar ? "sidebar" : "sidebar sidebar-hide"}>
            <div className="boards">
            <label className="logo sidebar-logo">TaskBender <div className='logo-2'>TB</div></label>`
                <h3 className='board-hub'>BOARD HUB (8)</h3>
                <div className="boards-2">
                    <ul className='boards-list'>
                        {data.boardData?.data?.map((board: any, index: any) => {

                            return (
                                <li key={index}>
                                    <div className="board-icon trash-icon" onClick={() => { handleDeleteBoard(board.id), setToggleSideBar(false) }}>
                                        <TrashIcon />
                                    </div>
                                    <div className="board-icon edit-icon" onClick={() => { handleUpdateBoard({ id: board.id, index: index }), setToggleSideBar(false) }}>
                                        <EditPen />
                                    </div>
                                    <div onClick={() => { setActiveBoard(index), setToggleSideBar(false), setBoardID(board.id) }} className={activeBoard === index ? 'board active' : 'board'}>
                                        <BoardsIcon />
                                        <p>{capitalizeFirstLetter(board.name)}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div onClick={() => { handleModals("newBoard"), setToggleSideBar(false) }} className="create-board">
                        <BoardsIcon />
                        <p>+Creare New Board</p>
                    </div>

                </div>
            </div>
            <div className={"profile-nav"}>
                <div className="prfl-nav-btn" ><SettingsIcon2 /><p>Settings</p></div>
                <div className="prfl-nav-btn" onClick={() => { localStorage.clear() }} ><SignOutIcon /><p>Sign out</p></div>
            </div>
        </div>
    )
}

export default Sidebar