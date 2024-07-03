import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import ErrorPage from "../pages/ErrorPage";
export const router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage/>
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/reset",
        element: <ForgotPassword/>,
      },
      {
        path: "/signup",
        element: <Signup/>,
      },
      {
        path: "/admin-panel",
        element: <AdminPanel/>,
        children: [
          {
            path: "/admin-panel/all-users",
            element: <AllUsers/>,
          },
          {
            path: "/admin-panel/products",
            element: <AllProducts/>,
          },
        ]
      },
      
    ],
  },
]);
