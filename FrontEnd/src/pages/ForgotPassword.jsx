import React, { useEffect, useState } from "react";
import loginIcon from "../assets/signin.gif";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loadingActions } from "../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import CountDownTimer from "../helpers/countDownTimer";

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
    expiry: Date.now(),
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
          expiry: dataApi.data.expiredAt,
        }));
      } else {
        toast.error(dataApi.message);
      }
    } catch (err) {
     
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
    
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
  };

  const handleResendEmailVerification = async () => {
    try {
      dispatch(loadingActions.setLoading(true));

      const dataResponse = await fetch(SummaryApi.user_otp_verify.url, {
        method: SummaryApi.user_otp_verify.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(
          {
           email: loginData.email,
           otpResend: true,
          }),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success("OTP resent successfully.");
        setLoginData((prevLoginData) => ({
          ...prevLoginData,
          expiry: dataApi.data.expiredAt,
        }));
      } else {
        toast.error(dataApi.message);
      }
    } catch (err) {
      
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
  };

  const handleSubmitResendEmailVerification = (event) => {
    event.preventDefault();
    handleResendEmailVerification();
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

    try {
      dispatch(loadingActions.setLoading(true));

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (newPasswordResetData.password !== newPasswordResetData.confirmPassword) {
        toast.error("Passwords do not match.");
      } else if (!passwordRegex.test(newPasswordResetData.password)) {
        toast.error("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.");
      } else {
        const dataResponse = await fetch(SummaryApi.user_password_confirm.url, {
          method: SummaryApi.user_password_confirm.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newPasswordResetData),
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
          toast.success(dataApi.message);
          navigate("/login");
        } else {
          toast.error(dataApi.message);
        }
      }
    } catch (err) {
      
      toast.error("Failed to reset password. Please try again.");
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
  };

  return (
    <div className="mx-auto container p-4">
      <div className="bg-white p-2 py-5 w-full max-w-md mx-auto rounded-lg shadow-lg">
        <div className="h-20 w-20 mx-auto bg-none">
          <img className="rounded-full size-max" src={loginIcon} alt="Login Icons" />
        </div>

        {/* Email Verification Form */}
        {!loginData.otpVerified && (
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
                    placeholder="Enter your email"
                    className="w-full h-full outline-none bg-transparent ${loginData.emailVerified ? 'pointer-events-none bg-gray-100 text-gray-600' : ''}`"
                    disabled={loginData.emailVerified}
                  />
                </div>
                {!loginData.emailVerified && !loadingStatus ? (
                  <div className="bg-red-500 text-white h-10 w-[20%] rounded mx-auto flex justify-center transition-transform duration-300 ease-in-out transform active:scale-75  hover:bg-red-600 cursor-pointer">
                    <button type="submit">Verify</button>
                  </div>
                ) : (
                  <div className="h-10 w-[20%] rounded mx-auto flex justify-center items-center">
                    {loadingStatus && !loginData.otpVerified ? (
                      <img
                      src="src/assets/verify-spinner.gif"
                      className=" transition-all ease-out "
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100px",
                        objectFit: "contain",
                      }}
                    />
                   
                    ) : (
                      <span className="text-green-600 text-2xl"><TiTick /></span>
                    )}
                     
                  </div>
                )}
              </div>
            </div>
          </form>
        )}

        {/* OTP Verification Form */}
        {loginData.emailVerified && !loginData.otpVerified && (
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmitOTPVerification}>
            <div className="grid py-2">
              <div className="flex gap-2">
                <div className="bg-slate-100 p-2 w-[80%]">
                  <input
                    type="text"
                    alt="otp"
                    name="otp"
                    required
                    placeholder="Enter verification code here"
                    className="w-full h-full outline-none bg-transparent ${loginData.expiry ? 'pointer-events-none bg-gray-100' : ''}`"
                    disabled={!loginData.expiry}
                  />
                </div>
                <div className="flex justify-center items-center w-[20%]">
                  {loginData.expiry ? (
                    <CountDownTimer
                      expiryDate={loginData.expiry}
                      onTimerComplete={() => setLoginData({ ...loginData, expiry: null })}
                      
                    />
                  ) : (
                    <button className="text-white bg-blue-500 rounded p-1 text-md hover:bg-blue-600
                    active:scale-95" onClick={ handleSubmitResendEmailVerification}>Resend</button>
                  )}
                </div>
              </div>
            </div>
            {loginData.expiry && (
              !loadingStatus && (

                <div className="bg-red-500 text-white h-10 w-full rounded mx-auto my-2 flex justify-center transition-transform duration-300 ease-in-out transform active:scale-75  hover:bg-red-600 cursor-pointer">
              <button type="submit">Enter OTP</button>
            </div>
              )
            )}
            
          </form>
        )}

        {/* Password Reset Form */}
        {loginData.otpVerified && (
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleOnSubmitPassword}>
            {/* Password Input */}
            <div className="grid mb-2">
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  alt="password"
                  name="password"
                  required
                  placeholder="Enter your password"
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

            {/* Confirm Password Input */}
            <div className="grid mb-4">
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  alt="confirmPassword"
                  name="confirmPassword"
                  required
                  placeholder="Confirm your password"
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-50"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            {loadingStatus ? (
              <div className="flex justify-center items-center">
                <img
                      src="src/assets/verify-spinner.gif"
                      className=" transition-all ease-out "
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100px",
                        objectFit: "contain",
                      }}
                    />
              </div>
            ) : (
              <div className="bg-red-500 text-white h-10 w-full rounded mx-auto my-2 flex justify-center transition-transform duration-300 ease-in-out transform active:scale-75  hover:bg-red-600 cursor-pointer">
              <button type="submit">Submit</button>
            </div>
            )}
            
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
