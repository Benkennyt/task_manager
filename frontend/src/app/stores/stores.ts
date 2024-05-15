import { configureStore} from "@reduxjs/toolkit";
import userReducer from "../api/userSlice";
import boardReducer from "../api/boardSlice";
import taskReducer from "../api/taskSlice";
import subtaskReducer from "../api/subtaskSlice";
import { useDispatch } from "react-redux";





export const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardReducer,
    tasks: taskReducer,
    subtasks: subtaskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});



export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
