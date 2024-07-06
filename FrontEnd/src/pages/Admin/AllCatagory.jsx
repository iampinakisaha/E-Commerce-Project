import React, { useEffect, useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import UploadProducts from "../../components/admin/UploadProducts";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { loadingActions } from "../../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../helpers/loadingSpinner";
import ProductCard from "../../components/admin/ProductCard";
import { MdOutlineAdd } from "react-icons/md";
import UploadProductCatagory from "../../components/admin/UploadProductCatagory";
import { fetchAllCatagory, setCatagory } from "../../store/allCatagorySlice";
import CatagoryCard from "../../components/admin/CatagoryCard";

const AllCatagory = () => {
  const dispatch = useDispatch();
  const allCatagory = useSelector((state) => state.catagoryData.catagory);
  const fetchStatus = useSelector((state) => state.catagoryData.fetchStatus);
  const loadingStatus = useSelector((state) => state.loading);

  const [filteredCatagories, setFilteredCatagories] = useState([]);
  const [catagoryTypeSelected, setCatagoryTypeSelected] = useState("--All--");
  const [openUploadCatagory, setOpenUploadCatagory] = useState(false);

  // Fetch all products
  const fetchAllCatagories = async () => {
    try {
      dispatch(loadingActions.setLoading(true));

      const dataFetch = await fetch(SummaryApi.all_catagory.url, {
        method: SummaryApi.all_catagory.method,
        credentials: "include",
      });

      const dataResponse = await dataFetch.json();

      if (dataResponse.success) {
        dispatch(setCatagory(dataResponse?.data || []));
      } else {
        toast.error(dataResponse.message || "Failed to fetch Catagory");
      }
    } catch (error) {
      toast.error("Failed to fetch Catagory");
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
  };

  const handleOnSelectCatagory = (event) => {
    event.preventDefault();
    const selectedCatagory = event.target.value;
    setCatagoryTypeSelected(selectedCatagory);

    if (selectedCatagory && selectedCatagory !== "--All--") {
      const filtered = allCatagory.filter(
        (catagory) => catagory.catagoryType === selectedCatagory
      );
      setFilteredCatagories(filtered);
    } else {
      setFilteredCatagories(allCatagory);
    }
  };

  //extract all catagory type
  const ProductCatagory = allCatagory
    .map((obj) => obj.catagoryType)
    .filter((value, index, self) => self.indexOf(value) === index);

  useEffect(() => {
    fetchAllCatagories();
  }, []);

  useEffect(() => {
    if (catagoryTypeSelected === "--All--") {
      setFilteredCatagories(allCatagory);
    } else {
      const filtered = allCatagory.filter(
        (catagory) => catagory.catagoryType === catagoryTypeSelected
      );
      setFilteredCatagories(filtered);
    }
  }, [catagoryTypeSelected, allCatagory]);

  useEffect(() => {
    if (fetchStatus) {
      fetchAllCatagories();
      dispatch(fetchAllCatagory(false));
    }
  }, [fetchStatus, dispatch]);

  return (
    <>
      {/* Conditionally render spinner */}
      {loadingStatus ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="bg-white py-2 px-4 flex justify-between shadow-md items-center">
            {allCatagory.length > 0 && (
              <div className="flex gap-4">
                <label htmlFor="catagory" className="font-semibold mt-3">
                  Catagory Type:
                </label>

                {/* need to fix- later - start */}
                <select
                  value={catagoryTypeSelected}
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
                {/* need to fix- later - end */}
              </div>
            )}

            <div className="flex justify-center items-center gap-5">
              <span
                className="text-2xl cursor-pointer hover:text-gray-400 active:scale-90"
                onClick={fetchAllCatagories}
              >
                <LuRefreshCcw />
              </span>

              <button
                className="p-2 bg-red-600 rounded-full text-white text-sm hover:scale-110 transition-all ease-in-out active:bg-red-800 active:scale-90"
                onClick={() => setOpenUploadCatagory(true)}
              >
                Upload Catagory
              </button>
            </div>
          </div>
          {/* Show All catagories Start */}

          {/* need to fix later - start */}
          <div
            rel="main container"
            className="flex flex-wrap gap-2 py-4 h-[calc(100vh-190px)] overflow-y-scroll bg-slate-50"
          >
            {filteredCatagories.map((item, index) => (
              <CatagoryCard key={item._id + index} item={item} />
            ))}
          </div>
          {/* need to fix later - end */}

          {/* upload catagory -start */}
          {openUploadCatagory && (
            <UploadProductCatagory
              onCloseCatagory={(success) => {
                setOpenUploadCatagory(false);
                if (success) {
                  fetchAllCatagories(); // Refetch products after successful upload
                }
              }}
            />
          )}
          {/* upload catagory -end */}
        </div>
      )}
    </>
  );
};

export default AllCatagory;
