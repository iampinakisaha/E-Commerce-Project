import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCatagory } from "../../store/allCatagorySlice";
import { loadingActions } from "../../store/loadingSlice";
import { toast } from "react-toastify";
import SummaryApi from "../../common"; // Ensure SummaryApi is correctly imported
import LoadingSpinner from "../../helpers/loadingSpinner"
import { FaAngleDown } from "react-icons/fa";
const Navbar = () => {
  const dispatch = useDispatch();
  const allCatagory = useSelector((state) => state.catagoryData.catagory);
  const loadingStatus = useSelector((state) => state.loading);

  const fetchAllCatagories = async () => {
    try {
      dispatch(loadingActions.setLoading(true));

      const dataFetch = await fetch(SummaryApi.all_catagory.url, {
        method: SummaryApi.all_catagory.method
      });

      const dataResponse = await dataFetch.json();
      
      if (dataResponse.success) {
        dispatch(setCatagory(dataResponse?.data || []));
        
      } 
    } catch (error) {
      toast.error("Failed to fetch Category");
    } finally {
      dispatch(loadingActions.setLoading(false));
      
    }
  };
  useEffect(() => {
    fetchAllCatagories();
  }, [dispatch]);

  const navbarCategories = allCatagory.filter(
    (catagory) => catagory.catagoryType.toLowerCase() === "navbar"
  );


  return (
    <>
    {!loadingStatus && (
      <div className="flex flex-row justify-evenly shadow-md bg-white font-semibold gap-5 p-2 m-2 ml-2 mr-2 mx-auto overflow-x-scroll scroolbar-none">
      {navbarCategories.map((item, index) => (
        <div key={item._id + index} className="flex flex-col justify-center items-center cursor-pointer hover:scale-110 transition-all ease-in-out group p-2">
          <div>
            <img 
            src={item?.catagoryImage} 
            alt={item.catagoryName} 
            className="h-16 w-16 object-cover mb-2"
          /></div>
          <div className="text-gray-800 text-sm capitalize">{item?.catagoryName}</div>
          <div className="hidden group-hover:block fixed bottom-0 mt-2 active:text-gray-400 transition-all ease-out"> <FaAngleDown /></div>
        </div>
      ))}
    </div>
    )}
    </>
  );
};

export default Navbar;
