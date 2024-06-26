import React from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";

const Header = () => {
  return (
    <header className="h-16 shadow-md">
      <div className="h-full container mx-auto flex items-center px-4 py-2 justify-between">
        <div className="">
          <Logo w={90} h={50} />
        </div>

        <div className="flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow  pl-2">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none"
          ></input>
          <div className="text-xl min-w-[50px] bg-red-600 h-8 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div>User Icon Cart</div>
      </div>
    </header>
  );
};

export default Header;
