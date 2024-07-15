import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBagItems, removeFromBag, addToBag, decrement, increment } from "../store/bagSlice";
import { fetchAllProduct, selectProductById } from "../store/allProductSlice";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaRupeeSign, FaShoppingCart } from "react-icons/fa";
import EmptyCart from "../helpers/EmptyCart";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
const BagItem = React.memo(() => {
  const dispatch = useDispatch();
 
  const bagItems = useSelector(selectBagItems);
  const [products, setProducts] = useState([]);
  
  const fetchAllProducts = async (criteria) => {
    try {
      const dataFetch = await fetch(SummaryApi.bag_item_search.url, {
        method: SummaryApi.bag_item_search.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(criteria),
      });
     
      const dataResponse = await dataFetch.json();

      if (dataResponse.success) {
        
        setProducts(dataResponse.data)
        
       
      }
    } catch (error) {
      
      // Handle error
    } 
  };
  
  useEffect (() => {
    fetchAllProducts(bagItems)
  },[bagItems])




  // handle on remove product
  const handleOnRemove = (event, id) => {
    event.preventDefault();
    dispatch (removeFromBag(id))
  }

  let formattedDeliveryCharge = 0;
  // bag summay calculations
  // Calculate the total price and original price based on counts
  const totalPrice = products?.reduce(
    (sum, product) => sum + (product?.price * product?.count),
    0
  );

  const OriginalPrice = products?.reduce(
    (sum, product) => sum + (product?.selling * product?.count),
    0
  );
  const discount = totalPrice - OriginalPrice ? totalPrice - OriginalPrice : 0;
  const deliveryCharge = OriginalPrice >= 500 ? 0 : products.length && 40;

 
  // Format numbers with commas
  const formattedTotalPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(totalPrice);
  const formattedOriginalPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(OriginalPrice);
  const formattedDiscount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(discount);

  if (deliveryCharge != 0) {
    formattedDeliveryCharge = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(deliveryCharge);
  }
  const payableAmount = OriginalPrice + deliveryCharge;
  const formattedpayableAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(payableAmount);
  
  const handleOnIncrement = (_id) => {
    dispatch(increment(_id));
  };

  const handleOnDecrement = (_id) => {
    dispatch(decrement(_id));
  };
 
  if (!products.length) {
    return <EmptyCart />;
  } else
    return (
      <section>
        <div className=" p-2  max-h-[calc(100vh-180px)] min-h-[calc(100vh-180px)] mx-auto md:m-4 md:rounded">
          <div className="grid sm:flex sm:gap-2  h-[calc(100vh-180px)] ">
            <section className="sm:w-[70%] bg-white sm:p-2 sm:m-2 rounded shadow-md overflow-y-scroll scroolbar-none mb-4">
              {/* product summary start */}
                <div className="m-2">
                {products.map((product, index) => (
                  <div className="flex mx-auto w-full border-[1px] rounded gap-2 mb-2 relative" key={product?._id + index}>
                    <div className=" w-[30%]">
                      {/* image section start */}
                    <div className=" p-2 m-1 flex justify-center items-center border-[1px] rounded">
                      {product?.productImage && product?.productImage[0] && (
                      <img
                        src={product.productImage[0]}
                        className="active:scale-110 transition-all ease-out"
                        alt={product.productName}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100px",
                          objectFit: "contain",
                        }}
                      />
                    )}
                    </div>
                    {/* image section end */}
                    </div>
                    <div className=" w-[70%]">
                      {/* product info section start */}
                    <div className=" p-2 m-1 border-[1px] rounded">
                      <div className="flex flex-col p-1">
                        {/* product name start */}
                        <div>
                          <span className="text-black text-md capitalize cursor-pointer">
                            {product?.productName}
                          </span>
                        </div>
                        {/* product name end */}

                        {/* brand name start*/}
                        <div>
                          <span className="text-gray-600 text-sm uppercase font-semibold">
                            {product?.brandName}
                          </span>
                        </div>
                        {/* brand name end */}

                        {/* price start */}
                        <div className="flex gap-2 justify-start items-center">
                          <div className=" text-gray-600 line-through text-sm">
                            <span className="flex justify-center items-center">
                              <FaRupeeSign />
                              {product?.price}
                            </span>
                          </div>
                          <div className="flex justify-center items-center text-lg">
                            <span className="text-sm">
                              <FaRupeeSign />
                            </span>
                            {product?.selling}
                          </div>
                          <div className="flex justify-center items-center text-sm text-green-600">
                            (
                            {(
                              ((product?.price - product?.selling) /
                                product?.price) *
                              100
                            ).toFixed(0)}
                            % Off)
                          </div>
                        </div>
                        {/* price end */}

                        {/* count of items start */}
                          <div className="border-[1px] border-black p-1 font-semibold w-[15%] flex justify-center items-center gap-2">
                          <button onClick={() => handleOnIncrement(product._id)} className="text-black bg-orange-400 rounded-full hover:bg-orange-600 active:scale-95"><IoIosAddCircleOutline />
                          </button>
                          {product.count}
                          <button onClick={() => handleOnDecrement(product._id)}  className="text-black bg-orange-400 rounded-full  hover:bg-orange-600 active:scale-95"><GrSubtractCircle /></button>
                          </div>
                          
                        {/* count of items end */}
                      </div>
                    </div>
                    {/* product info section end */}
                    
                    </div>

                     {/* product remove button start*/}
                  <div className="absolute right-0 bottom-0 p-6 rounded-full text-2xl text-red-500
                  hover:text-red-600 cursor-pointer active:scale-90 transition-all ease-in-out"
                    onClick={(event) => handleOnRemove(event,product._id)}>
                    <MdDelete />
                  </div>
                  {/* product remove button end */}
                  </div>
                ))}
                </div>
                
                {/* product summary end */}
            </section>

            <section className="sm:w-[30%] mb-4">
              {/* bag summary start */}
              <div className="grid m-1 p-1 bg-white  sm:p-2 sm:m-2 rounded shadow-md">
                <h3 className="uppercase p-2 font-bold text-gray-500">
                  Price Details
                </h3>
                <hr />
                <div className="flex flex-col p-2 gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-semibold">
                      Price ({bagItems?.length} items)
                    </span>
                    <span className="text-gray-500 font-semibold ">
                      {formattedTotalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-semibold">
                      Discount
                    </span>
                    <span className="text-green-500 font-semibold ">
                      {"-"}
                      {formattedDiscount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-semibold">
                      Delivery Charges
                    </span>
                    {deliveryCharge == "FREE" ? (
                      <span className="text-green-500  font-semibold">
                        {deliveryCharge}
                      </span>
                    ) : (
                      <span className="text-gray-500  font-semibold">
                        {formattedDeliveryCharge}
                      </span>
                    )}
                  </div>
                </div>
                <hr className="border-dashed  border-slate-400" />
                <div className="grid grid-cols-2">
                  <h3 className="capitalize p-2 mt-2 mb-2 text-lg font-bold text-gray-800">
                    Total Amount
                  </h3>
                  <span className="capitalize flex justify-end items-center p-2 mt-2 mb-2 text-lg font-bold text-gray-800 ">
                    {formattedpayableAmount}
                  </span>
                </div>
                <hr className="border-dashed  border-slate-400" />
                <h3 className="capitalize p-2 mt-2 mb-2 text-md font-bold text-green-600">
                  You Will Save {formattedDiscount} on this order
                </h3>
              </div>
              {/* bag summary end */}

              {/* Place order -start */}
              <div className="flex justify-center items-center p-4 mt-2 mx-1 text-white font-semibold bg-orange-500 rounded select-none cursor-pointer hover:bg-orange-600 active:scale-95 transition-none ease-in-out">
                <button>PLACE ORDER</button>
              </div>
              {/* place order end */}
            </section>
          </div>
        </div>
      </section>
    );
});

export default BagItem;
