import React, { useEffect, useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import UploadProducts from "../components/UploadProducts";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { loadingActions } from "../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../helpers/loadingSpinner";
import ProductCard from "../components/ProductCard";
import { setProducts, fetchAllProduct } from "../store/allProductSlice";
import { fetchAllCatagory } from "../store/allCatagorySlice";


const AllProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productData.products);
  const allCatagory = useSelector((state) => state.catagoryData.catagory);
  const fetchStatus = useSelector((state) => state.productData.fetchStatus);
  const catagoryFetchStatus = useSelector((state) => state.catagoryData.fetchStatus);
  const loadingStatus = useSelector((state) => state.loading);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [catagorySelected, setCatagorySelected] = useState("--All--");
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
 

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      
      dispatch(loadingActions.setLoading(true));

      const dataFetch = await fetch(SummaryApi.all_products.url, {
        method: SummaryApi.all_products.method,
        credentials: "include",
      });

      const dataResponse = await dataFetch.json();

      if (dataResponse.success) {
        dispatch(setProducts(dataResponse?.data || []));
      } else {
        toast.error(dataResponse.message || "Failed to fetch Products");
      }
    } catch (error) {
      toast.error("Failed to fetch Products");
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
  };

  const handleOnSelectCatagory = (event) => {
    event.preventDefault();
    const selectedCatagory = event.target.value;
    setCatagorySelected(selectedCatagory);

    if (selectedCatagory && selectedCatagory !== "--All--") {
      const filtered = allProducts.filter(
        (product) => product.catagory === selectedCatagory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  };

  //extract all catagory type 
  const Catagoryies = allCatagory
  .map(obj => obj.catagoryName)
  .filter((value, index, self) => self.indexOf(value) === index);
  //converting to lower case for the value to be lower case
  const ProductCatagory = Catagoryies.map(str => str.toLowerCase());
 

  // useEffect(() => {
  //   fetchAllProducts();
  // }, []);

  useEffect(() => {
    if (catagorySelected === "--All--") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) => product.catagory === catagorySelected
      );
      setFilteredProducts(filtered);
    }
  }, [catagorySelected, allProducts]);

  useEffect(() => {
    if (fetchStatus) {
      fetchAllProducts();
      dispatch(fetchAllProduct(false));
      
    }
  }, [fetchStatus,catagoryFetchStatus, dispatch]);


  return (
    <>
      {/* Conditionally render spinner */}
      {loadingStatus ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="bg-white py-2 px-4 flex justify-between shadow-md items-center">
            {allProducts.length > 0 && (
              <div className="flex gap-4">
                <label htmlFor="catagory" className="font-semibold mt-3">
                  Product Catagory:
                </label>

                <select
                  value={catagorySelected}
                  name="catagory"
                  required
                  onChange={handleOnSelectCatagory}
                  className="p-2 bg-slate-100 border rounded cursor-pointer"
                >
                  <option value="--All--">--All--</option>
                  {ProductCatagory &&
                    ProductCatagory.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item}
                      </option>
                    ))}
                </select>
               
              </div>
            )}

            <div className="flex justify-center items-center gap-5">
              <span
                className="text-2xl cursor-pointer hover:text-gray-400 active:scale-90"
                onClick={fetchAllProducts}
              >
                <LuRefreshCcw />
              </span>

              <button
                className="p-2 bg-red-600 rounded-full text-white text-sm hover:scale-110 transition-all ease-in-out active:bg-red-800 active:scale-90"
                onClick={() => setOpenUploadProduct(true)}
              >
                Upload Products
              </button>
            </div>
          </div>
          {/* Show All Products Start */}
          <div
            rel="main container"
            className="flex flex-wrap gap-2 py-4 h-[calc(100vh-190px)] overflow-y-scroll bg-slate-50"
          >
            {filteredProducts.map((item, index) => (
              <ProductCard key={item._id + index} item={item} />
            ))}
          </div>
          {/* Show All Products End */}
          {openUploadProduct && (
            <UploadProducts
              onClose={(success) => {
                setOpenUploadProduct(false);
                if (success) {
                  fetchAllProducts(); // Refetch products after successful upload
                }
              }}
            />
          )}
          
        </div>
      )}
    </>
  );
};

export default AllProducts;
