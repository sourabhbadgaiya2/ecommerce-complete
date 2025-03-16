import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import useAllOrderList from "../../hooks/admin/useAllOrderList";

const AllOrders = () => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const { data } = useAllOrderList();

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>All Orders</h2>

      {data.length > 0 && (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-200'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-4 py-2 text-left'>Order ID</th>
                <th className='px-4 py-2 text-left'>Products</th>
                <th className='px-4 py-2 text-left'>Amount</th>
                {/* <th className='px-4 py-2 text-left'>Status</th> */}
                <th className='px-4 py-2 text-left'>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id} className='border-t'>
                  <td className='px-4 py-2'>{order._id}</td>
                  <td className='px-4 py-2'>
                    {order.products.map((p) => (
                      <div key={p._id} className='text-sm'>
                        {p.name}
                      </div>
                    ))}
                  </td>
                  <td className='px-4 py-2'>${order.amount.toFixed(2)}</td>
                  {/* <td className='px-4 py-2'>
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        order.status === "Delivered"
                          ? "bg-green-200"
                          : "bg-yellow-200"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td> */}
                  <td className='px-4 py-2'>
                    {format(new Date(order.createdAt), "dd MMM yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
