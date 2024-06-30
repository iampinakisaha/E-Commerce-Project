import React, { useState } from "react";
import UploadProducts from "../components/UploadProducts";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between shadow-md">
        <h2 className="font-bold text-slate-800 text-lg"> All Products</h2>

        <button className="p-2 bg-red-600 rounded-full text-white text-sm hover:scale-110 transition-all ease-in-out active:bg-red-800 active:scale-90" onClick={()=>setOpenUploadProduct(true)}>
          Upload Products
        </button>
      </div>
      {openUploadProduct && <UploadProducts onClose={()=>setOpenUploadProduct(false)}/>}
    </div>
  );
};

export default AllProducts;
