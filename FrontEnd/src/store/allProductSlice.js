import { createSlice } from "@reduxjs/toolkit";

export const allProductSlice = createSlice({
  name: "productData",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addNewProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateNewProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...action.payload,
        };
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    },
    fetchAllProduct: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts, addNewProduct, updateNewProduct, deleteProduct, fetchAllProduct } = allProductSlice.actions;

export default allProductSlice;
