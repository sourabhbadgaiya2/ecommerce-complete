import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center p-6'>
      <FaExclamationTriangle className='text-red-500 text-6xl mb-4' />
      <h1 className='text-3xl font-bold mb-2'>Unauthorized Access</h1>
      <p className='text-gray-600 mb-6'>
        You do not have permission to view this page.
      </p>
      <Link
        to='/'
        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
