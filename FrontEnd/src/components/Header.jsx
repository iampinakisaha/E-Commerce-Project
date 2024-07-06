import React, { useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate  } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Profile from "./Profile";
import ProductSearch from "../pages/ProductSearch";

const Header = () => {
  const [customSearch, setCustomSearch] = useState({
    customSearchInput: "",
  });
  const bagItems = useSelector((state) => state.bagData);
  console.log("bag Items are", bagItems.length)
  const dispatch = useDispatch();
  
  const handleOnChange = (event) => {
    console.log(event.key)
    const { name, value } = event.target;
    setCustomSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  


  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const dataApi = await fetchData.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      console.log("logout success");
      dispatch(setUserDetails(null));
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
      console.log("logout failed", user._id);
    }
  };

  
  //handle logout function end

  // fetch user details from store[ we use useSelector from react-redux]
  const user = useSelector((state) => state?.user?.user); // state?.user?.user [we write this beacuse if key fields is not these it will show error]
  // console.log(user);

  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 py-2 justify-between">
        {/* logo section start*/}
        <div
          className="cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-75 hover:scale-110"
          rel="logo"
        >
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        {/* logo section ends*/}

        {/* search section start*/}
        <div
          className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow  pl-2 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-110 hover:scale-110"
          rel="search"
        >
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none"
            id="customSearchInput"
            name="customSearchInput"
            value = {customSearch.customSearchInput}
            onChange={handleOnChange}
          ></input>
          <Link to={"/search"} className="text-xl min-w-[50px] bg-red-600 h-8 flex items-center justify-center rounded-r-full text-white" >
            <GrSearch />
          </Link>
        </div>
        {/* search section ends*/}

        {/* user/cart/login section start*/}
        <div className="flex items-center gap-7">
          {/* user section start*/}
          <div className="relative group flex justify-center">
            <div
              className="text-3xl cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-75 hover:scale-110"
              rel="user"
            >
              {/* {console.log("User profile pic",user.profilePic)} */}
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-10 h-10 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
            {/* profile navbar start */}
            <Profile/>
            {/* profile navbar end */}
          </div>

          {/* user section end*/}

          {/* cart section start*/}
          <div
            className="text-2xl cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-75 flex a relative hover:scale-110"
            rel="cart"
          >
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 text-white h-5 w-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
            <p className="text-base">{bagItems ? bagItems.length : 0}</p>
            </div>
          </div>
          {/* cart section ends*/}

          {/* login section start */}
          <div>
            {!user?._id ? (
              <div id="login">
                <Link to={"/login"}>
                  <button className="px-4 py-1 rounded-full text-white bg-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-75 active:bg-red-800 hover:scale-110">
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <div id="logout">
                <Link to={"/login"}>
                  <button
                    className="px-4 py-1 rounded-full text-white bg-red-600 cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-75 active:bg-red-800 hover:scale-110"
                    //implement onclick for logout
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Link>
              </div>
            )}
          </div>
          {/* login section ends */}
        </div>
        {/* user/cart/login section ends*/}
      </div>
      <div className="hidden">
      <ProductSearch customSearch={customSearch.customSearchInput} />
      </div>
    </header>
  );
};

export default Header;
