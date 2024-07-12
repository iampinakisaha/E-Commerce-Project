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
import UserContext  from "../context";
import { setUserDetails } from "../store/userSlice";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // user credential fetch start
  const {fetchUserDetails} = useContext(UserContext);
 
  // user credential fetch end
  const loadingStatus = useSelector((store) => store.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newLogindata = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    setLoginData(newLogindata);

    try {
      dispatch(loadingActions.setLoading(true));

      const dataResponse = await fetch(SummaryApi.LogIn.url, {
        method: SummaryApi.LogIn.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newLogindata),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        dispatch(setUserDetails(dataApi.data));
        navigate("/");
        fetchUserDetails();
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
    <section id="login">
      {/* Conditionally render spinner */}
      {loadingStatus ? (
        <LoadingSpinner />
      ) : (
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
            <form
              className="pt-6 flex flex-col gap-2"
              onSubmit={handleOnSubmit}
            >
              {/* email start */}
              <div className="grid py-5">
                <label>Email:</label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    alt="email"
                    name="email"
                    required
                    placeholder="enter your email"
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>
              {/* email end */}

              {/* password start */}
              <div className="grid">
                <label>Password:</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    alt="password"
                    name="password"
                    required
                    placeholder="enter your password"
                    className="w-full h-full outline-none bg-transparent"
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

              {/* forgot password start */}
              <div className="text-sm my-2 transition-transform duration-300 ease-in-out transform active:scale-95">
                <Link to={"/reset"}>
                  <span className="block w-fit ml-auto hover:underline hover:text-red-600">
                    Forgot Password ?
                  </span>
                </Link>
              </div>
              {/* forgot password end */}

              {/* submit start */}
              <div className="bg-red-600 text-white h-10 w-full max-w-[150px] rounded-3xl mx-auto my-2 flex justify-center transition-transform duration-300 ease-in-out transform active:scale-75  active:bg-red-800 hover:scale-110">
                <button type="submit">Login</button>
              </div>
              {/* submit end */}

              {/* account signup start */}
              <div className="text-sm my-2 transition-transform duration-300 ease-in-out transform active:scale-95">
                <Link to={"/signup"}>
                  <span className="p-4 block w-fit mr-auto ">
                    Don't have account ?
                    <span className="hover:underline hover:text-red-600">
                      {" "}
                      Sign up
                    </span>{" "}
                  </span>
                </Link>
              </div>
              {/* account signup end */}
            </form>
            {/* form end */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
