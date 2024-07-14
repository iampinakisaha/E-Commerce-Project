import React, { useState } from "react";
import loginIcon from "..//assets//signin.gif";
import { Link } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { loadingActions } from "../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../helpers/loadingSpinner";
import { useContext } from "react";
import UserContext from "../context";


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // user credential fetch start
  const { fetchUserDetails } = useContext(UserContext);

  // user credential fetch end
  const loadingStatus = useSelector((store) => store.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    emailVerified: false,
  });



  const handleEmailChange = (e) => {
    setLoginData({ ...loginData, email: e.target.value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newLogindata = {
      email: formData.get("email"),
    };
    setLoginData(newLogindata);
    console.log("login data..........", loginData)
    try {
      dispatch(loadingActions.setLoading(true));

      const dataResponse = await fetch(SummaryApi.user_email_verify.url, {
        method: SummaryApi.user_email_verify.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newLogindata),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        setLoginData({
          ...loginData,
          emailVerified: dataApi.success,
        })
        // dispatch(setUserDetails(dataApi.data));
        // navigate("/");
        // fetchUserDetails();
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
        // navigate("/");
      }
    } catch (err) {
    } finally {
      dispatch(loadingActions.setLoading(false)); // Hide loader
    }
  };

  return (
    <div className="mx-auto container p-4">
      <div className="bg-white p-2 py-5 w-full max-w-md mx-auto rounded-lg  shadow-lg">
        {/* logo start */}
        <div className="h-20 w-20 mx-auto bg-none ">
          <img
            className="rounded-full size-max"
            src={loginIcon}
            alt="login Icons"
          />
        </div>
        {/* logo end */}

        {/* form start */}
        <form className="pt-6 flex flex-col gap-2" onSubmit={handleOnSubmit}>
          {/* email start */}
          <div className="grid py-5">
            <label>Email:</label>
            <div className="bg-slate-100 p-2">
              <input
                type="email"
                alt="email"
                name="email"
                value={loginData.email}
                onChange={handleEmailChange}
                required
                placeholder="enter your email"
                className="w-full h-full outline-none bg-transparent"
              />
            </div>
          </div>
          {/* email end */}

          {loginData?.emailVerified && (
            <div className="grid py-5">
            <label>Enter Verification Code:</label>
            <div className="bg-slate-100 p-2">
              <input
                type="text"
                alt="verification code"
                name="verification code"
                
                required
                placeholder="enter verification code here"
                className="w-full h-full outline-none bg-transparent"
              />
            </div>
          </div>
          )}

          {/* submit start */}
          <div className="bg-red-500 text-white h-10 w-full rounded mx-auto my-2 flex justify-center transition-transform duration-300 ease-in-out transform active:scale-75  hover:bg-red-600 cursor-pointer">
            <button type="submit">Reset</button>
          </div>
          {/* submit end */}
        </form>
        {/* form end */}
      </div>
    </div>
  );
};

export default ForgotPassword;
