import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShowImages from "./ShowImages";
import useCart from "../hooks/useCart";

const Card = ({
  product,
  cartUpdate = false,
  showAddToCartButton = true,
  showViewProductBtn = true,
  showRemoveProductButton = false,
  onRemove = () => {}, // Default empty function
}) => {
  const [count, setCount] = useState(product.count || 1);
  const { addToCart, updateItem } = useCart(); // hooks
  const navigate = useNavigate();

  const addItems = () => {
    addToCart(product, () => {
      navigate("/cart");
    });
  };

  const handleChange = (productId) => (e) => {
    const value = e.target.value < 1 ? 1 : e.target.value;
    setCount(value);
    if (value >= 1) {
      updateItem(productId, value); // hooks
    }
  };

  return (
    <div className='my-2'>
      <div className='w-full max-w-sm border rounded shadow-lg'>
        <div>
          <div className='bg-gray-200 text-lg font-semibold p-3'>
            {product.name}
          </div>
          <div className='p-2'>
            <ShowImages item={product} />
          </div>
          <div className='p-3'>
            <p className='text-gray-700 font-bold mb-1 text-xl'>
              {product.description}
            </p>
            <p className='text-gray-800 font-semibold text-xl mb-1'>
              ${product.price}
            </p>

            {/* Product Details */}
            {!showViewProductBtn && (
              <div>
                <p className='text-gray-700 text-lg mb-1'>
                  <strong>Category: {product.category?.name || "N/A"}</strong>
                </p>
                <p className='text-gray-700 text-lg mb-1'>
                  <strong>
                    Added on {new Date(product.createdAt).toLocaleDateString()}
                  </strong>
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className='flex justify-start items-center font-semibold gap-4 mt-2'>
              {showViewProductBtn && (
                <Link to={`/products/${product._id}`}>
                  <button
                    className='px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition'
                    title='View Product Details'
                  >
                    View Product
                  </button>
                </Link>
              )}
              {showAddToCartButton && (
                <button
                  onClick={addItems}
                  className='px-4 py-2 border border-orange-700 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition'
                  title='Add to Cart'
                >
                  Add to Cart
                </button>
              )}
              {showRemoveProductButton && (
                <button
                  onClick={() => onRemove(product._id)}
                  className='px-4 py-2 border border-red-700 text-red-500 rounded hover:bg-red-300 hover:text-white transition'
                  title='Remove from Cart'
                >
                  Remove Product
                </button>
              )}
            </div>

            {/* Adjust Quantity */}
            {cartUpdate && (
              <div className='mt-4 flex items-center gap-2'>
                <label className='text-gray-700 font-medium'>
                  Adjust Quantity:
                </label>
                <input
                  type='number'
                  className='w-16 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300'
                  value={count}
                  onChange={handleChange(product._id)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
