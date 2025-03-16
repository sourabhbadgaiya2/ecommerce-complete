import React from "react";
import { FaUndo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className='mb-4 flex items-center text-blue-500 cursor-pointer'
      >
        <FaUndo className='mr-2' /> Go Back
      </button>
    </div>
  );
};

export default BackButton;
