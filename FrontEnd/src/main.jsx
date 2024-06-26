import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider} from "react-router-dom";
import App from "./App.jsx";
import { router } from "./routes/index.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
