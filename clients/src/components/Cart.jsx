import React, { useEffect, useState } from "react";
import useCart from "../hooks/useCart";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const { getCart, removeItem } = useCart();

  useEffect(() => {
    setItems(getCart());
  }, []);

  const handleRemove = (productId) => {
    const updatedCart = removeItem(productId); // Get the updated cart
    setItems(updatedCart); // Update the state with the updated cart
  };

  return (
    <DefaultLayout
      title='Shopping Cart Page'
      description='Manage your cart items, add, remove, checkout or continue shopping'
      className='container mx-auto p-6 bg-gray-50'
    >
      <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
        {items.length > 0 ? (
          <div className='col-span-2 space-y-6'>
            <h2 className='text-2xl font-bold text-gray-700'>
              Your cart has {`${items.length}`} items
            </h2>
            {/* <hr className='my-4 border-gray-300' /> */}
            {items.map((product, i) => (
              <Card
                key={i}
                product={product}
                showAddToCartButton={false}
                cartUpdate={true}
                showRemoveProductButton={true}
                onRemove={() => handleRemove(product._id)}
              />
            ))}
          </div>
        ) : (
          <div className='col-span-3 text-center py-8'>
            <h2 className='text-lg font-medium text-gray-600'>
              Your cart is empty.
            </h2>
            <Link
              to={"/"}
              className='mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600'
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {/* Checkout Section */}
        <div className='bg-white col-span-3 shadow-lg rounded-lg p-6 space-y-4'>
          <Checkout products={items} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Cart;
