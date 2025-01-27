import React, { useState } from "react";

import DefaultLayout from "../components/DefaultLayout";

import useForgetLink from "../hooks/auth/useForgetLink";
import axiosInstance from "../config/axios";

const ForgotPass = () => {
  const [email, setEmail] = useState("");

  const { sendMail } = useForgetLink();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMail({ email });
    setEmail("");
  };

  return (
    <DefaultLayout
      title='Forgot Your Password'
      description='Node React E-commerce App'
    >
      <div className='mx-auto mt-10 px-4'>
        <div className='flex justify-center'>
          <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-xl font-semibold mb-4'>Request Reset Link</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                />
              </div>

              <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition'
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ForgotPass;
