import React from "react";

const ShowImages = ({ item }) => {
  return (
    <div className=''>
      <div className='overflow-hidden rounded-lg shadow-lg'>
        <img
          src={`${import.meta.env.VITE_API_URL}/api/products/images/${
            item._id
          }`}
          alt={item.name}
          className={` h-[45vh] w-[100%] object-cover rounded-lg shadow-lg object-top transition-transform duration-300 ease-in-out hover:scale-110`}
        />
      </div>
    </div>
  );
};

export default ShowImages;
