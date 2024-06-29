import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUserDetails } from "../store/userSlice";

const Profile = () => {
  const userRole = useSelector((state) => state?.user?.user?.role)
 
  return (
    <div className="hidden absolute bg-white bottom-0 top-8 h-fit p-4 shadow-lg rounded-md group-hover:block">
              <nav className="grid w-full h-full min-w-48 ">
                <Link to={"/"}>
                <div className="p-1 m-2  hover:text-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-110 hover:scale-110">Profile</div>
                </Link>
                {userRole === "ADMIN" && <Link to={"/admin-panel"}>
                <div className="p-1 m-2  hover:text-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-110 hover:scale-110">Admin</div>
                </Link>}
                
                <hr className="p-1 m-2"/>
                <div className="grid ">
                  <div className="p-1 m-2  hover:text-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-110 hover:scale-110">Order</div>
                  <div className="p-1 m-2  hover:text-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-110 hover:scale-110">Wishlist</div>
                  <div className="p-1 m-2  hover:text-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-110 hover:scale-110">Gift Card</div>
                  <div className="p-1 m-2  hover:text-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-x-110 hover:scale-x-110">Contact Us</div>
                </div>
              </nav>
            </div>
  );
};

export default Profile;
