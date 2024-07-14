import { createSlice } from "@reduxjs/toolkit";


export const allProductSlice = createSlice({
  name: "productData",
  initialState: {
    products : [],
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
        (product) => product._id === action.payload?._id
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
        (product) => product._id !== action.payload?._id
      );
    
    },
    fetchAllProduct: (state, action) => {
      state.fetchStatus = action.payload;
     
    },
  },
});

export const selectProductById = (state, productId) => 
  
  state.productData.products.find((product) => product?._id === productId);

export const { setProducts, addNewProduct, updateProductData, deleteProduct, fetchAllProduct, fetchProductById } = allProductSlice.actions;

export default allProductSlice;





// {
//   productName: "",
//   brandName: "",
//   catagory: "",
//   productImage: [],
//   description: "",
//   price: "",
//   selling: "",
// }