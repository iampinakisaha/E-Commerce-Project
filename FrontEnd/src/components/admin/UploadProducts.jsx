import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import uploadImage from "../../helpers/uploadImage";
import ProductImageDisplay from "./ProductImageDisplay";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { loadingActions } from "../../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../helpers/loadingSpinner";
import { addNewProduct } from "../../store/allProductSlice";
import { fetchAllCatagory } from "../../store/allCatagorySlice";
import deleteImage from "../../helpers/deleteImage";

const UploadProducts = ({ onClose }) => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.loading);
  const products = useSelector((state) => state.productData.products);
  const categories = useSelector((state) => state.catagoryData.catagory);


  //initialize state for the data tp enter
  const [newProductData, setNewProductData] = useState({
    productName: "",
    brandName: "",
    catagory: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  
  //extract catagory names from allCatagory
  const ProductCatagory = categories
    .map((obj) => obj.catagoryName)
    .filter((value, index, self) => self.indexOf(value) === index);

  useEffect(() => {
    dispatch(fetchAllCatagory(true));
  }, [dispatch]);


  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setNewProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUploadProduct = async (event) => {
    const file = event.target.files[0];
    const catagory = "product"; 

    const cloudinaryFolder = `mernproduct/${catagory}/`;
    
    const uploadImageCloudinary = await uploadImage(file, cloudinaryFolder);

    setNewProductData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.data.url],
    }));
  };

  // function to delete product image -start
  const handleOnDeleteProductImage = async (index) => {
   

    const newProductImage = [...newProductData.productImage];
    const imageUrl = newProductImage[index];
    
    const dataApi = await deleteImage(imageUrl);

    if(dataApi.success) {
      newProductImage.splice(index, 1);
      setNewProductData((prev) => ({
        ...prev,
        productImage: [...newProductImage],
      }));
      toast.success("Image deleted successfully");
    }
    

    
  };
  // function to delete product image - end

  // Function to handle product form submit - start

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(loadingActions.setLoading(true));

      const dataResponse = await fetch(SummaryApi.upload_product.url, {
        method: SummaryApi.upload_product.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newProductData),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        // Update products in Redux store after successful upload
        dispatch(addNewProduct(dataApi.data));
        toast.success(dataApi.message);
        onClose(true);
        // navigate("/admin-panel/products");
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (err) {
    
      toast.error("Error Uploading Product...");
    } finally {
      dispatch(loadingActions.setLoading(false)); // Hide loader
    }
  };
  // Function to handle product form submit - end
  return (
    <>
      {/* Conditionally render spinner */}
      {loadingStatus ? (
        <LoadingSpinner />
      ) : (
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

            <form
              className="grid p-2 gap-2 overflow-y-scroll h-[80%]"
              onSubmit={handleOnSubmit}
            >
              {/* product name start */}
              <label htmlFor="productName" className="font-semibold">
                Product Name :
              </label>
              <input
                type="text"
                id="productName"
                placeholder="Enter Product Name"
                value={newProductData.productName}
                name="productName"
                onChange={handleOnChange}
                required
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
                value={newProductData.brandName}
                name="brandName"
                required
                onChange={handleOnChange}
                className="p-2  bg-slate-100 border rounded"
              ></input>
              {/* brand name end */}

              {/* catagory start */}
              <label htmlFor="catagory" className="font-semibold mt-3">
                Catagory :
              </label>

              <select
                value={newProductData.catagory}
                name="catagory"
                required
                onChange={handleOnChange}
                className="p-2  bg-slate-100 border rounded"
              >
                <option value={""}>--Select Catagory--</option>
                {ProductCatagory.map((item, index) => {
                  return (
                    <option value={item.catagoryName} key={item.catagoryName}>
                      {item}
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
                    <input
                      type="file"
                      id="uploadImageInput"
                      name="productImage"
                      required
                      className="hidden"
                      onChange={handleUploadProduct}
                    ></input>
                  </div>
                </div>
              </label>
              <div className="flex flex-wrap gap-2">
                {newProductData?.productImage[0] ? (
                  newProductData.productImage.map((item, index) => (
                    <div
                      key={item + index}
                      className="relative cursor-pointer hover:scale-150 transition-all ease-in-out group"
                    >
                      <img
                        src={item}
                        width={100}
                        height={100}
                        className="bg-slate-100 border rounded"
                        alt={item}
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(item);
                        }}
                      />
                      <div
                        className="absolute text-red-600 p-1 text-lg bottom-0 right-0 active:scale-90 hidden group-hover:block"
                        onClick={(item) => {
                          handleOnDeleteProductImage(index);
                        }}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-red-600 text-xs">
                    *Please Upload Product Image
                  </p>
                )}
              </div>

              {/* Product image end */}

              {/* Price start */}
              <label htmlFor="price" className="font-semibold mt-3">
                Price :
              </label>
              <input
                type="number"
                id="price"
                placeholder="Enter Price"
                value={newProductData.price}
                name="price"
                required
                onChange={handleOnChange}
                className="p-2  bg-slate-100 border rounded"
              ></input>

              {/* Price end */}

              {/* Selling Price start */}
              <label htmlFor="selling" className="font-semibold mt-3">
                Selling Price :
              </label>
              <input
                type="number"
                id="selling"
                placeholder="Enter Selling Price"
                value={newProductData.selling}
                name="selling"
                required
                onChange={handleOnChange}
                className="p-2  bg-slate-100 border rounded"
              ></input>

              {/* Selling Price end */}

              {/* Description start */}
              <label htmlFor="description" className="font-semibold mt-3">
                Product Description :
              </label>
              <textarea
                rows={3}
                cols={5}
                type="Text"
                id="description"
                placeholder="Enter Product Description"
                value={newProductData.description}
                name="description"
                required
                onChange={handleOnChange}
                className="p-2 h-32 bg-slate-100 border rounded resize-none"
              ></textarea>

              {/* Description end */}

              {/* buttom start */}
              <button
                type="submit"
                className="px-3 py-2  bg-red-600 rounded-md text-white text-sm transition-all ease-in-out active:bg-red-800 active:scale-95"
              >
                Upload
              </button>
              {/* button end */}
            </form>
          </div>
          {/* Image full screen display start */}
          {openFullScreenImage && (
            <ProductImageDisplay
              onClose={() => setOpenFullScreenImage(false)}
              imgUrl={fullScreenImage}
            />
          )}

          {/* Image full screen display end */}
        </div>
      )}
    </>
  );
};

export default UploadProducts;
