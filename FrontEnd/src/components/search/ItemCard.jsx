import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addToBag, removeFromBag, selectBagItems } from '../../store/bagSlice';
import LoadingSpinner from '../../helpers/loadingSpinner';
import { createSelector } from 'reselect';

const ItemCard = React.memo(({ item }) => {

  const selectElementFound = createSelector(
    [selectBagItems],
    (bagItems) => bagItems.includes(item._id)
  );
  
  const elementFound = useSelector(selectElementFound);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [item]);

  const handleAddToBag = () => {
    dispatch(addToBag(item._id));
  };

  const handleRemove = () => {
    dispatch(removeFromBag(item._id));
    
  };
  if (isLoading) {
    return (
      <div
        className="card flex flex-col justify-center bg-white items-center m-2 p-2 h-60 w-28 rounded relative group"
        style={{ width: '18rem' }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className="card flex flex-col justify-center bg-white items-center m-2 p-2 rounded relative group cursor-pointer"
      style={{ width: '18rem' }}
    >
      <img
        src={item.productImage[0]}
        className="card-img-top active:scale-110 transition-all ease-out"
        alt={item.productName}
        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
      />
      <div className="absolute w-full  group-hover:block bottom-0">
        <div className="flex justify-between gap-5">
          <button
            className="bg-yellow-400 h-10 w-full p-2 text-white hover:bg-yellow-600 active:scale-95 transition-all ease-in-out rounded"
          >
            WISHLIST
          </button>
          {!elementFound ? (
            <button
              className="bg-orange-400 h-10 w-full p-2 text-white hover:bg-orange-600 active:scale-95 transition-all ease-in-out rounded"
              onClick={handleAddToBag}
            >
              ADD TO CART
            </button>
          ) : (
            <button
              className="bg-red-400 h-10 w-full p-2 text-white hover:bg-red-600 active:scale-95 transition-all ease-in-out rounded"
              onClick={handleRemove}
            >
              REMOVE
            </button>
          )}
        </div>
      </div>
      <div className="card-body w-full mt-2 mb-10">
        <div className="flex justify-between font-bold text-sm">
          <span className="truncate">{item?.brandName}</span>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span className="truncate">{item?.productName}</span>
        </div>
        <div className="flex justify-between mt-2 items-center">
          <span className="text-sm font-bold">Rs. {item?.selling}</span>
          <span className="text-xs line-through text-gray-600">Rs. {item?.price}</span>
          <span className="text-[12px] text-red-600">
            ({(((item?.price - item?.selling) / item?.price) * 100).toFixed(2)}% OFF)
          </span>
        </div>
      </div>
    </div>
  );
});

export default ItemCard;
