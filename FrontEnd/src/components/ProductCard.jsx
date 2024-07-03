import React, { useState } from "react";
import AdminEditProduct from "./AdminEditProduct";

const ProductCard = ({ item, fetchData }) => {

  // product card edit - start
  const [editProductCard, setEditProductCard] = useState(false);
  // product card edir - end
  return (
    <div className="card flex flex-col justify-center items-center m-2 p-2 rounded relative group" style={{ width: "18rem" }}>
      <img
        src={item.productImage[0]}
        className="card-img-top"
        alt={item.productName}
        style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
      />
      <div className="card-body w-full mt-2">
        <div className="flex justify-between font-bold text-sm">
          <span className="truncate">{item.brandName}</span>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span className="truncate">{item.productName}</span>
        </div>
        <div className="flex justify-between mt-2 items-center">
          <span className="text-sm font-bold">Rs. {item.selling}</span>
          <span className="text-xs line-through text-gray-600">Rs. {item.price}</span>
          <span className="text-[12px] text-red-600">
            ({(((item.price - item.selling) / item.price) * 100).toFixed(2)}% OFF)
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 w-full hidden group-hover:block">
        <button className="bg-red-400 h-10 w-full p-2 text-white hover:bg-red-600 active:scale-95 transition-all ease-in-out" onClick={() => setEditProductCard(true)}>
          Edit Item
        </button>
      </div>
    {editProductCard && (<AdminEditProduct item = {item} onClose={() => setEditProductCard(false)} fetchData = {fetchData}/>)}
    
    </div>
  );
};

export default ProductCard;
