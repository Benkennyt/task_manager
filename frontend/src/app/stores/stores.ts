import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../api/userSlice";
import { useDispatch } from "react-redux";



export const store = configureStore({
  reducer: {
    user: userReducer
  }
});



export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
