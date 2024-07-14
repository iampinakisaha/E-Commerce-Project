import { createSlice } from "@reduxjs/toolkit";


export const allCatagorySlice = createSlice({
  name: "catagoryData",
  initialState: {
    catagory : [],
    fetchStatus: false,
  },
  reducers: {
    setCatagory: (state, action) => {
      
      state.catagory = action.payload;
    },
    addNewCatagory: (state, action) => {
      state.catagory.push(action.payload);
    },
    updateCatagoryData: (state, action) => {
      const index = state.catagory.findIndex(
        (catagory) => catagory._id === action.payload?._id
      );
      if (index !== -1) {
        state.catagory[index] = {
          ...state.catagory[index],
          ...action.payload,
        };
      }
    },
    deleteCatagory: (state, action) => {
      
      state.catagory = state.catagory.filter(
        (catagory) => catagory._id !== action.payload?._id
      );
      
    },
    fetchAllCatagory: (state, action) => {
      
      state.fetchStatus = action.payload;
     
    },
  },
});

export const { setCatagory, addNewCatagory, updateCatagoryData, deleteCatagory, fetchAllCatagory } = allCatagorySlice.actions;

export default allCatagorySlice;



// {
//   catagoryName: "",
//   catagoryType: "",
//   catagoryImage: [],
// }