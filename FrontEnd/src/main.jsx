import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { router } from "./routes/index.jsx";
import { eCommerceStore , persistor } from "./store/index.js";
import LoadingSpinner from "./helpers/loadingSpinner.jsx";
import { PersistGate } from 'redux-persist/integration/react';
import SetupInterceptors from './routes/SetupInterceptors'; //if session expires then will route to main page


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>

  <Provider store={eCommerceStore}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}>
        <LoadingSpinner />
        <SetupInterceptors> 
        <App />
        </SetupInterceptors>
      </RouterProvider>
    </PersistGate>
  </Provider>

  // </React.StrictMode>
);
