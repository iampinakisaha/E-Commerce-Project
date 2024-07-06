import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: 'bagData',
  initialState: JSON.parse(localStorage.getItem('bagData')) || [],
  reducers: {
    addToBag: (state, action) => {
      // Check if item already exists in bag to avoid duplicates
      if (!state.some(item => item._id === action.payload)) {
        state.push(action.payload);
        localStorage.setItem('bagData', JSON.stringify(state));
      }
    },
    removeFromBag: (state, action) => {
      const updatedState = state.filter(item => item !== action.payload);
      localStorage.setItem('bagData', JSON.stringify(updatedState));
      return updatedState;
    },
    clearBag: () => {
      localStorage.removeItem('bagData');
      return [];
    }
  },
});

export const { addToBag, removeFromBag, clearBag } = bagSlice.actions;

export const selectBagItems = (state) => state.bagData;

export default bagSlice;
