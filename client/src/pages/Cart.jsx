import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash, FaCreditCard } from "react-icons/fa";
import ShowImages from "../components/ShowImages";
import BackButton from "../components/BackButton";
import { useSelector } from "react-redux";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const proceedToCheckout = () => {
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <BackButton />
      <h2 className='text-2xl font-bold mb-4'>Shopping Cart</h2>

      <div className='border rounded-lg shadow p-4 bg-white'>
        {cartItems.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse min-w-[600px]'>
              {/* Table Header */}
              <thead>
                <tr className='bg-gray-200 text-sm sm:text-base'>
                  <th className='border px-3 sm:px-4 py-2'>Image</th>
                  <th className='border px-3 sm:px-4 py-2'>Name</th>
                  <th className='border px-3 sm:px-4 py-2'>Price</th>
                  <th className='border px-3 sm:px-4 py-2'>Quantity</th>
                  <th className='border px-3 sm:px-4 py-2'>Total</th>
                  <th className='border px-3 sm:px-4 py-2'>Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item._id}
                    className='text-center border-b text-sm sm:text-base'
                  >
                    {/* Image */}
                    <td className='border px-3 py-2'>
                      <ShowImages
                        imgClass={"w-12 h-12 sm:w-16 sm:h-16 rounded"}
                        item={item}
                      />
                    </td>

                    {/* Name */}
                    <td className='border px-3 py-2'>{item.name}</td>

                    {/* Price */}
                    <td className='border px-3 py-2'>${item.price}</td>

                    {/* Quantity Controls */}
                    <td className='border px-3 py-2'>
                      <div className='flex items-center justify-center border rounded-lg overflow-hidden'>
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                          className='bg-gray-200 px-2 sm:px-3 py-1 sm:py-2'
                        >
                          <FaMinus />
                        </button>
                        <input
                          type='text'
                          value={item.quantity}
                          readOnly
                          className='w-8 sm:w-12 text-center border-x'
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                          className='bg-gray-200 px-2 sm:px-3 py-1 sm:py-2'
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>

                    {/* Total Price */}
                    <td className='border px-3 py-2'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>

                    {/* Remove Button */}
                    <td className='border px-3 py-2'>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className='text-red-500 text-lg'
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-center text-gray-600 py-4'>Your cart is empty!</p>
        )}
      </div>

      {/* Actions */}
      <div className='flex justify-between items-center mt-6'>
        <Link to='/' className='border px-4 py-2 rounded text-sm sm:text-base'>
          Return To Shop
        </Link>
      </div>

      {/* Cart Total */}
      <div className='place-items-end'>
        {cartItems.length > 0 && (
          <div className='border rounded-lg p-4 mt-6 w-full sm:w-1/3 self-end bg-white'>
            <h3 className='text-lg sm:text-xl font-bold'>Cart Total</h3>
            <p className='text-sm sm:text-base'>
              Subtotal: ${subtotal.toFixed(2)}
            </p>
            <p className='text-sm sm:text-base'>Shipping: Free</p>
            <p className='font-bold text-sm sm:text-base'>
              Total: ${subtotal.toFixed(2)}
            </p>
            <button
              onClick={proceedToCheckout}
              className='bg-green-500 text-white px-4 py-2 rounded mt-4 w-full flex items-center gap-2 justify-center text-sm sm:text-base'
            >
              <FaCreditCard /> Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
