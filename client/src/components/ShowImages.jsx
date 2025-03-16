import React from "react";
// h-[25vh] w-[100%]

const ShowImages = ({ item, imgClass }) => {
  // console.log(item, "SHow images");

  return (
    <div className='p-1'>
      <img
        src={`${import.meta.env.VITE_API_URL}/api/products/images/${item._id}`}
        alt={item.name}
        className={` ${imgClass} object-contain rounded-lg object-top`}
      />
    </div>
  );
};

export default ShowImages;
