import React, { useEffect, useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import { loadingActions } from "../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import LoadingSpinner from "../helpers/loadingSpinner";
import { useNavigate } from "react-router-dom";

const ChangeUserData = ({ user, onClose, onUpdateUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const loadingStatus = useSelector((state) => state.loading);
  const [userDetails, setUserDetails] = useState(user);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUserDetails = {
      ...userDetails,
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
    };

    try {
      dispatch(loadingActions.setLoading(true));

      const dataResponse = await fetch(SummaryApi.update_user.url, {
        method: SummaryApi.update_user.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUserDetails),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        setUserDetails(newUserDetails); // Update userDetails state with new data
        onUpdateUser(newUserDetails); // Update user in the parent component state
        navigate("/admin-panel/all-users");
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update user");
    } finally {
      dispatch(loadingActions.setLoading(false)); // Hide loader
      setIsVisible(false);
      onClose(); // Notify parent component to close ChangeUserData
    }
  };

  const handleHideForm = () => {
    setIsVisible(false);
    onClose(); // Notify parent component to close ChangeUserData
  };

  return (
    <>
      {isVisible && (
        loadingStatus ? (
          <LoadingSpinner />
        ) : (
          <div className="top-0 bottom-0 left-0 right-0 absolute w-full h-full z-10 justify-between items-center">
            <div className="bg-white h-full max-h-80 p-4 max-w-md mx-auto shadow-md -bottom-36 rounded-md relative group">
              <div
                className="flex justify-center items-center ml-96 rounded-full bg-green-200 h-8 w-8 hover:bg-green-400 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-75 hover:text-red-600 hover:scale-110"
                onClick={handleHideForm}
              >
                <IoMdClose />
              </div>
              <form className="w-full max-w-md mx-auto bg-white" onSubmit={handleOnSubmit}>
                <div className="w-full m-2 p-2 flex items-center justify-between">
                  <label className="w-1/4 font-semibold" htmlFor="name">
                    User Name:
                  </label>
                  <input
                    className="w-3/4 px-3 py-2 border rounded-md"
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={user?.name}
                  />
                </div>
                <div className="w-full m-2 p-2 flex items-center justify-between">
                  <label className="w-1/4 font-semibold" htmlFor="email">
                    User Email:
                  </label>
                  <input
                    className="w-3/4 px-3 py-2 border rounded-md"
                    type="text"
                    id="email"
                    name="email"
                    defaultValue={user?.email}
                  />
                </div>
                <div className="w-full m-2 p-2 flex items-center justify-between">
                  <label className="w-1/4 font-semibold" htmlFor="role">
                    Role:
                  </label>
                  <select
                    className="w-3/4 px-3 py-2 border rounded-md"
                    id="role"
                    name="role"
                    defaultValue={user?.role || ""}
                  >
                    <option value="" disabled>
                      {user?.role ? `Current Role: ${user.role}` : "Select a role"}
                    </option>
                    {Object.values(ROLE).map((data) => (
                      <option value={data} key={data}>
                        {data}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full m-2 p-2 flex justify-center">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ChangeUserData;
