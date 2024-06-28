import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./loadingSlice";

const eCommerceStore = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
  },
});

export default eCommerceStore;