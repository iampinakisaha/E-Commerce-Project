import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { router } from "./routes/index.jsx";
import eCommerceStore from "./store/index.js";
import LoadingSpinner from "./helpers/loadingSpinner.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={eCommerceStore}>
      <RouterProvider router={router}>
      <LoadingSpinner />
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
