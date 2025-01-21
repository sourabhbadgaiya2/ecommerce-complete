import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import useSignin from "../hooks/auth/useSignin";

import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { signin } = useSignin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(formData);
  };

  return (
    <DefaultLayout
      title='Signin'
      description='Signin to Node React E-commerce App'
    >
      <div className='container mx-auto mt-10 px-4'>
        <div className='flex justify-center'>
          <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit}>
              {/* <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>
                Signin
              </h2> */}

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
                  onChange={handleChange}
                  placeholder='Enter your email'
                />
              </div>

              {/* Password Input */}
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-medium mb-1'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={password}
                  onChange={handleChange}
                  placeholder='Enter your password'
                />
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition'
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Signin;
