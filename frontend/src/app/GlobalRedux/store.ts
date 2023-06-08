"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './Features/counter/counterSlice';
import basketReducer from './Features/basket/basketSlice';
import userReducer from './Features/user/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    basket: basketReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
