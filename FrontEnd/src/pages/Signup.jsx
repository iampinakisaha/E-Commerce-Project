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

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.loading);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const handleUploadPic = async (event) => {
    const file = event.target.files[0];

    const imagePic = await imageToBase64(file);
    setSignupData((prevState) => ({
      ...prevState,
      profilePic: imagePic,
    }));
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newSignupData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      profilePic: signupData.profilePic,
    };

    setSignupData(newSignupData);

    // password validation start
    try {
      dispatch(loadingActions.setLoading(true));

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (newSignupData.password !== newSignupData.confirmPassword) {
        toast.error("Both Password not matched");
      } else if (!passwordRegex.test(newSignupData.password)) {
        toast.error("Password didn't match the criteria");
      } else {
        const dataResponse = await fetch(SummaryApi.signUP.url, {
          method: SummaryApi.signUP.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newSignupData),
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
    <section id="signup">
      {/* Conditionally render spinner */}
      {loadingStatus ? (
        <LoadingSpinner />
      ) : (
        <div className="mx-auto container p-4">
          <div className="bg-white p-2 py-5 w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
            {/* logo start */}
            <div className="h-20 w-20 mx-auto relative">
              <img
                className="rounded-full"
                src={signupData.profilePic || loginIcon}
                alt="login Icons"
              />
            </div>

            <form onChange={handleUploadPic}>
              <label>
                {!signupData.profilePic && (
                  <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-1 text-center cursor-pointer rounded-b-full absolute top-36 left-1/2 transform -translate-x-1/2">
                    Upload Photo
                  </div>
                )}

                <input type="file" name="profile" className="hidden" />
              </label>
            </form>
            {/* logo end */}

            {/* form start */}
            <form
              className="pt-6 flex flex-col gap-2"
              onSubmit={handleOnSubmit}
            >
              {/* name start */}
              <div className="grid">
                <label>Name:</label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="text"
                    alt="name"
                    name="name"
                    required
                    placeholder="enter your name"
                    className="w-full h-full outline-none bg-transparent"
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

              {/* confirm password start */}
              <div className="grid">
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

              {/* submit start */}
              <div className="bg-red-600 text-white h-10 w-full max-w-[150px] rounded-3xl mx-auto my-2 flex justify-center transition-transform duration-300 ease-in-out transform active:scale-75  active:bg-red-800 hover:scale-110">
                <button type="submit">Signup</button>
              </div>
              {/* submit end */}

              {/* account signup start */}
              <div className="text-sm my-2 transition-transform duration-300 ease-in-out transform active:scale-95">
                <Link to={"/login"}>
                  <span className="p-4 block w-fit mr-auto ">
                    Already have an account ?
                    <span className="hover:underline hover:text-red-600">
                      {" "}
                      Sign in
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

export default Signup;
