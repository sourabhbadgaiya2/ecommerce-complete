import React from "react";

const ShowImages = ({ item }) => {
  return (
    <div className=''>
      <div className='overflow-hidden rounded-md shadow-lg'>
        <img
          src={`${import.meta.env.VITE_API_URL}/api/products/images/${
            item._id
          }`}
          alt={item.name}
          className={` h-[35vh] w-[100%] object-contain rounded-lg shadow-lg object-top`}
        />
      </div>
    </div>
  );
};

export default ShowImages;
