import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import ProductCatagory from "../helpers/ProductCatagory";
import { FaFileUpload } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
const UploadProducts = ({ onClose }) => {
  //initialize state for the data tp enter
  const [productData, setProductData] = useState({
    productName: "",
    brandName: "",
    catagory: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [uploadProductImageInput, setUploadProductImageInput] = useState("");
  const handleOnChange = (event) => {};
  const handleUploadProduct = async(event) => {
    const file = event.target.files[0];
    setUploadProductImageInput(file.name)
    const uploadImageColudinary = await uploadImage(file)
    console.log("Upload Image", uploadImageColudinary);
  };

  return (
    <div className="bg-slate-200 bg-opacity-35 fixed h-full w-full right-0 left-0 top-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md w-full max-w-[50%] h-full max-h-[80%] overflow-hidden">
        <div className=" p-4 m-2 flex justify-between items-center rounded ">
          <h2 className="font-semibold text-xl">Upload Products</h2>
          <div
            className="bg-red-600 p-1 rounded-full  text-white text-2xl w-fit ml-auto hover:scale-110 transition-all ease-in-out active:bg-red-800 active:scale-90 cursor-pointer"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>

        <form className="grid p-2 gap-2 overflow-y-scroll h-[80%]">
          {/* product name start */}
          <label htmlFor="productName" className="font-semibold">
            Product Name :
          </label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            value={productData.productName}
            name="productName"
            onChange={handleOnChange}
            className="p-2  bg-slate-100 border rounded"
          ></input>
          {/* product name end */}

          {/* brand name start */}
          <label htmlFor="brandName" className="font-semibold mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Brand Name"
            value={productData.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="p-2  bg-slate-100 border rounded"
          ></input>
          {/* brand name end */}

          {/* catagory start */}
          <label htmlFor="catagory" className="font-semibold mt-3">
            Catagory :
          </label>
          <select
            value={productData.catagory}
            className="p-2  bg-slate-100 border rounded"
          >
            {ProductCatagory.map((item, index) => {
              return (
                <option value={item.value} key={item.value + index}>
                  {item.label}
                </option>
              );
            })}
          </select>
          {/* catagory end */}

          {/* Product image start */}
          <label htmlFor="productImage" className="font-semibold mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border  rounded h-36 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  {" "}
                  <FaFileUpload />
                </span>
                <p className="text-md">Upload Product Images</p>
                <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProduct}></input>
              </div>
            </div>
          </label>
          <div className="flex">
            <img
              src=""
              width={100}
              height={100}
              className="bg-slate-100 border rounded "
            ></img>
          </div>
          {/* Product image end */}
        </form>
      </div>
    </div>
  );
};

export default UploadProducts;
