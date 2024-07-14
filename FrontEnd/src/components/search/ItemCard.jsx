import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBag, removeFromBag, selectBagItems } from "../../store/bagSlice";
import LoadingSpinner from "../../helpers/loadingSpinner";
import { createSelector } from "reselect";
import { Link, useNavigate } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
  selectWishlistItems,
} from "../../store/wishListSlice";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";

const ItemCard = React.memo(({ item }) => {
  const selectElementFound = createSelector([selectBagItems], (bagItems) =>
    bagItems.includes(item._id)
  );

  const elementFound = useSelector(selectElementFound);

  // item check in wishlist
  const selectElementFoundWishlist = createSelector(
    [selectWishlistItems],
    (wishlistItems) => wishlistItems.includes(item?._id) 
  );

  const elementFoundWishlist = useSelector(selectElementFoundWishlist);

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [item]);

  const handleAddToBag = (event) => {
    event.preventDefault();
    dispatch(addToBag(item._id));
  };

  const handleRemove = (event) => {
    event.preventDefault();
    dispatch(removeFromBag(item._id));
  };

  const handleOnWishlistAdd = (event) => {
    event.preventDefault();
    dispatch(removeFromBag(item._id));
    dispatch(addToWishlist(item._id));
  };

  const handleOnWishlistRemove = (event) => {
    event.preventDefault();
    dispatch(removeFromWishlist(item._id));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-2 m-2 animate-pulse">
        <div
          className="flex flex-col lg:flex-row-reverse min-h-72 max-h-72 min-w-64 
      max-w-64 bg-slate-100 shadow-md"
        >
          <div className="flex flex-col w-full">
            {/* image section start */}
            <div
              className="flex-1  w-full p-2 bg-white flex justify-center items-center "
              style={{ flex: "0 0 60%" }}
            >
              <img
                src={"../src/assets/image-loading.gif"}
                className="active:scale-110 transition-all ease-out"
                alt={item.productName}
                style={{
                  maxWidth: "100%",
                  maxHeight: "150px",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* image section end */}

            {/* product description start */}
            <div
              className="flex-1  w-full p-2 bg-slate-100"
              style={{ flex: "0 0 40%" }}
            ></div>
            {/* product description end */}
          </div>
        </div>
        {/* <LoadingSpinner /> */}
      </div>
    );
  } else
    return (
      <div className="container mx-auto p-2 m-2">
        <div
          className="flex flex-col lg:flex-row-reverse min-h-72 max-h-72 min-w-64 
      max-w-64 bg-slate-100 shadow-md"
        >
          <div className="flex flex-col w-full">
            {/* image section start */}
            <div
              className="flex-1  w-full p-2 bg-white flex justify-center items-center "
              style={{ flex: "0 0 60%" }}
            >
              <img
                src={item.productImage[0]}
                className="active:scale-110 transition-all ease-out"
                alt={item.productName}
                style={{
                  maxWidth: "100%",
                  maxHeight: "150px",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* image section end */}

            {/* product description start */}
            <div
              className="flex-1  w-full p-2 bg-slate-100"
              style={{ flex: "0 0 20%" }}
            >
              <div className="flex justify-between font-bold text-sm">
                <span className="truncate">{item?.brandName}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span className="truncate">{item?.productName}</span>
              </div>

              <div className="flex justify-left gap-2 mt-1 items-center">
                <span className="text-sm font-bold">Rs. {item?.selling}</span>
                <span className="text-xs line-through text-gray-600">
                  Rs. {item?.price}
                </span>
                <span className="text-[12px] text-red-600">
                  (
                  {(
                    ((item?.price - item?.selling) / item?.price) *
                    100
                  ).toFixed(2)}
                  % OFF)
                </span>
              </div>
            </div>
            {/* product description end */}

            {/* button section start */}
            <div
              className="flex-1  w-full p-2 bg-slate-100"
              style={{ flex: "0 0 20%" }}
            >
              <div className="container mx-auto">
                <div className="grid grid-cols-2 gap-5 justify-between">
                  {!elementFoundWishlist ? (
                    <button
                      className="bg-yellow-400 p-2 text-white text-sm hover:bg-yellow-600 active:scale-95 transition-all ease-in-out rounded"
                      onClick={handleOnWishlistAdd}
                    >
                      <span className="flex justify-center items-center gap-1">
                        WISHLIST
                        <span>
                          <IoIosHeartEmpty />
                        </span>
                      </span>
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-400 p-2 text-white text-sm hover:bg-yellow-600 active:scale-95 transition-all ease-in-out rounded"
                      onClick={handleOnWishlistRemove}
                    >
                      <span className="flex justify-center items-center gap-1">
                        WISHLIST
                        <span className="text-red-600">
                          <IoMdHeart />
                        </span>
                      </span>
                    </button>
                  )}

                  {!elementFound ? (
                    <button
                      className="bg-orange-400 p-2 text-white text-sm hover:bg-orange-600 active:scale-95 transition-all ease-in-out rounded"
                      onClick={handleAddToBag}
                    >
                      ADD TO CART
                    </button>
                  ) : (
                    <button
                      className="bg-red-400 p-2 text-white text-sm hover:bg-red-600 active:scale-95 transition-all ease-in-out rounded"
                      onClick={handleRemove}
                    >
                      REMOVE
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* button section end */}
          </div>
        </div>
      </div>
    );
});

export default ItemCard;
