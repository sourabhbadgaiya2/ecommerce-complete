import React from "react";
import Menu from "./Menu";

const DefaultLayout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className='p-8 mb-2 bg-gray-100 shadow'>
        <h1 className='text-2xl font-bold text-blue-600'>{title}</h1>
        <p className='text-lg text-gray-600 mt-2'>{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default DefaultLayout;
