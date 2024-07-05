import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./loadingSlice";
import userSlice from "./userSlice";
import allProductSlice from "./allProductSlice";
import allCatagorySlice from "./allCatagorySlice";
const eCommerceStore = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    user: userSlice.reducer,
    productData : allProductSlice.reducer,
    catagoryData : allCatagorySlice.reducer,
  },
});

export default eCommerceStore;