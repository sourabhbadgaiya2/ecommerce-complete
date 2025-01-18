import React from "react";

const ShowImages = ({ item }) => {
  return (
    <div>
      <div className='overflow-hidden rounded-lg shadow-lg bg-white'>
        <img
          src={`${import.meta.env.VITE_API_URL}/api/products/images/${
            item._id
          }`}
          alt={item.name}
          className='h-[30vh] w-full object-cover object-top transition-transform duration-300 ease-in-out hover:scale-110'
        />
      </div>
    </div>
  );
};

export default ShowImages;
