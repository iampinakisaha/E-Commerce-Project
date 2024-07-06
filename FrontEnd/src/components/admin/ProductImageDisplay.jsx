import React from "react";
import { IoClose } from "react-icons/io5";

const ProductImageDisplay = ({ onClose, imgUrl }) => {
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center">
  <div className="bg-white shadow-lg rounded max-w-5xl mx-auto">
    <div className="relative flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
      <img
        src={imgUrl}
        className="w-full h-full"
        alt="Product"
      />
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-3xl hover:scale-110 transition-all ease-in-out hover:text-red-400 active:scale-90">
        <IoClose />
      </button>
    </div>
  </div>
</div>

  );
};

export default ProductImageDisplay;
