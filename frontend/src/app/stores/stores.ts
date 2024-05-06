import { configureStore} from "@reduxjs/toolkit";
import userReducer from "../api/userSlice";
import taskReducer from "../api/boardSlice"
import { useDispatch } from "react-redux";





export const store = configureStore({
  reducer: {
    user: userReducer,
    boards: taskReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});



export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
