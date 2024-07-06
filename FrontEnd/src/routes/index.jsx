import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/Admin/AdminPanel";
import AllUsers from "../pages/Admin/AllUsers";
import AllProducts from "../pages/Admin/AllProducts";
import ErrorPage from "../pages/ErrorPage";
import AllCatagory from "../pages/Admin/AllCatagory";
import ProductSearch from "../pages/ProductSearch";
export const router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />,
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
        element: <Login />,
      },
      {
        path: "/reset",
        element: <ForgotPassword />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/search",
        element: <ProductSearch />,
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "/admin-panel/all-users",
            element: <AllUsers />,
          },
          {
            path: "/admin-panel/products",
            element: <AllProducts />,
          },
          {
            path: "/admin-panel/catagories",
            element: <AllCatagory/>
          },
        ],
      },
    ],
  },
]);
