import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reservationsReducer from './reservation/reservationSlice';
import feedbacksReducer from './feedback/feedbackSlice';
import servicesReducer from './service/serviceSlice'
import usersReducer from './user/userSlice'

export const store = configureStore({
    reducer: {
        reservations: reservationsReducer,
        feedbacks: feedbacksReducer,
        services: servicesReducer,
        users: usersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export  const useAppDispatch:  () =>  AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState>  = useSelector;