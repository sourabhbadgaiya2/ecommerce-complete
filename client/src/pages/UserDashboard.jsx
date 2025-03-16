import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import userPurchaseHistory from "../hooks/user/userPurchaseHistory";
import useProfileUpdate from "../hooks/user/useProfileUpdate";
import { format } from "date-fns";
import { SetUser } from "../store/features/userSlice";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.users);
  const { purchaseHistory } = userPurchaseHistory();
  const { updateUser } = useProfileUpdate();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: user.name,
    email: user.email,
  });

  useEffect(() => {
    const init = async () => {
      const history = await purchaseHistory();
      setData(history);
    };
    init();
  }, []);

  //  Handle Input Change
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  //  Handle Update User
  const handleUpdate = async () => {
    await updateUser({ updatedUser });
    dispatch(SetUser(updatedUser));
    setIsEditing(false);
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-gray-100'>
      {/* Main Content */}
      <main className='flex-1 p-4 md:p-6'>
        <h2 className='text-2xl font-bold mb-4 md:mb-8 text-white bg-green-400 inline-block py-2 px-4 rounded-full'>
          {user.name.slice(0, 1).toUpperCase()}.🧑🏻
        </h2>

        <div className='bg-white shadow-md rounded-lg p-4 overflow-hidden'>
          {/* User Details Table */}
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='p-2 md:p-3 text-left'>User</th>
                  <th className='p-2 md:p-3 text-left'>Email</th>
                  <th className='p-2 md:p-3 text-left'>Role</th>
                  <th className='p-2 md:p-3 text-left'>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-t'>
                  <td className='p-2 md:p-3'>{user.name}</td>
                  <td className='p-2 md:p-3'>{user.email}</td>
                  <td className='p-2 md:p-3 text-green-600'>{user?.role}</td>
                  <td className='p-2 md:p-3'>
                    <span className='flex gap-2 md:gap-4'>
                      <FaEdit
                        className='text-green-500 cursor-pointer text-lg md:text-xl'
                        onClick={() => setIsEditing(true)}
                      />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 🟢 Edit User Form (Visible Only When Editing) */}
          {isEditing && (
            <div className='mt-4 p-4 bg-gray-100 rounded-md'>
              <h3 className='text-lg font-semibold mb-2'>Update Profile</h3>
              <input
                type='text'
                name='name'
                value={updatedUser.name}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mb-2'
                placeholder='Enter Name'
              />
              <input
                type='email'
                name='email'
                value={updatedUser.email}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mb-2'
                placeholder='Enter Email'
              />
              <div className='flex gap-2 mt-3'>
                <button
                  onClick={handleUpdate}
                  className='w-full bg-blue-500 text-white px-4 py-2 rounded-md'
                >
                  Update
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className='w-full bg-red-500 text-white px-4 py-2 rounded-md'
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* 🟢 Purchase History Table */}
          <div className='max-w-4xl mx-auto p-4 md:p-6'>
            <h2 className='text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-green-500 text-white p-3 rounded-md text-center'>
              Purchase History
            </h2>
            <div className='overflow-x-auto'>
              <table className='min-w-full bg-white border border-gray-200 shadow-lg'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='px-2 md:px-4 py-2 text-left'>Order ID</th>
                    <th className='px-2 md:px-4 py-2 text-left'>Products</th>
                    <th className='px-2 md:px-4 py-2 text-left'>Price</th>
                    <th className='px-2 md:px-4 py-2 text-left'>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    data.map((history, idx) => (
                      <tr key={idx} className='border-t'>
                        <td className='px-2 md:px-4 py-2'>{history._id}</td>
                        <td className='px-2 md:px-4 py-2'>
                          {history.products.map((p, i) => (
                            <div key={i} className='text-sm'>
                              {p.name}
                              <Link
                                to={`/product-details/${p._id}`}
                                className='text-blue-500 hover:underline ml-2'
                              >
                                View Product
                              </Link>
                            </div>
                          ))}
                        </td>
                        <td className='px-2 md:px-4 py-2'>
                          $
                          {history.products
                            .reduce((sum, p) => sum + p.price, 0)
                            .toFixed(2)}
                        </td>
                        <td className='px-2 md:px-4 py-2'>
                          {format(new Date(history.createdAt), "dd MMM yyyy")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan='4'
                        className='px-4 py-2 text-gray-500 text-center'
                      >
                        No purchase history available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
