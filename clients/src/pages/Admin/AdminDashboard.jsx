import { Link } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.users);

  return (
    <DefaultLayout
      title='Dashboard'
      description={`Hello ${user.name}..`}
      className='container-fluid'
    >
      {/* //! user Link */}
      <div className='row'>
        <div className='col-3'>
          <div className='card '>
            <h4 className='card-header'>Admin Links</h4>
            <ul className='list-group '>
              <li className='list-group-item text-primary'>
                <Link className='nav-link' to='/admin/create-category'>
                  Create Category
                </Link>
              </li>
              <li className='list-group-item text-primary'>
                <Link className='nav-link' to='/admin/create-product'>
                  Create Product
                </Link>
              </li>
              <li className='list-group-item text-primary'>
                <Link className='nav-link' to='/admin/orders'>
                  View Orders
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='col-9'>
          {/* //! user Info */}
          <div className='card mb-5'>
            <h3 className='card-header'>User Information</h3>
            <ul className='list-group'>
              <li className='list-group-item'>Name: {user.name}</li>
              <li className='list-group-item'>Email: {user.email}</li>
              <li className='list-group-item'>role: {user.role}</li>
            </ul>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AdminDashboard;
