import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct, deleteProduct } from "../store/allProductSlice";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import LoadingSpinner from "../helpers/loadingSpinner";
import { loadingActions } from "../store/loadingSlice";

const AdminDeleteProduct = ({onDelete, itemDelete}) => {

  const loadingStatus = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const handleDeleteYes = async(event)=>{
    event.preventDefault();
    try {
      
      dispatch(loadingActions.setLoading(true));

      const dataResponse = await fetch (SummaryApi.delete_product.url,{
        method: SummaryApi.delete_product.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(itemDelete),
      
      })
      
      const dataApi = await dataResponse.json();
      
      if (dataApi.success) {
        dispatch(deleteProduct(dataApi.data));
        
        dispatch(fetchAllProduct(true));
        toast.success(dataApi.message);
        onDelete(true);
        // navigate("/admin-panel/products");
        
        
      
        
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }

    }catch(err){
      console.error("Error Updating Product...", err);
      toast.error("Error Updating Product...");
    }finally{
      dispatch(loadingActions.setLoading(false)); // Hide loader
    }
  }
  const handleDeleteNo = ()=>{
    onDelete()
  }
  return (
    <>
      {loadingStatus ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-slate-200 bg-opacity-35 fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-md w-full max-w-md mx-4 sm:mx-auto h-full max-h-[40%] overflow-hidden flex flex-col justify-center items-center">
            <div className="p-2 m-2 flex flex-col justify-center items-center rounded">
              <h2 className="text-xl sm:text-2xl p-2 m-2 font-semibold text-slate-800 mx-auto">
                Are you sure you want to Delete?
              </h2>
              <div className="flex flex-col sm:flex-row justify-between items-center p-2 m-2 gap-4 sm:gap-8 w-full">
                <button
                  className="bg-red-400 h-12 w-full sm:w-36 rounded text-white transition-all ease-in-out hover:bg-red-600 active:scale-95"
                  onClick={handleDeleteYes}
                >
                  Yes
                </button>
                <button
                  className="bg-green-400 h-12 w-full sm:w-36 rounded text-white transition-all ease-in-out hover:bg-green-600 active:scale-95"
                  onClick={handleDeleteNo}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDeleteProduct;
