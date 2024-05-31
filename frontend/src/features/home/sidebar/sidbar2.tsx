import './Sidebar.css';
import 'react-tooltip/dist/react-tooltip.css';
import { BoardsIcon, TrashIcon, EditPen, SignOutIcon, SettingsIcon2 } from '../../../assets/svg/SVG';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/stores/stores';
import { getBoards } from '../../../app/api/boardSlice';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    handleModals: (id: string) => void;
    setBoardID: (id: string) => void;
    setBoardID2: (id: string) => void;
    activeBoard: number;
    setActiveBoard: (index: number) => void;
    toggleSideBar: boolean;
    setToggleSideBar: (toggle: boolean) => void;
    setBoardIndex: (index: number | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    handleModals,
    setBoardID,
    setBoardID2,
    activeBoard,
    setActiveBoard,
    toggleSideBar,
    setToggleSideBar,
    setBoardIndex
}) => {
    const { data } = useSelector((state: any) => state.boards);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBoards());
    }, [dispatch]);

    useEffect(() => {
        if (data.boardData?.data?.[0]) {
            setBoardID(data.boardData.data[activeBoard].id);
        }
    }, [data, activeBoard, setBoardID]);

    const capitalizeFirstLetter = (name: string): string => {
        return name.split(' ').map(word => word ? word.charAt(0).toUpperCase() + word.slice(1) : '').join(' ');
    };

    const handleDeleteBoard = (id: string) => {
        setBoardID2(id);
        handleModals('deleteBoard');
    };

    const handleUpdateBoard = (id: string, index: number) => {
        setBoardID2(id);
        setBoardIndex(index);
        handleModals('updateBoard');
    };

    const handleBoardClick = (id: string, index: number) => {
        setActiveBoard(index);
        setBoardID(id);
        setToggleSideBar(false);
    };

    return (
        <div className={toggleSideBar ? "sidebar" : "sidebar sidebar-hide"}>
            <div className="boards">
                <label className="logo sidebar-logo">
                    TaskBender
                    <div className='logo-2'>TB</div>
                </label>
                <h3 className='board-hub'>BOARD HUB ({data?.boardData?.data?.length || 0})</h3>
                <div className="boards-2">
                    <ul className='boards-list'>
                        {data.boardData?.data?.length > 0 ? data.boardData.data.map((board: any, index: number) => (
                            <li key={board.id}>
                                <div className="board-icon trash-icon" onClick={() => handleDeleteBoard(board.id)}>
                                    <TrashIcon />
                                </div>
                                <div className="board-icon edit-icon" onClick={() => handleUpdateBoard(board.id, index)}>
                                    <EditPen />
                                </div>
                                <div
                                    onClick={() => handleBoardClick(board.id, index)}
                                    className={activeBoard === index ? 'board active' : 'board'}
                                >
                                    <BoardsIcon />
                                    <p>{capitalizeFirstLetter(board.name)}</p>
                                </div>
                            </li>
                        )) : (
                            <li>
                                <div className="no-board">
                                    <p>No board</p>
                                </div>
                            </li>
                        )}
                    </ul>
                    <div onClick={() => handleModals("newBoard")} className="create-board">
                        <BoardsIcon />
                        <p>+ Create New Board</p>
                    </div>
                </div>
            </div>
            <div className="bottom-set-sign">
                <div onClick={() => navigate('/settings')}>
                    <SettingsIcon2 />
                    <p>Settings</p>
                </div>
                <div onClick={() => { localStorage.clear(); navigate('/'); }}>
                    <SignOutIcon />
                    <p>Sign out</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
