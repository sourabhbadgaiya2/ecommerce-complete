import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBoxes, FaList, FaUserCircle, FaUsers } from "react-icons/fa";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Sidebar */}
      <aside className='w-64 bg-blue-800 text-white p-5 space-y-6'>
        <h2 className='text-2xl font-bold text-center'>Admin Panel</h2>
        <nav className='space-y-3'>
          <Link
            to='/admin/manage-products'
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition'
          >
            <FaBoxes /> Manage Products
          </Link>
          <Link
            to='/admin/manage-category'
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition'
          >
            <FaList /> Manage Category
          </Link>
          <Link
            to='/admin/all-orders'
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition'
          >
            <FaUserCircle /> View All Orders
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-6'>
        <h2 className='text-2xl font-bold mb-4'>Logged-in Users</h2>

        {/* Users List */}
        <div className='bg-white shadow-md rounded-lg p-4'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='p-3 text-left'>User</th>
                <th className='p-3 text-left'>Email</th>
                <th className='p-3 text-left'>Role</th>
                <th className='p-3 text-left'>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy Users */}
              <tr className='border-t'>
                <td className='p-3'>{user.name}</td>
                <td className='p-3'>{user.email}</td>
                <td className='p-3 text-green-600'>{user.role}</td>
                <td className=' p-3'>
                  <span className='flex gap-4'>
                    <FaEdit className='text-green-500 cursor-pointer text-xl' />
                    <FaTrash
                      className='text-red-500 cursor-pointer text-xl'
                      onClick={() => handleDelete(product._id)}
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
