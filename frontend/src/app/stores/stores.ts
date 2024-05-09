import { configureStore} from "@reduxjs/toolkit";
import userReducer from "../api/userSlice";
import boardReducer from "../api/boardSlice";
import taskReducer from "../api/taskSlice"
import { useDispatch } from "react-redux";





export const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardReducer,
    tasks: taskReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});



export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
