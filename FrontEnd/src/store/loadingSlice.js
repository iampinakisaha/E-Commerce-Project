// store/loadingSlice.js

import { createSlice } from "@reduxjs/toolkit";



const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    setLoading: (state, action) => {
      // console.log("This is Action payload", action.payload)
      return action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice;
