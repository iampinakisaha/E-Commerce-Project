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
import ItemDetailsPage from "../pages/ItemDetailsPage";
import BagItem from "../pages/BagItem";
import EmptyCart from "../helpers/EmptyCart";
import Wishlist from "../pages/Wishlist";
import Giftcard from "../pages/Giftcard";
import UserProfileEdit from "../pages/UserProfileEdit";
import ContactUs from "../pages/ContactUs";
import userPasswordReset from "../pages/userPasswordReset";



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
        children: [
          {
            path: "/reset/change-password",
            element: <userPasswordReset/>
          },
        ]
        
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/wishlist",
        element: <Wishlist/>
      },
      {
        path: "/giftcard",
        element: <Giftcard/>
      },
      {
        path: "/profile",
        element: <UserProfileEdit/>
      },
      {
        path: "/contact-us",
        element: <ContactUs/>
      },
      {
        path: "/search",
        element: <ProductSearch />,
        children: [
          {
            path: "/search/:productName",
          element: <ProductSearch />,
          },
        ],
      },
      {
        path: "/product-details/:itemId",
        element: <ItemDetailsPage />,
      },
      {
        path: "/bag-summary",
        element: <BagItem/>
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
            element: <AllCatagory />,
          },
        ],
      },
    ],
  },
]);
