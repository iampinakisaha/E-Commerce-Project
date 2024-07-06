import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { deleteProduct } from "../../store/allProductSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminDeleteCatagory from "./AdminDeleteCatagory";
import AdminEditCatagory from "./AdminEditCatagory";

const CatagoryCard = ({ item }) => {
  // product card edit - start
  const [editCatagoryCard, setEditCatagoryCard] = useState(false);
  // product card edir - end
  const [deleteCatagory, setDeleteCatagory] = useState(false);

  return (
    <div
      className="card flex flex-col justify-center bg-white items-center m-2 p-2 rounded relative group"
      style={{ width: "18rem" }}
    >
      <img
        src={item.catagoryImage[0]}
        className="card-img-top"
        alt={item.catagoryName}
        style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
      />
      <div className="absolute w-full hidden group-hover:block bottom-0">
        <div className="flex justify-between gap-5">
          <button
            className="bg-green-400 h-10 w-full p-2 text-white hover:bg-green-600 active:scale-95 transition-all ease-in-out"
            onClick={() => setEditCatagoryCard(true)}
          >
            Edit
          </button>
          <button
            className="bg-red-400 h-10 w-full p-2 text-white hover:bg-red-600 active:scale-95 transition-all ease-in-out"
            onClick={() => setDeleteCatagory(true)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="card-body w-full mt-2 mb-10">
        <div className="flex justify-between font-bold text-sm">
          <span className="truncate">{item.catagoryType}</span>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span className="truncate">{item.catagoryName}</span>
        </div>
      </div>

      {editCatagoryCard && (
        <AdminEditCatagory
          item={item}
          onClose={() => setEditCatagoryCard(false)}
        />
      )}
      {deleteCatagory && (
        <AdminDeleteCatagory
          itemDelete={item}
          onDelete={() => setDeleteCatagory(false)}
        />
      )}
    </div>
  );
};

export default CatagoryCard;
