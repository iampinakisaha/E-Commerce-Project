import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const bagSlice = createSlice({
  name: 'bagData',
  initialState: JSON.parse(localStorage.getItem('bagData')) || [],
  reducers: {
    addToBag: (state, action) => {
      // Check if item already exists in bag to avoid duplicates
      // if (!state.some(item => item === action.payload)) {
        
      // }
      console.log("action.payload",action.payload)
      state.push(action.payload);
      localStorage.setItem('bagData', JSON.stringify(state));
    },
    removeFromBag: (state, action) => {
      const updatedState = state.filter(item => item !== action.payload);
      localStorage.setItem('bagData', JSON.stringify(updatedState));
      return updatedState;
    },
    clearBag: () => {
      localStorage.removeItem('bagData');
      return [];
    },
    decrement: (state, action) => {
      const indexToRemove = state.findIndex(item => item === action.payload);
      if (indexToRemove !== -1) {
        state.splice(indexToRemove, 1);
        localStorage.setItem('bagData', JSON.stringify(state));
      }
    },
    increment: (state, action) => {
      const itemCount = state.filter(item => item === action.payload).length;
      if (itemCount < 5) {
        state.push(action.payload);
        localStorage.setItem('bagData', JSON.stringify(state));
      } else {
        // Handle case where limit is reached
        
        toast.error(`You can't add more than 5 items for the same product.`)
        // You can choose to show a message, throw an error, or handle as needed
      }
    },
    
  },
});

export const { addToBag, removeFromBag, clearBag, decrement, increment } = bagSlice.actions;

export const selectBagItems = (state) => state.bagData;

export default bagSlice;
