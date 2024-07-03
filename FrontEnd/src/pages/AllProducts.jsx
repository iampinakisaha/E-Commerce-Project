import React, { useEffect, useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import UploadProducts from "../components/UploadProducts";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { loadingActions } from "../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../helpers/loadingSpinner";
import ProductCard from "../components/ProductCard";
import ProductCatagory from "../helpers/ProductCatagory";
import { setProducts } from "../store/productSlice";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const [categorySelected, setCategorySelected] = useState("");
  const loadingStatus = useSelector((state) => state.loading);
  
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
        setAllProducts(dataResponse?.data || []);
        setFilteredProducts(dataResponse?.data || []);
      } else {
        toast.error(dataResponse.message || "Failed to fetch Products");
      }
    } catch (error) {
      toast.error("Failed to fetch Products");
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
  };

  const handleOnSelectCategory = (event) => {
    const selectedCategory = event.target.value;
    setCategorySelected(selectedCategory);

    if (selectedCategory) {
      const filtered = allProducts.filter(
        (product) => product.catagory === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  return (
    <>
      {/* Conditionally render spinner */}
      {loadingStatus ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="bg-white py-2 px-4 flex justify-between shadow-md items-center">
            {/* <h2 className="font-bold text-slate-800 text-lg">All Products</h2> */}
            {/* Category selector */}
            {allProducts.length > 0 && (
              <div className="flex gap-4">
                <label htmlFor="category" className="font-semibold mt-3">
                Product Category:
                </label>

                <select
                  value={categorySelected}
                  name="category"
                  required
                  onChange={handleOnSelectCategory}
                  className="p-2 bg-slate-100 border rounded cursor-pointer"
                >
                  <option value="">--All--</option>
                  {ProductCatagory &&
                    ProductCatagory.map((item, index) => (
                      <option value={item.value} key={index} >
                        {item.label}
                      </option>
                    ))}
                </select>
                </div>
            )}
            {/* End category selector */}
            <div className="flex justify-center items-center gap-5"> 
            <span to={"/admin-panel/products"} className="text-2xl cursor-pointer hover:text-gray-400 active:scale-90" onClick={fetchAllProducts}
            
            
            ><LuRefreshCcw /></span>

            <button
              className="p-2 bg-red-600 rounded-full text-white text-sm hover:scale-110 transition-all ease-in-out active:bg-red-800 active:scale-90"
              onClick={() => setOpenUploadProduct(true)}
            >
              Upload Products
            </button>
            </div>
          </div>
          {/* Show All Products Start */}
          <div rel="main container" className="flex flex-wrap  gap-2 py-4">
            {filteredProducts.map((item) => (
              <ProductCard key={item._id} item={item} fetchData={fetchAllProducts}/>
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
