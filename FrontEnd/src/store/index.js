import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./loadingSlice";
import userSlice from "./userSlice";
import allProductSlice from "./allProductSlice";
import allCatagorySlice from "./allCatagorySlice";
import bagSlice from "./bagSlice";
const eCommerceStore = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    user: userSlice.reducer,
    productData : allProductSlice.reducer,
    catagoryData : allCatagorySlice.reducer,
    bagData : bagSlice.reducer,
  },
});

export default eCommerceStore;