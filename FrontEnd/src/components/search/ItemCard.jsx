import React, { useEffect, useState } from 'react';
import Wishlist from '../user/Wishlist';
import AddToCart from '../user/AddToCart';
import LoadingSpinner from '../../helpers/loadingSpinner';

const ItemCard = ({ item }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 1-second loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [item]);

  if (isLoading) {
    return (
      <div
        className="card flex flex-col justify-center bg-white items-center m-2 p-2 h-60 w-28  rounded relative group "
        style={{ width: '18rem' }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className="card flex flex-col justify-center bg-white 
      items-center m-2 p-2 rounded relative group cursor-pointer"
      style={{ width: '18rem' }}
    >
      <img
        src={item.productImage[0]}
        className="card-img-top active:scale-110 transition-all ease-out"
        alt={item.productName}
        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
      />
      <div className="absolute w-full hidden group-hover:block bottom-0">
        <div className="flex justify-between gap-5">
          <button
            className="bg-yellow-400 h-10 w-full p-2 text-white hover:bg-yellow-600 active:scale-95 transition-all ease-in-out rounded"
          >
            WISHLIST
          </button>
          <button
            className="bg-orange-400 h-10 w-full p-2 text-white hover:bg-orange-600 active:scale-95 transition-all ease-in-out rounded"
          >
            ADD TO CART
          </button>
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
          <span className="text-xs line-through text-gray-600">
            Rs. {item?.price}
          </span>
          <span className="text-[12px] text-red-600">
            ({(((item?.price - item?.selling) / item?.price) * 100).toFixed(2)}%
            OFF)
          </span>
        </div>
      </div>

      <Wishlist item={item} />
      <AddToCart itemDelete={item} />
    </div>
  );
};

export default ItemCard;
