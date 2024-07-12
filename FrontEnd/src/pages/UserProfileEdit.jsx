import React, { useState } from "react";
import loginIcon from "..//assets//signin.gif";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import imageToBase64 from "../helpers/imageToBase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { loadingActions } from "../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../helpers/loadingSpinner";

const UserProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.loading);
  const user = useSelector((state) => state.user?.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState({
    ...user,
    name: user.name || "",
    password: user.password || "",
    confirmPassword: user.password || "",
    profilePic: user.profilePic || "",
  });

  const handleUploadPic = async (event) => {
    const file = event.target.files[0];

    const imagePic = await imageToBase64(file);
    setUserData((prevState) => ({
      ...prevState,
      profilePic: imagePic,
    }));
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUserData = {
      ...userData,
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    setUserData(newUserData);
    // password validation start
    try {
      dispatch(loadingActions.setLoading(true));

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (userData.password !== userData.confirmPassword) {
        toast.error("Both Password not matched");
      } else if (!passwordRegex.test(userData.password)) {
        toast.error("Password didn't match the criteria");
      } else {
        const dataResponse = await fetch(SummaryApi.user_profile_update.url, {
          method: SummaryApi.user_profile_update.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
            // "Authorization": `Bearer ${token}`, // Include the token in the headers
          },
          body: JSON.stringify(userData),
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
          toast.success(dataApi.message);
          navigate("/profile");
        }
        if (dataApi.error) {
          toast.error(dataApi.message);
          // navigate("/");
        }
      }
    } catch (err) {
    } finally {
      dispatch(loadingActions.setLoading(false)); // Hide loader
    }
  };
  if(!user) {
    navigate("/login")
    return null; 
  }else {
  return loadingStatus ? (
    <LoadingSpinner />
  ) : (
    <section>
      <div className=" p-2  max-h-full min-h-[calc(100vh-180px)] mx-auto md:m-4 md:rounded">
        <div className="flex flex-col sm:flex-row sm:gap-2 h-[calc(100vh-180px)] bg-white shadow-md">
          <div className=" h-[40%] sm:h-full sm:w-[40%]  p-2 ">
            {/* logo start */}
            <div className="flex flex-col mx-auto h-full">
              <div className="flex h-[80%] justify-center items-center">
                <img
                  className="p-1 bg-slate-100 shadow-md w-full h-full object-contain"
                  src={userData?.profilePic || loginIcon}
                  alt="Profile"
                />
              </div>
              <div className="flex h-[20%] justify-center items-center">
                <form>
                  <label className="flex justify-center items-center">
                    <div
                      className="text-sm bg-opacity-50 bg-blue-500 p-2 sm:p-3 m-2 w-full items-center cursor-pointer rounded flex justify-center text-white font-semibold hover:bg-blue-600
                  active:scale-95 transition-all ease-in-out"
                    >
                      {userData?.profilePic ? "Change Photo" : "Upload Photo"}
                    </div>
                    <input
                      type="file"
                      name="profile"
                      className="hidden"
                      onChange={handleUploadPic}
                    />
                  </label>
                </form>
              </div>
            </div>
            {/* logo end */}
          </div>

          <div className=" h-[60%] sm:h-full sm:w-[60%] bg-white p-2 ">
            {/* profile update section start */}
              {/* form start */}
        <form className="pt-6 flex flex-col gap-2" onSubmit={handleOnSubmit}>
          {/* name start */}
          <div className="grid">
            <label>Name:</label>
            <div className="bg-slate-100 p-2">
              <input
                type="text"
                alt="name"
                name="name"
                value={userData.name}
                required
                placeholder="enter your name"
                className="w-full h-full outline-none bg-transparent"
                onChange={handleOnChange}
              />
            </div>
          </div>
          {/* name end */}

          {/* email start */}
          <div className="grid">
            <label>Email:</label>
            <div className="bg-slate-100 p-2">
              <input
                type="email"
                alt="email"
                name="email"
                value={userData.email}
                readOnly // Makes the input read-only
                placeholder="enter your email"
                className="w-full h-full outline-none bg-transparent uppercase text-gray-400"
              />
            </div>
          </div>
          {/* email end */}

          {/* password start */}
          <div className="grid">
            <label>New Password:</label>
            <div className="bg-slate-100 p-2 flex">
              <input
                type={showPassword ? "text" : "password"}
                alt="password"
                name="password"
                required
                placeholder="enter your new password"
                className="w-full h-full outline-none bg-transparent"
                onChange={handleOnChange}
              />
              <div
                className="cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-50"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>
          </div>
          {/* password end */}

          {/* confirm password start */}
          <div className="grid">
            <label>Confirm New Password:</label>
            <div className="bg-slate-100 p-2 flex">
              <input
                type={showConfirmPassword ? "text" : "password"}
                alt="confirmPassword"
                name="confirmPassword"
                required
                placeholder="confirm your new password"
                className="w-full h-full outline-none bg-transparent"
                onChange={handleOnChange}
              />
              <div
                className="cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-50"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>
          </div>
          {/* confirm password end */}

          {/* submit start */}
          <div className="bg-blue-500 text-white h-12 w-full  rounded mx-auto my-3 flex justify-center transition-transform duration-300 ease-in-out transform active:scale-95  hover:bg-blue-700 font-semibold">
            <button type="submit">UPDATE</button>
          </div>
          {/* submit end */}
        </form>
        {/* form end */}
            {/* profile update section end */}
          </div>
        </div>
      </div>
    </section>
  );}
};

export default UserProfileEdit;
