"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state) => {
      state.user+=1;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
