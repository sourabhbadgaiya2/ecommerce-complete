import React from "react";

const ShowImages = ({ item, imgHeight }) => {
  return (
    <div className=''>
      <div className='overflow-hidden'>
        <img
          src={`${import.meta.env.VITE_API_URL}/api/products/images/${
            item._id
          }`}
          alt={item.name}
          className={` ${imgHeight} w-full object-cover rounded-lg shadow-lg object-top transition-transform duration-300 ease-in-out hover:scale-110`}
        />
      </div>
    </div>
  );
};

export default ShowImages;
