import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/home/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import StarRating from "../helpers/StarRating";
import LoadingSpinner from "..//helpers/loadingSpinner";
import { createSelector } from "reselect";
import { addToBag, removeFromBag, selectBagItems } from "../store/bagSlice";
const ItemDetailsPage = React.memo(() => {
  const allProducts = useSelector((state) => state.productData.products);
  const fetchStatus = useSelector((state) => state.productData.fetchStatus);
  const userDetails = useSelector((state) => state.user.user);
  
  const params = useParams();
  const dispatch = useDispatch();

  const item = allProducts.filter((item) => item?._id === params?.itemId);

  const selectElementFound = createSelector([selectBagItems], (bagItems) =>
    bagItems.includes(item[0]._id)
  );
  const elementFound = useSelector(selectElementFound);

  const [currentImage, setCurrentImage] = useState("");
  const [displayFull, setDisplayFull] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (item && !currentImage) {
      setCurrentImage(item[0]?.productImage[0]);
    }
  }, [item, currentImage]);

  const handleMouseEnter = () => {
    setTimeout(() => setDisplayFull(true), 150); // Adding a delay of 150ms
  };

  const handleMouseLeave = () => {
    setDisplayFull(false);
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddToBag = (event) => {
    event.preventDefault();
    dispatch(addToBag(item[0]._id));
  };

  const handleRemove = (event) => {
    event.preventDefault();
    dispatch(removeFromBag(item[0]._id));
  };

  const handleOnBuyNow = () => {
    dispatch(addToBag(item[0]._id));
  };

  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <div className="container mx-auto p-4 bg-white">
        {fetchStatus ? (
          <LoadingSpinner />
        ) : item.length === 0 ? (
          <p className="text-center w-full">No products available.</p>
        ) : (
          <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
            {/* product Image */}
            <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
              <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 mx-auto justify-center items-center flex ">
                <img
                  src={currentImage}
                  key={currentImage}
                  alt="current product"
                  className="h-full w-full  object-scale-down mix-blend-multiply cursor-pointer"
                  onClick={handleMouseEnter}
                />
              </div>

              <div className="h-full">
                {!currentImage ? (
                  <div className="flex gap-2 lg:flex-col overflow-scroll  border scroolbar-none h-full">
                    {item[0]?.productImage.map((image, index) => (
                      <div
                        key={image}
                        className="h-20 w-20 bg-slate-200 rounded  p-1
                      hover:border-2 hover:border-blue-600 transition-all ease-in-out  hover:scale-90 cursor-pointer"
                        onMouseEnter={() => setCurrentImage(image)}
                      >
                        <img
                          src={image}
                          className="h-full w-full object-scale-down mix-blend-multiply"
                          alt={image}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2 lg:flex-col overflow-scroll  border scroolbar-none h-full">
                    {item[0]?.productImage.map((image, index) => (
                      <div
                        key={image}
                        className="h-20 w-20 bg-slate-200 rounded  p-1
                      hover:border-2 hover:border-blue-600 transition-all ease-in-out  hover:scale-90 cursor-pointer"
                        onMouseEnter={() => setCurrentImage(image)}
                      >
                        <img
                          src={image}
                          className="h-full w-full object-scale-down mix-blend-multiply"
                          alt={image}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* product details */}
            <div className="max-h-[calc(100vh-120px)] overflow-scroll scroolbar-none w-full flex flex-col gap-2 p-2 m-2 mx-auto">
              {/* brand name start */}
              <div className="uppercase font-bold mt-2 text-3xl text-gray-700">
                <span className="truncate">{item[0]?.brandName}</span>
              </div>
              {/* brand name end */}
              {/* product name start */}
              <div className="capitalize mt-2 text-xl text-gray-800">
                <span className="truncate">{item[0]?.productName}</span>
              </div>
              {/* product name end */}
              {/* ratings start */}
              <div className="uppercase font-bold mt-2 text-3xl text-gray-700">
                <span className="text-green-600">
                  <StarRating />
                </span>
              </div>
              {/* ratings end */}
              {/* price start */}
              <div className="flex  place-items-start mt-2 items-center gap-4">
                <span className="text-3xl font-bold flex justify-center items-center">
                  <span className="text-2xl">
                    <FaRupeeSign />
                  </span>{" "}
                  {item[0]?.selling}
                </span>
                <span className="text-2xl line-through text-gray-600 flex justify-center items-center">
                  <FaRupeeSign />
                  {item[0]?.price}
                </span>
                <span className="text-xl text-green-600">
                  (
                  {(
                    ((item[0]?.price - item[0]?.selling) / item[0]?.price) *
                    100
                  ).toFixed(0)}
                  % Off)
                </span>
              </div>
              {/* price end */}
              {/* buttons start */}
              <div className="flex lg:max-w-[80%]">
                <div className="grid grid-cols-2 w-full gap-2 pr-2">
                  {!elementFound ? (
                    <button
                      className="flex-1 bg-yellow-500 h-14 text-white hover:bg-yellow-600 active:scale-95 transition-all ease-in-out rounded p-2 m-2 font-bold w-full pr-2"
                      onClick={handleAddToBag}
                    >
                      <span className="flex justify-center gap-2 items-center">
                        <FaShoppingCart /> ADD TO CART
                      </span>
                    </button>
                  ) : (
                    <button
                      className="flex-1 bg-orange-500 h-14 text-white hover:bg-orange-600 active:scale-95 transition-all ease-in-out rounded p-2 m-2 font-bold w-full"
                      onClick={handleRemove}
                    >
                      <span className="flex justify-center gap-2 items-center">
                        <FaShoppingCart /> REMOVE
                      </span>
                    </button>
                  )}

                  {(userDetails?._id) ? (<Link to={"/bag-summary"} className="pr-2" >
                    <button
                      className="flex-1 bg-red-500 h-14 text-white hover:bg-red-600 active:scale-95 transition-all ease-in-out rounded p-2 m-2 font-bold w-full"
                      onClick={handleOnBuyNow}
                    >
                      <span className="flex justify-center gap-2 items-center">
                        <AiFillThunderbolt /> BUY NOW
                      </span>
                    </button>
                  </Link>) : (<Link to={"/login"} className="pr-2" >
                    <button
                      className="flex-1 bg-red-500 h-14 text-white hover:bg-red-600 active:scale-95 transition-all ease-in-out rounded p-2 m-2 font-bold w-full"
                      onClick={handleOnBuyNow}
                    >
                      <span className="flex justify-center gap-2 items-center">
                        <AiFillThunderbolt /> BUY NOW
                      </span>
                    </button>
                  </Link>)}
                  
                </div>
              </div>
              {/* buttons end */}

              {/* description start */}
              <div className="flex flex-col mt-2 gap-2 justify-start items-left ">
                <h3 className="text-lg font-semibold text-gray-600">
                  Description:{" "}
                </h3>
                <p
                  className={`text-justify ${
                    isExpanded ? "max-h-full" : "max-h-20 overflow-hidden"
                  } transition-all duration-300`}
                >
                  {item[0]?.description}
                </p>

                <button
                  onClick={toggleDescription}
                  className="text-blue-500 no-underline ml-2 flex items-left font-semibold"
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </button>
              </div>
              {/* description end */}
            </div>
          </div>
        )}
      </div>

      {displayFull && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 transition-all ease-in-out"
          onClick={() => setDisplayFull(false)}
          onMouseLeave={handleMouseLeave}
          key={currentImage}
        >
          <img
            src={currentImage}
            className="h-full w-full object-contain"
            alt="full screen product"
          />
        </div>
      )}
    </>
  );
});

export default ItemDetailsPage;
