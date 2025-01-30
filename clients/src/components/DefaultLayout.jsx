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
      <div className='p-8 mb-2 jumbotron bg-gray-100 shadow'>
        <h1 className='text-2xl font-bold text-white font-[Castellar] tracking-[4px]'>
          {title}
        </h1>
        <p className='text-lg mt-2 font-[Gilroy-BoldItalic]'>{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default DefaultLayout;
