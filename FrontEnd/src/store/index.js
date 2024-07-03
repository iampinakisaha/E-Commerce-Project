import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./loadingSlice";
import userSlice from "./userSlice";
import allProductSlice from "./allProductSlice";
const eCommerceStore = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    user: userSlice.reducer,
    productData : allProductSlice.reducer,
  },
});

export default eCommerceStore;