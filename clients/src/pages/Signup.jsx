import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import useSignup from "../hooks/auth/useSignup";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <DefaultLayout title='Signup' description=''>
      <div className='container mx-auto px-4'>
        <div className='flex justify-center'>
          <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit}>
              {/* <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>
                Signup
              </h2> */}

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
                  onChange={handleChange}
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
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Signup;
