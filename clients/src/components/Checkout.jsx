import React, { useState, useEffect } from "react";
import DefaultLayout from "./DefaultLayout";
import { useSelector } from "react-redux";

const Checkout = ({ products = [] }) => {
  const { user } = useSelector((state) => state.users);
  const [total, setTotal] = useState(0); // State to store the total amount

  // Function to calculate the total
  const calculateTotal = () => {
    const totalAmount = products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
    setTotal(totalAmount); // Update the state
  };

  // Use useEffect to re-calculate total when products array changes
  useEffect(() => {
    calculateTotal();
  }, [products]);

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-xl font-semibold text-gray-700'>Order Summary</h3>
      <h2 className='text-gray-600'>Total ${total.toFixed(2)}</h2>
      <button className='max-w-[30vw] px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition'>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Checkout;
