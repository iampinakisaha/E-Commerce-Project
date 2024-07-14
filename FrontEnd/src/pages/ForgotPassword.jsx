import React, { useEffect, useState } from "react";
import loginIcon from "../assets/signin.gif";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loadingActions } from "../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordResetData, setPasswordResetData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const loadingStatus = useSelector((store) => store.loading);
  const [loginData, setLoginData] = useState({
    email: "",
    emailVerified: false,
    otpVerified: false,
  });

  const handleEmailChange = (e) => {
    setLoginData({ ...loginData, email: e.target.value });
  };

  const handleEmailVerification = async () => {
    try {
      dispatch(loadingActions.setLoading(true));

      const dataResponse = await fetch(SummaryApi.user_otp_verify.url, {
        method: SummaryApi.user_otp_verify.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: loginData.email }),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        setLoginData((prevLoginData) => ({
          ...prevLoginData,
          emailVerified: dataApi.success,
        }));
      } else {
        toast.error(dataApi.message);
      }
    } catch (err) {
      console.error("Error verifying email:", err);
      toast.error("Failed to verify email. Please try again.");
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
  };

  const handleOTPVerification = async (otp) => {
    try {
      dispatch(loadingActions.setLoading(true));

      const dataResponse = await fetch(SummaryApi.user_otp_confirm.url, {
        method: SummaryApi.user_otp_confirm.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...loginData, otp }),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        setLoginData((prevLoginData) => ({
          ...prevLoginData,
          otpVerified: dataApi.success,
        }));
      } else {
        toast.error(dataApi.message);
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
  };

  const handleSubmitEmailVerification = (event) => {
    event.preventDefault();
    handleEmailVerification();
  };

  const handleSubmitOTPVerification = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const otp = formData.get("otp");
    handleOTPVerification(otp);
  };

  const handleOnSubmitPassword = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPasswordResetData = {
      email: loginData.email,
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
     
    };

    setPasswordResetData(newPasswordResetData);

    // password validation start
    try {
      dispatch(loadingActions.setLoading(true));

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (newPasswordResetData.password !== newPasswordResetData.confirmPassword) {
        toast.error("Both Password not matched");
      } else if (!passwordRegex.test(newPasswordResetData.password)) {
        toast.error("Password didn't match the criteria");
      } else {
        const dataResponse = await fetch(SummaryApi.user_password_confirm.url, {
          method: SummaryApi.user_password_confirm.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newPasswordResetData),
        });

        const dataApi = await dataResponse.json();

        // console.log("DataApi", dataApi);

        if (dataApi.success) {
          toast.success(dataApi.message);
          navigate("/login");
        }
        if (dataApi.error) {
          toast.error(dataApi.message);
          // navigate("/");
        }
      }
    } catch (err) {
      // console.log(err);
    } finally {
      dispatch(loadingActions.setLoading(false)); // Hide loader
    }
  };

  return (
    <div className="mx-auto container p-4">
      <div className="bg-white p-2 py-5 w-full max-w-md mx-auto rounded-lg shadow-lg">
        <div className="h-20 w-20 mx-auto bg-none">
          <img className="rounded-full size-max" src={loginIcon} alt="login Icons" />
        </div>
        {!loginData.otpVerified ? (
        <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmitEmailVerification}>
          <div className="grid py-5">
            <div className="flex gap-2">
              <div className="bg-slate-100 p-2 w-[80%]">
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

              <div className="bg-red-500 text-white h-10 w-[20%] rounded mx-auto flex justify-center transition-transform duration-300 ease-in-out transform active:scale-75  hover:bg-red-600 cursor-pointer">
                <button type="submit">Verify</button>
              </div>
            </div>
          </div>
        </form>
        ):("")}
        {loginData.emailVerified && !loginData.otpVerified ? (
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmitOTPVerification}>
            <div className="grid py-5">
              <label>Enter Verification Code:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  alt="otp"
                  name="otp"
                  required
                  placeholder="enter verification code here"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="bg-red-500 text-white h-10 w-full rounded mx-auto my-2 flex justify-center transition-transform duration-300 ease-in-out transform active:scale-75  hover:bg-red-600 cursor-pointer">
              <button type="submit">Reset</button>
            </div>
          </form>
        ):("")}

        {loginData.otpVerified && (
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleOnSubmitPassword}>
            {/* password start */}
            <div className="grid mb-2">
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

              {/* confirm password start */}
              <div className="grid mb-4">
                <label>Confirm Password:</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    alt="confirmPassword"
                    name="confirmPassword"
                    required
                    placeholder="confirm your password"
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-50"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    <span>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>
              {/* confirm password end */}
              <div className="bg-red-500 text-white h-10 w-full rounded mx-auto my-2 flex justify-center transition-transform duration-300 ease-in-out transform active:scale-75  hover:bg-red-600 cursor-pointer">
              <button type="submit">Reset</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
