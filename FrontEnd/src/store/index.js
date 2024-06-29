import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./loadingSlice";
import userSlice from "./userSlice";

const eCommerceStore = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    user: userSlice.reducer,
  },
});

export default eCommerceStore;