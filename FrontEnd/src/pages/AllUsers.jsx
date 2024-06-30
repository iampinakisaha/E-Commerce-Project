import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import ChangeUserData from "../components/ChangeUserData";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchAllUsers = async () => {
    try {
      const dataFetch = await fetch(SummaryApi.all_user.url, {
        method: SummaryApi.all_user.method,
        credentials: "include",
      });

      const dataResponse = await dataFetch.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      } else {
        toast.error(dataResponse.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleEditUser = (user) => {
    setEditingUserId(user);
  };

  // Function to update the allUsers state after editing a user
  const updateUserInList = (updatedUser) => {
    const updatedUsers = allUsers.map((user) =>
      user._id === updatedUser._id ? updatedUser : user
    );
    setAllUsers(updatedUsers);
  };

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable relative">
        <thead>
          <tr className="bg-slate-600 text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Last Updated Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{moment(user.createdAt).format("ll")}</td>
              <td>{moment(user.updatedAt).format("ll")}</td>
              <td>
                <button
                  className="bg-green-200 p-2 rounded-full hover:bg-green-400 transition-transform duration-300 ease-in-out transform active:scale-75 hover:text-red-600 hover:scale-110"
                  onClick={() => handleEditUser(user)}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUserId && (
        <ChangeUserData
          user={editingUserId}
          onClose={() => setEditingUserId(null)}
          onUpdateUser={updateUserInList} // Pass the callback function
        />
      )}
    </div>
  );
};

export default AllUsers;
