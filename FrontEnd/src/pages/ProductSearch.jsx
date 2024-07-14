import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/allProductSlice";
import SummaryApi from "../common";
import ItemCard from "../components/search/ItemCard";
import LoadingSpinner from "../helpers/loadingSpinner";
import { BsFilterCircle, BsFilterCircleFill } from "react-icons/bs";
import classNames from "classnames";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { setSearchProduct } from "../store/allSearchSlice";
const ProductSearch = () => {

  const location = useLocation(); // Access location object
  const searchParams = new URLSearchParams(location.search); // Access query parameters
  const [paramProductName, setParamProductName] = useState("");
  const [paramCatagory, setParamCatagory] = useState("");

  useEffect(() => {
    // Update state variables with query parameters
    setParamCatagory(searchParams.has('catagory') ? searchParams.get('catagory') : '');
    setParamProductName(searchParams.has('productName') ? searchParams.get('productName') : '');
  }, [searchParams]);

  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productData.products);
  const fetchStatus = useSelector((state) => state.productData.fetchStatus);
  const categories = useSelector((state) => state.catagoryData.catagory);
  const allSearchProduct = useSelector((state) => state.searchData.search);
  
  const [searchCriteria, setSearchCriteria] = useState({
    productName: paramProductName,
    brandName: "",
    catagory: paramCatagory,
    price: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const ProductCatagory = categories
    .map((obj) => obj.catagoryName)
    .filter((value, index, self) => self.indexOf(value) === index);

  const [isFetching, setIsFetching] = useState(true);
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const fetchAllProducts = async (criteria) => {
    try {
      const dataFetch = await fetch(SummaryApi.search_products.url, {
        method: SummaryApi.search_products.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(criteria),
      });

      const dataResponse = await dataFetch.json();

      if (dataResponse.success) {
        // dispatch(setProducts(dataResponse.data || []));
        dispatch(setSearchProduct(dataResponse.data || []));
      }
    } catch (error) {
      // Handle error
    } finally {
      setIsFetching(false);
    }
  };
  
  const handleOnSubmit = async (event) => {

    event.preventDefault();
    setIsFetching(true);
    await fetchAllProducts(searchCriteria);
    setIsFetching(false);
  };

  const handleClearAll = () => {
    setSearchCriteria({
      productName: "",
      brandName: "",
      catagory: "",
      price: "",
      
    });
  };
  
  useEffect(() => {
  
    if (paramProductName !== null) {
      setSearchCriteria((prevCriteria) => ({
        ...prevCriteria,
        productName: paramProductName,
      }));
      
      setIsFetching(true);
      fetchAllProducts({ productName: paramProductName });
      
    } else {
      setIsFetching(true);
      fetchAllProducts({});
      setIsFetching(false);
    }
  
  }, [paramProductName]);

  useEffect(() => {
    if (paramCatagory !== null) {
      setSearchCriteria((prevCriteria) => ({
        ...prevCriteria,
        catagory: paramCatagory,
      }));
      setIsFetching(true);
      fetchAllProducts({ catagory: paramCatagory });
      setIsFetching(false);
    } else {
      setIsFetching(true);
      fetchAllProducts({});
      setIsFetching(false);
    }
  }, [paramCatagory]);

  useEffect(() => {
    if (fetchStatus) {
      fetchAllProducts({});
    }
  }, [fetchStatus]);

  return (
    <div>
      <nav>
        <Navbar />
      </nav>

      <div className="container mx-auto p-4">
        {/* filter head section - start */}
        <div className="flex justify-between p-4 border rounded-t bg-white shadow-md ">
          <div
            onClick={() => setIsAsideOpen(!isAsideOpen)}
            className="flex justify-center items-center gap-2 bg-blue-400 p-1 rounde cursor-pointer rounded hover:bg-blue-500 
            active:scale-95 transition ease-in-out"
          >
            <span className="text-white font-semibold">FILTER</span>
            {isAsideOpen ? (
              <span className="text-xl text-white">
                <BsFilterCircleFill />
              </span>
            ) : (
              <span className="text-xl text-white">
                <BsFilterCircle />
              </span>
            )}
          </div>
          <button
            className="text-xs text-blue-600 font-semibold active:scale-95 transition-all"
            onClick={handleClearAll}
          >
            CLEAR ALL
          </button>
        </div>
          {/* filter head section - end */}
        <div className="min-h-[600px] flex flex-col lg:flex-row gap-4 bg-white shadow-md">
          {/* search section start */}
          {isAsideOpen && (
            <div className="h-96  mx-auto flex flex-col lg:flex-row-reverse gap-4 z-50 absolute">
              <form
                className="flex flex-col border p-4 gap-2 container overflow-scroll scroolbar-none rounded-b bg-white shadow-md"
                onSubmit={handleOnSubmit}
              >
                {/* product name start */}
                <label htmlFor="productName" className="font-semibold pr-2">
                  Product Name :
                </label>
                <input
                  type="text"
                  id="productName"
                  placeholder="Enter Product Name"
                  value={searchCriteria.productName}
                  name="productName"
                  onChange={handleOnChange}
                  className="p-2 bg-slate-100 border rounded"
                />
                {/* product name end */}

                {/* brand name start */}
                <label htmlFor="brandName" className="font-semibold mt-3">
                  Brand Name :
                </label>
                <input
                  type="text"
                  id="brandName"
                  placeholder="Enter Brand Name"
                  value={searchCriteria.brandName}
                  name="brandName"
                  onChange={handleOnChange}
                  className="p-2 bg-slate-100 border rounded"
                />
                {/* brand name end */}

                {/* catagory start */}
                <label htmlFor="catagory" className="font-semibold mt-3">
                  Category :
                </label>
                <select
                  value={searchCriteria.catagory}
                  name="catagory"
                  onChange={handleOnChange}
                  className="p-2 bg-slate-100 border rounded scroolbar-none"
                >
                  <option value={""}>--Select Category--</option>
                  {ProductCatagory.map((item, index) => (
                    <option value={item} key={item + index}>
                      {item}
                    </option>
                  ))}
                </select>
                {/* catagory end */}

                {/* price start */}

                <label htmlFor="price" className="font-semibold mt-3">
                  Price :
                </label>
                <input
                  type="number"
                  id="price"
                  placeholder="Enter Price"
                  value={searchCriteria.price}
                  name="price"
                  onChange={handleOnChange}
                  className="p-2 bg-slate-100 border rounded"
                />
                {/* price end */}

                {/* submit start */}
                <button
                  type="submit"
                  className="p-2 mt-4 bg-red-600 rounded-md text-white text-sm transition-all ease-in-out active:bg-red-800 active:scale-95"
                >
                  Search
                </button>
                {/* submit end */}
              </form>
            </div>
          )}
          {/* search section ends */}

          {/* display section start */}
          <div className="container mx-auto p-4">
          <div className="flex flex-col lg:flex-row-reverse lg:flex-wrap justify-center items-center">
            {isFetching ? (
              <div className=""><LoadingSpinner size={10} position={"absolute"} bottom={"bottom-28"} top={"top-60"} /></div>
            ) : allSearchProduct.length === 0 ? (
              <p className="text-center w-full">No products available.</p>
            ) : (
              allSearchProduct.map((item) => (
                <Link to={"/product-details/" + item?._id} key={item?._id}>
                  <ItemCard item={item} />
                </Link>
              ))
            )}
          </div>
          </div>
          {/* display section ends */}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
