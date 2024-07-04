import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const userRole = useSelector((state) => state?.user?.user?.role);
  const navigate = useNavigate();
  // console.log(userRole)
  if (userRole === ROLE.ADMIN) {
    return (
      // check if user is admin then show the content
      <div className="min-h-[calc(100vh-180px)] md:flex hidden">
        <aside className="bg-white min-h-full w-full max-w-60 customShadow my-0.5 ">
          <div className="h-36  flex justify-center items-center flex-col">
            <div
              className="text-6xl cursor-pointer transition-transform duration-300 ease-in-out transform active:scale-75 hover:scale-110"
              rel="user"
            >
              {/* {console.log("User profile pic",user.profilePic)} */}
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-24 h-24 mt-8 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
            <p className="flex justify-center text-xl mt-2 capitalize font-semibold">
              {user?.name}
            </p>
            <p className="flex justify-center text-sm capitalize font-semibold">
              {user?.role}
            </p>
            <p></p>
          </div>
          {/* navigation start*/}
          <div>
            <nav className="grid p-4">
              <Link
                to={"all-users"}
                className="px-2 py-2 hover:bg-slate-100 shadow-md mt-2 rounded"
              >
                All Users
              </Link>
              <Link
                to={"products"}
                className="px-2 py-2 hover:bg-slate-100 shadow-md mt-2 rounded"
              >
                All Products
              </Link>
              
            </nav>
          </div>
          {/* navigation end */}
        </aside>

        <main className="w-full h-full p-2">
          <Outlet />
        </main>
      </div>
    );
  } else {
    // Redirect or navigate to another page if not admin
    navigate("/");
    return null; // Or handle non-admin case appropriately
  }
};

export default AdminPanel;
