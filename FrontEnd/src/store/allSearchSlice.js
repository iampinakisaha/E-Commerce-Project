import { createSlice } from "@reduxjs/toolkit";

export const allSearchSlice = createSlice({
  name: "searchData",
  initialState: {
    search: [],
    fetchStatus: false,
  },
  reducers: {
    setSearchProduct: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearchProduct } = allSearchSlice.actions;

export default allSearchSlice;
