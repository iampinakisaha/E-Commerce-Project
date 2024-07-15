import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = ({item}) => {
  
  return (
    <div className="h-[calc(100vh-180px)] bg-white shadow-md w-full m-4 mx-auto">
      <div className="grid justify-center items-center   h-[calc(100vh-600px)] pt-10">
        <div className="flex justify-center">
          <img
            src="src/assets/emptykart.png"
            className="active:scale-110 transition-all ease-out "
            style={{
              maxWidth: "200%",
              maxHeight: "200px",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="grid justify-center items-center mt-2 gap-2">
          <span className="grid justify-center items-center text-lg font-semibold">
            
            Your {item ? (item) : ("cart")} is Empty!
          </span>
          <span className="grid justify-center items-center text-md text-gray-600">
         
            Add items to {item ? (item) : ("it")} now.
          </span>
        </div>
        <Link to={"/search"}>
          <div className="grid justify-center items-center mt-3 p-3 bg-blue-400 rounded shadow-md text-white font-semibold text-lg select-none hover:bg-blue-600 active:scale-95 cursor-pointer transition-all ease-in-out">
            <button>Shop Now</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
