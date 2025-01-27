import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import useForgetLink from "../hooks/auth/useForgetLink";

const EmailPassLink = () => {
  const { forgetLink } = useForgetLink();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgetLink(password);
    setPassword("");
  };

  return (
    <DefaultLayout
      title='Change Your Password'
      description='Node React E-commerce App'
    >
      <div className='mx-auto mt-10 px-4'>
        <div className='flex justify-center'>
          <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-medium mb-1'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your email'
                />
              </div>

              <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition'
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EmailPassLink;
