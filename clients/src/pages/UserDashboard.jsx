import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userPurchaseHistory from "../hooks/user/userPurchaseHistory";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.users);
  const { purchaseHistory } = userPurchaseHistory();
  const [data, setData] = useState(null);

  useEffect(() => {
    const init = async () => {
      const history = await purchaseHistory();
      setData(history);
    };

    init();
  }, []);

  return (
    <DefaultLayout
      title='Dashboard'
      description={`Hello ${user.name}..`}
      className='container-fluid'
    >
      <div className='container mx-auto px-4 mt-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* User Links Section */}
          <div className='bg-white shadow-lg rounded-lg h-64 p-4'>
            <h4 className='text-lg font-semibold bg-purple-500 p-3 rounded-md'>
              User Links
            </h4>
            <ul className='mt-2 space-y-2'>
              <li>
                <Link
                  className='block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md transition'
                  to='/cart'
                >
                  My Cart
                </Link>
              </li>
              <li>
                <Link
                  className='block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md transition'
                  to={`/profile/${user._id}`}
                >
                  Update Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* User Information Section */}
          <div className='bg-white shadow-lg rounded-lg p-4 md:col-span-2'>
            <h3 className='text-lg font-semibold bg-purple-500 p-3 rounded-md'>
              User Information
            </h3>
            <ul className='mt-2 space-y-2'>
              <li className='px-4 py-2 border-b'>
                <strong>Name:</strong> {user.name}
              </li>
              <li className='px-4 py-2 border-b'>
                <strong>Email:</strong> {user.email}
              </li>
              <li className='px-4 py-2'>
                <strong>Role:</strong> {user.role}
              </li>
            </ul>
          </div>

          {/* Purchase History Full-Width in Next Row */}
          <div className='bg-white shadow-lg rounded-lg p-4 md:col-span-3'>
            <h3 className='text-lg font-semibold bg-purple-500 p-3 rounded-md'>
              Purchase History
            </h3>
            <ul className='mt-2 flex'>
              {data && data.length > 0 ? (
                data.map((history, idx) => (
                  <li key={idx} className='px-4 py-2 border-b'>
                    {history.products.map((p, i) => (
                      <div key={i} className='bg-gray-200 rounded-md shadow-sm'>
                        <h6 className='text-gray-800 bg-gray-400 p-2 font-medium'>
                          Product Name: {p.name}
                        </h6>
                        <div className='p-2'>
                          <h6 className='text-gray-600 my-2'>
                            Price: ${p.price}
                          </h6>
                          <h6 className='text-gray-500 text-sm'>
                            Date:{" "}
                            {new Date(history.createdAt).toLocaleDateString()}
                          </h6>
                        </div>
                      </div>
                    ))}
                  </li>
                ))
              ) : (
                <li className='px-4 py-2 text-gray-500'>
                  No purchase history available.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserDashboard;
