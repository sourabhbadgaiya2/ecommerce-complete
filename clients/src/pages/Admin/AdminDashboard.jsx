import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.users);

  return (
    <DefaultLayout
      title='Dashboard'
      description={`Hello ${user.name}..`}
      className='container-fluid'
    >
      {/* //! user Link */}
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Admin Links Section */}
          <div className='bg-white shadow-lg rounded-lg p-4'>
            <h4 className='text-lg font-semibold bg-gray-200 p-3 rounded-md'>
              Admin Links
            </h4>
            <ul className='mt-2 space-y-2'>
              <li className='border-b'>
                <Link
                  className='block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md transition'
                  to='/admin/create-category'
                >
                  Create Category
                </Link>
              </li>
              <li className='border-b'>
                <Link
                  className='block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md transition'
                  to='/admin/manage-category'
                >
                  Manage Category
                </Link>
              </li>
              <li className='border-b'>
                <Link
                  className='block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md transition'
                  to='/admin/create-product'
                >
                  Create Product
                </Link>
              </li>
              <li className='border-b'>
                <Link
                  className='block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md transition'
                  to='/admin/update-product'
                >
                  Manage Product
                </Link>
              </li>
              <li className=''>
                <Link
                  className='block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md transition'
                  to='/admin/orders'
                >
                  View Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* User Information Section */}
          <div className='md:col-span-2 bg-white shadow-lg rounded-lg p-4'>
            <h3 className='text-lg font-semibold bg-gray-200 p-3 rounded-md'>
              User Information
            </h3>
            <ul className='mt-2 space-y-2'>
              <li className='px-4 py-2 border-b'>Name: {user.name}</li>
              <li className='px-4 py-2 border-b'>Email: {user.email}</li>
              <li className='px-4 py-2'>Role: {user.role}</li>
            </ul>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AdminDashboard;
