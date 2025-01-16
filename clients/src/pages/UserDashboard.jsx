import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.users);
  // console.log("ud", user);

  return (
    <DefaultLayout
      title='Dashboard'
      description={`Hello ${user.name}..`}
      className='container-fluid'
    >
      <div className='row mt-4'>
        {/* User Links */}
        <div className='col-3'>
          <div className='card'>
            <h4 className='card-header'>User Links</h4>
            <ul className='list-group'>
              <li className='list-group-item'>
                <Link className='nav-link text-primary' to='/cart'>
                  My Cart
                </Link>
              </li>
              <li className='list-group-item'>
                <Link className='nav-link text-primary' to='#'>
                  Update Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* User Info & Purchase History */}
        <div className='col-9'>
          {/* User Information */}
          <div className='card mb-4'>
            <h3 className='card-header'>User Information</h3>
            <ul className='list-group'>
              <li className='list-group-item'>
                <strong>Name:</strong> {user.name}
              </li>
              <li className='list-group-item'>
                <strong>Email:</strong> {user.email}
              </li>
              <li className='list-group-item'>
                <strong>Role:</strong> {user.role}
              </li>
            </ul>
          </div>

          {/* Purchase History */}
          <div className='card'>
            <h3 className='card-header'>Purchase History</h3>
            <ul className='list-group'>
              <li className='list-group-item'>History</li>
            </ul>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserDashboard;
