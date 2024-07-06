import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { loadingActions } from "../../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../helpers/loadingSpinner";
import uploadImage from "../../helpers/uploadImage";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import { addNewCatagory } from "../../store/allCatagorySlice";

const UploadProductCatagory = ({ onCloseCatagory }) => {
  const loadingStatus = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  //initialize state for the data to enter
  const [newProductCatagory, setNewProductCatagory] = useState({
    catagoryName: "",
    catagoryType: "",
    catagoryImage: [],
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setNewProductCatagory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUploadProductCatagory = async (event) => {
    const file = event.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setNewProductCatagory((prev) => ({
      ...prev,
      catagoryImage: [...prev.catagoryImage, uploadImageCloudinary.url],
    }));
  };

  // function to delete product image -start
  const handleOnDeleteProductImage = async (index) => {
    const newCatagoryImage = [...newProductCatagory.catagoryImage];
    newCatagoryImage.splice(index, 1);

    setNewProductCatagory((prev) => ({
      ...prev,
      catagoryImage: [...newCatagoryImage],
    }));
  };

  // function to delete product image - end

  // Function to handle product form submit - start

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(loadingActions.setLoading(true));

      const dataResponse = await fetch(SummaryApi.upload_product_catagory.url, {
        method: SummaryApi.upload_product_catagory.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newProductCatagory),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(addNewCatagory(dataApi.data));
        toast.success(dataApi.message);
        onCloseCatagory(true);
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (err) {
      console.error("Error Uploading Catagory...", err);
      toast.error("Error Uploading Catagory...");
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
              <h2 className="font-semibold text-xl">Upload Catagory</h2>
              <div
                className="bg-red-600 p-1 rounded-full  text-white text-2xl w-fit ml-auto hover:scale-110 transition-all ease-in-out active:bg-red-800 active:scale-90 cursor-pointer"
                onClick={onCloseCatagory}
              >
                <IoClose />
              </div>
            </div>

            <form
              className="grid p-2 gap-2 overflow-y-scroll h-[80%]"
              onSubmit={handleOnSubmit}
            >
              {/* Catagory name start */}
              <label htmlFor="catagoryName" className="font-semibold">
                Catagory Name :
              </label>
              <input
                type="text"
                id="catagoryName"
                placeholder="Enter Catagory Name"
                value={newProductCatagory.catagoryName}
                name="catagoryName"
                onChange={handleOnChange}
                required
                className="p-2  bg-slate-100 border rounded"
              ></input>
              {/* catagory name end */}

              {/* catagory Type start */}
              <label htmlFor="catagoryType" className="font-semibold mt-3">
                Catagory Type :
              </label>
              <input
                type="text"
                id="catagoryType"
                placeholder="Enter Catagory Type"
                value={newProductCatagory.catagoryType}
                name="catagoryType"
                required
                onChange={handleOnChange}
                className="p-2  bg-slate-100 border rounded"
              ></input>
              {/* catagory type end */}

              {/* catagory image start */}
              <label htmlFor="catagoryImage" className="font-semibold mt-3">
                Catagory Image :
              </label>
              <label htmlFor="uploadImageInput">
                <div className="p-2 bg-slate-100 border  rounded h-36 w-full flex justify-center items-center cursor-pointer">
                  <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                    <span className="text-4xl">
                      {" "}
                      <FaFileUpload />
                    </span>
                    <p className="text-md">Upload Catagory Images</p>
                    <input
                      type="file"
                      id="uploadImageInput"
                      required
                      className="hidden"
                      onChange={handleUploadProductCatagory}
                    ></input>
                  </div>
                </div>
              </label>
              <div className="flex flex-wrap gap-2">
                {newProductCatagory?.catagoryImage[0] ? (
                  newProductCatagory.catagoryImage.map((item, index) => (
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
                    *Please Upload Catagory Image
                  </p>
                )}
              </div>

              {/* catagory image end */}

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

export default UploadProductCatagory;
