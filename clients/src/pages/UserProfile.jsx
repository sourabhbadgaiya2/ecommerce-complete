import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import useForgetLink from "../hooks/auth/useForgetLink";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useProfileUpdate from "../hooks/user/useProfileUpdate";
import { SetUser } from "../store/features/userSlice";
import { handleError } from "../helpers/errorHandler";
import { HideLoading, ShowLoading } from "../store/features/alertSlice";
import toast from "react-hot-toast";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { updateUser } = useProfileUpdate();
  const { user } = useSelector((state) => state.users);

  const [value, setValue] = useState({
    name: "",
    email: "",
  });

  const { name, email } = value;

  useEffect(() => {
    const init = async () => {
      setValue({ ...value, name: user.name, email: user.email });
    };
    init();
  }, []);

  const handleChange = (name) => (e) => {
    setValue({ ...value, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const updateValue = await updateUser({ name, email });
      SetUser({ ...value, name: updateValue.name, email: updateValue.email });
      navigate("/");
      toast.success("profile updated successfully");
    } catch (error) {
      handleError(error);
      dispatch(HideLoading());
    }
  };

  return (
    <DefaultLayout
      title='Profile'
      description='Update your profile'
      className='mx-auto p-6 bg-gray-50'
    >
      {/* <p>{JSON.stringify(user)}</p> */}

      <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
        Profile update
      </h2>
      <div className='container mx-auto px-4'>
        <div className='flex justify-center'>
          <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-1'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={name}
                  onChange={handleChange("name")}
                  placeholder='Enter your name'
                />
              </div>

              {/* Email Input */}
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={email}
                  onChange={handleChange("email")}
                  placeholder='Enter your email'
                />
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserProfile;
