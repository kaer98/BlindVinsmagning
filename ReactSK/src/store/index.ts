import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import userReducer from './user/userSlice';

export const store = configureStore({
    reducer: { 
        user: userReducer //userReducer referer til den fra userSlice
    },
});

export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;