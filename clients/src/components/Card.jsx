import React from "react";
import { Link } from "react-router-dom";
import ShowImages from "./ShowImages";

const Card = ({ product }) => {
  return (
    <div className=' mb-3'>
      <div className='w-full max-w-sm border rounded shadow-lg'>
        <div className=''>
          <div className='bg-gray-200 text-lg font-semibold p-3 text-center'>
            {product.name}
          </div>
          <div className='p-2'>
            <ShowImages item={product} />
          </div>
          <div className='p-4'>
            <p className='text-gray-700 text-center'>{product.description}</p>
            <p className='text-gray-800 font-medium text-center'>
              ${product.price}
            </p>
            <div className='flex justify-center gap-4 mt-4'>
              <Link to='/'>
                <button className='px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition'>
                  View Product
                </button>
              </Link>
              <button className='px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition'>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
