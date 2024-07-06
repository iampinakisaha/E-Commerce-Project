import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllProduct, setProducts } from "../store/allProductSlice";
import SummaryApi from "../common";
import ItemCard from "../components/search/ItemCard";
import LoadingSpinner from "../helpers/loadingSpinner";
import { BsFilterCircle, BsFilterCircleFill } from "react-icons/bs";
import classNames from 'classnames';

const ProductSearch = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productData.products);
  const fetchStatus = useSelector((state) => state.productData.fetchStatus);
  const categories = useSelector((state) => state.catagoryData.catagory);

  const [searchCriteria, setSearchCriteria] = useState({
    productName: "",
    brandName: "",
    catagory: "",
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
        dispatch(setProducts(dataResponse.data || []));
      } else {
        // toast.error(dataResponse.message || "Failed to fetch Products");
      }
    } catch (error) {
      // toast.error("Failed to fetch Products");
    } finally {
      setIsFetching(false);
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    await fetchAllProducts(searchCriteria);
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
    fetchAllProducts({});
  }, []);

  useEffect(() => {
    if (fetchStatus) {
      fetchAllProducts({});
      dispatch(fetchAllProduct(false));
    }
  }, [fetchStatus, dispatch]);

  return (
    <div>
      <nav>
        <Navbar />
      </nav>

      <div className="flex flex-col md:flex-row gap-2 pb-2 pl-2 min-h-[calc(100vh-180px)] ">
        <div
          className="md:hidden block px-4 py-2 bg-white text-black rounded mb-2 customShadow "
          onClick={() => setIsAsideOpen(!isAsideOpen)}
        >
          {isAsideOpen ? <BsFilterCircleFill /> : <BsFilterCircle />}
        </div>

        <aside 
          className={classNames(
            "bg-white min-h-full w-full md:w-1/4 customShadow my-0.5 ",
            {
              "block": isAsideOpen || window.innerWidth >= 768,
              "hidden": !isAsideOpen && window.innerWidth < 768,
              
            }
          )}
        >
          <div className="flex justify-between p-2">
            <h2 className="text-xl text-gray-800 font-semibold p-2">Filters</h2>
            <button
              className="text-xs text-blue-600 font-semibold active:scale-95 transition-all"
              onClick={() => handleClearAll({})}
            >
              CLEAR ALL
            </button>
          </div>
          <hr />

          <div>
            <nav className="grid p-4 ">
              <form
                className="grid p-2 gap-2 overflow-y-scroll h-[80%] scroolbar-none"
                onSubmit={handleOnSubmit}
              >
                <label htmlFor="productName" className="font-semibold">
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

                <label htmlFor="catagory" className="font-semibold mt-3">
                  Catagory :
                </label>
                <select
                  value={searchCriteria.catagory}
                  name="catagory"
                  onChange={handleOnChange}
                  className="p-2 bg-slate-100 border rounded"
                >
                  <option value={""}>--Select Catagory--</option>
                  {ProductCatagory.map((item, index) => (
                    <option value={item} key={item + index}>
                      {item}
                    </option>
                  ))}
                </select>

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

                <button
                  type="submit"
                  className="px-3 py-2 bg-red-600 rounded-md text-white text-sm transition-all ease-in-out active:bg-red-800 active:scale-95"
                >
                  Search
                </button>
              </form>
            </nav>
          </div>
        </aside>

        <main className="flex-1 ">
          <div className="flex justify-center flex-wrap gap-2 py-4 h-[calc(100vh-90px)] overflow-y-scroll bg-slate-50 scroolbar-none">
            {isFetching ? (
              <LoadingSpinner />
            ) : allProducts.length === 0 ? (
              <p className="text-center w-full">No products available.</p>
            ) : (
              allProducts.map((item, index) => (
                <ItemCard key={`${item._id}-${index}`} item={item} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductSearch;
