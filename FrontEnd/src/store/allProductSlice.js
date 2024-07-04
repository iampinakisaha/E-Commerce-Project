import { createSlice } from "@reduxjs/toolkit";
import AllProducts from "../pages/AllProducts";

export const allProductSlice = createSlice({
  name: "productData",
  initialState: {
    products : [{
      productName: "",
      brandName: "",
      catagory: "",
      productImage: [],
      description: "",
      price: "",
      selling: "",
    }],
    fetchStatus: false,
  },
  reducers: {
    setProducts: (state, action) => {
      
      state.products = action.payload;
    },
    addNewProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProductData: (state, action) => {
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
      // console.log("item deletion received",action.payload)
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      // console.log(state.products)
    },
    fetchAllProduct: (state, action) => {
      state.fetchStatus = action.payload;
      console.log(state.fetchStatus)
    },
  },
});

export const { setProducts, addNewProduct, updateProductData, deleteProduct, fetchAllProduct } = allProductSlice.actions;

export default allProductSlice;
