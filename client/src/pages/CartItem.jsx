import React from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import ShowImages from "../components/ShowImages";

const CartItem = ({ item, updateCartItem, removeFromCart }) => {
  return (
    <div className='flex items-center justify-between border-b py-4'>
      <ShowImages imgClass={"w-16 h-16 rounded"} item={item} />
      <p>{item.name}</p>
      <p>${item.price}</p>

      <div className='flex items-center'>
        <button
          onClick={() => updateCartItem(item.productId, item.quantity - 1)}
          className='bg-gray-200 px-3 py-2'
        >
          <FaMinus />
        </button>
        <input
          type='text'
          value={item.quantity}
          readOnly
          className='w-12 text-center border-x'
        />
        <button
          onClick={() => updateCartItem(item.productId, item.quantity + 1)}
          className='bg-gray-200 px-3 py-2'
        >
          <FaPlus />
        </button>
      </div>

      <p>${(item.price * item.quantity).toFixed(2)}</p>
      <button
        onClick={() => removeFromCart(item.productId)}
        className='text-red-500 text-lg'
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
