"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [],
  user: null,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      console.log("action", action);
      state.basket.push(action.payload);
    },
    removeFromBasket: (state, action) => {
      const index = state.basket.findIndex((basketItem) => {
        return basketItem._id === action.payload;
      });
      // console.log(index)
      if (index >= 0) {
        //item exists, and remove it
        state.basket.splice(index, 1);
        //  return state;
      } else {
        console.log("not find");
      }
    },
    clearBasket: (state) => {
      state.basket = [];
    }

  },
});

export const { addToBasket, removeFromBasket, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;
