import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";
import storage from "redux-persist/lib/storage";
import loadingSlice from "./loadingSlice";
import userSlice from "./userSlice";
import allProductSlice from "./allProductSlice";
import allCatagorySlice from "./allCatagorySlice";
import bagSlice from "./bagSlice";
import allSearchSlice from "./allSearchSlice";
import wishlistSlice from "./wishListSlice";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"], // Exclude 'user' slice from persistence
};

// Combine all reducers
const rootReducer = combineReducers({
  loading: loadingSlice.reducer,
  user: userSlice.reducer,
  productData: allProductSlice.reducer,
  catagoryData: allCatagorySlice.reducer,
  bagData: bagSlice.reducer,
  searchData: allSearchSlice.reducer,
  wishlistData: wishlistSlice.reducer,
});

// Persist the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with persistedReducer and customized middleware
const eCommerceStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor for the store
const persistor = persistStore(eCommerceStore);

// Function to clear persisted data on session expiry
export const clearPersistedStore = () => {
  persistor.purge();
};

export { eCommerceStore, persistor };
