import React from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 py-2 justify-between">
        {/* logo section start*/}
        <div
          className="cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-75 hover:scale-110"
          rel="logo"
        >
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        {/* logo section ends*/}

        {/* search section start*/}
        <div
          className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow  pl-2 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-110 hover:scale-110"
          rel="search"
        >
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none"
          ></input>
          <div className="text-xl min-w-[50px] bg-red-600 h-8 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
        {/* search section ends*/}

        {/* user/cart/login section start*/}
        <div className="flex items-center gap-7">
          {/* user section start*/}
          <div
            className="text-3xl cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-75 hover:scale-110"
            rel="user"
          >
            <FaRegCircleUser />
          </div>
          {/* user section end*/}

          {/* cart section start*/}
          <div
            className="text-2xl cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-75 flex a relative hover:scale-110"
            rel="cart"
          >
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 text-white h-5 w-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-base ">0</p>
            </div>
          </div>
          {/* cart section ends*/}

          {/* login section start */}
          <div>
            <Link to={"/login"}>
            <button className="px-4 py-1 rounded-full text-white bg-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-75 active:bg-red-800 hover:scale-110">
              Login
            </button>
            </Link>
          </div>
          {/* login section ends */}
        </div>
        {/* user/cart/login section ends*/}
      </div>
    </header>
  );
};

export default Header;
