import React from "react";
// import { useSelector, useDispatch } from 'react-redux'
// import  { fetchAllProduct } from '../../store/allProductSlice';
import ProductCatagory from "../../helpers/ProductCatagory";
const Navbar = () => {
  return (
    <div className="flex flex-row justify-evenly shadow-md bg-white font-semibold gap-5 p-12 m-2 ml-2 mr-2 mx-auto">
      {ProductCatagory.map((item, index) => {
        return (
          <span value={item.value} key={item.value + index}>
            {item.label}
          </span>
        );
      })}
    </div>
  );
};

export default Navbar;
