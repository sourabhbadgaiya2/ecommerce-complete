import React from "react";
import { Link } from "react-router-dom";
import ShowImages from "./ShowImages";

const Card = ({
  product,
  imgHeight,
  imgAlignment,
  showViewProductBtn = true,
}) => {
  return (
    <div className='mb-3'>
      <div className='w-full max-w-2xl border rounded shadow-lg'>
        <div>
          <div className='bg-gray-200 text-lg font-semibold p-3'>
            {product.name}
          </div>
          <div className={`p-2 ${imgAlignment}`}>
            <ShowImages imgHeight={imgHeight} item={product} />
          </div>
          <div className='p-3'>
            <p className='text-gray-700 font-bold mb-1 text-xl'>
              {product.description}
            </p>
            <p className='text-gray-800 font-semibold text-xl mb-1'>
              ${product.price}
            </p>
            {!showViewProductBtn && (
              <div className=''>
                <p className='text-gray-700 text-lg mb-1'>
                  <strong>Category : {product.category?.name || "N/A"}</strong>
                </p>
                <p className='text-gray-700 text-lg mb-1'>
                  <strong>
                    Added on {new Date(product.createdAt).toLocaleDateString()}
                  </strong>
                </p>
              </div>
            )}
            <div className='flex justify-start font-semibold gap-4 mt-4'>
              {showViewProductBtn && (
                <Link to={`/products/${product._id}`}>
                  <button className='px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition'>
                    View Product
                  </button>
                </Link>
              )}
              <button className='px-4 py-2 border border-orange-700 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition'>
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
