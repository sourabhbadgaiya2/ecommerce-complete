import React, { useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import useSignup from "../hooks/auth/useSignup";
import useSignin from "../hooks/auth/useSignin";

const AuthForm = ({ isSignup }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const nodeRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { signup } = useSignup();
  const { signin } = useSignin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      await signup(formData);
    } else {
      await signin(formData);
    }
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={300}
      classNames='fade'
      nodeRef={nodeRef}
    >
      <div className='flex min-h-screen py-6 justify-center bg-gray-100'>
        <div className='bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden'>
          {/* Left Side Image */}
          <div className='w-1/2 hidden bg-[#CBE4E8] md:block'>
            <img
              src='/auth-image.png'
              alt='Shopping'
              className='w-full h-full object-contain'
            />
          </div>

          {/* Right Side Form */}
          <div className='w-full md:w-1/2 p-10 flex flex-col justify-center'>
            <h2 className='text-2xl font-semibold'>
              {isSignup ? "Create an account" : "Sign in to your account"}
            </h2>
            <p className='text-gray-500 text-sm mb-4'>
              {isSignup ? "Enter your details below" : "Enter your credentials"}
            </p>

            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              {isSignup && (
                <input
                  type='text'
                  name='name'
                  placeholder='Name'
                  className='border p-2 rounded-md w-full'
                  value={formData.name}
                  onChange={handleChange}
                />
              )}
              <input
                type='email'
                name='email'
                placeholder='Email or Phone Number'
                className='border p-2 rounded-md w-full'
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                className='border p-2 rounded-md w-full'
                value={formData.password}
                onChange={handleChange}
              />

              <button className='bg-red-500 text-white py-2 rounded-md w-full font-semibold hover:bg-red-600 transition'>
                {isSignup ? "Create Account" : "Sign In"}
              </button>
            </form>

            <div className='mt-4'>
              <button className='flex items-center justify-center gap-2 border p-2 w-full rounded-md hover:bg-gray-100 transition'>
                <FaGoogle className='text-red-500' />
                {isSignup ? "Sign up with Google" : "Sign in with Google"}
              </button>
            </div>

            <p className='text-sm text-center mt-4'>
              {isSignup
                ? "Already have an account? "
                : "Don't have an account? "}
              <Link
                to={isSignup ? "/signin" : "/signup"}
                className='text-blue-500'
              >
                {isSignup ? "Log in" : "Sign up"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default AuthForm;
