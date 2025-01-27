import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector } from "react-redux";
import useAllOrderList from "../../hooks/admin/useAllOrderList";
import useProduct from "../../hooks/useProduct";

const AllOrder = () => {
  const { data } = useAllOrderList(); // Fetching the orders
  const { user } = useSelector((state) => state.users); // Getting the user info from Redux

  const [selectedOrder, setSelectedOrder] = useState(null); // For modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  return (
    <DefaultLayout
      title='Orders'
      description={`Hello ${
        user?.name || "User"
      }, you can manage all the orders here`}
      className='container mx-auto p-6 bg-gray-50'
    >
      <div className='my-6'>
        <div className='flex flex-col items-center'>
          {data && data.length > 0 ? (
            <div className='w-full'>
              <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
                Total Orders: {data.length}
              </h1>
              <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {data.map((order, idx) => (
                  <div
                    key={order._id || idx}
                    className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6'
                  >
                    <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                      Order #{idx + 1}
                    </h2>
                    <p className='text-sm text-gray-600'>
                      <strong>Transaction ID:</strong>{" "}
                      {order.transaction_id || "Null"}
                    </p>
                    <p className='text-sm text-gray-600'>
                      <strong>Order ID:</strong> {order._id}
                    </p>
                    <p className='text-sm text-gray-600'>
                      <strong>Customer:</strong> {order.user?.name || "Unknown"}
                    </p>
                    <p className='text-sm text-gray-600'>
                      <strong>Total:</strong> ₹{order.amount}
                    </p>
                    <p className='text-sm text-gray-600'>
                      <strong>Items:</strong> {order.products?.length || 0}
                    </p>
                    <p className='text-sm text-gray-500 mt-2'>
                      <strong>Date:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <button
                      className='mt-4 w-full py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors duration-300'
                      onClick={() => openModal(order)}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1 className='text-lg font-semibold text-gray-700'>
              No Orders Found
            </h1>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md'>
            <h2 className='text-xl font-bold text-gray-800 mb-4'>
              Order Details
            </h2>
            <p className='text-sm text-gray-600'>
              <strong>Product ID:</strong> {selectedOrder.products}
            </p>
            <p className='text-sm text-gray-600'>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p className='text-sm text-gray-600'>
              <strong>Customer Name:</strong> {selectedOrder.user?.name}
            </p>
            <p className='text-sm text-gray-600'>
              <strong>Total Amount:</strong> ₹{selectedOrder.amount}
            </p>
            <p className='text-sm text-gray-600'>
              <strong>Number of Items:</strong> {selectedOrder.products?.length}
            </p>
            <p className='text-sm text-gray-600'>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleDateString()}
            </p>
            <div className='mt-4'>
              <button
                className='w-full py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors duration-300'
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default AllOrder;
