import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBagItems, removeFromBag } from "../store/bagSlice";
import { selectProductById } from "../store/allProductSlice";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaRupeeSign, FaShoppingCart } from "react-icons/fa";
import EmptyCart from "../helpers/EmptyCart";
import { MdDelete } from "react-icons/md";
const BagItem = React.memo(() => {
  // Fetch bag items from Redux store
  const bagItems = useSelector(selectBagItems);
  const dispatch = useDispatch();
  // Fetch product details for each bag item
  const products = useSelector((state) =>
    bagItems.map((itemId) => selectProductById(state, itemId))
  );

  // handle on remove product
  const handleOnRemove = (event, id) => {
    event.preventDefault();
    dispatch (removeFromBag(id))
  }

  let formattedDeliveryCharge = 0;
  // bag summay calculations
  // Calculate the total price of items in the bag
  const totalPrice = products?.reduce(
    (sum, product) => sum + product?.price,
    0
  );
  const OriginalPrice = products?.reduce(
    (sum, product) => sum + product?.selling,
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
  

  if (!products.length) {
    return <EmptyCart />;
  } else
    return (
      <section>
        <div className=" p-2  max-h-[calc(100vh-180px)] min-h-[calc(100vh-180px)] mx-auto md:m-4 md:rounded">
          <div className="grid sm:flex sm:gap-2  h-[calc(100vh-180px)] ">
            <section className="sm:w-[70%] overflow-y-scroll scroolbar-none mb-4">
              {/* product summary start */}
              {products.map((product) => (
                <div className="relative" key={product._id}>
                  <div className="grid grid-rows-[30%_70%] m-1 p-1 bg-white  sm:p-2 sm:m-2 rounded shadow-md ">
                    {/* image section start */}
                    <div className=" p-1 m-1 flex justify-center items-center border-[1px]">
                      <img
                        src={product.productImage[0]} // Assuming productImage is an array
                        className="active:scale-110 transition-all ease-out "
                        alt={product.productImage[0]}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    {/* image section end */}

                    {/* product info section start */}
                    <div className=" p-1 m-1 border-[1px] ">
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
                      </div>
                    </div>
                    {/* product info section end */}
                  </div>

                  {/* product remove button start*/}
                  <div className="right-0 top-0 p-6 rounded-full text-2xl text-red-500 absolute hover:text-red-600 cursor-pointer active:scale-90 transition-all ease-in-out"
                    onClick={(event) => handleOnRemove(event,product._id)}>
                    <MdDelete />
                  </div>
                  {/* product remove button end */}
                </div>
              ))}
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
                      Price ({products?.length} items)
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
