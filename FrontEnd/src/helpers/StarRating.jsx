import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  const stars = Array(5).fill(<FaStar />);

  return (
    <span className="truncate flex text-sm">
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </span>
  );
};

export default StarRating;
