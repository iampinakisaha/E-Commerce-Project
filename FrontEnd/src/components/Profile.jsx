import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUserDetails } from "../store/userSlice";

const Profile = () => {
  const user = useSelector((state) => state?.user?.user);
  const userRole = useSelector((state) => state?.user?.user?.role);
  if (user?._id) {
  return (
    <div className="hidden absolute bg-white bottom-0 top-8 h-fit p-4 shadow-lg rounded-md z-20 group-hover:block">
              <nav className="grid w-full h-full min-w-48 ">
                <Link to={"/profile"}>
                <div className="p-1 m-2  hover:text-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-110 hover:scale-110">Profile</div>
                </Link>
                {userRole === "ADMIN" && <Link to={"/admin-panel"}>
                <div className="p-1 m-2  hover:text-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-110 hover:scale-110">Admin</div>
                </Link>}
                
                <hr className="p-1 m-2"/>
                <div className="grid ">
                  <Link to={"/bag-summary"} className="p-1 m-2  hover:text-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-110 hover:scale-110">Order</Link>
                  <Link to={"/wishlist"} className="p-1 m-2  hover:text-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-110 hover:scale-110">Wishlist</Link>
                  <Link to={"/giftcard"} className="p-1 m-2  hover:text-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-110 hover:scale-110">Gift Card</Link>
                  <Link to={"/contact-us"} className="p-1 m-2  hover:text-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-x-110 hover:scale-x-110">Contact Us</Link>
                </div>
              </nav>
            </div>
  );} else {
    // // Redirect or navigate to another page if not admin
    // navigate("/");
    return null; // Or handle non-admin case appropriately
  }
};

export default Profile;
