import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import BackButton from "../components/BackButton";

const ContactForm = () => {
  return (
    <>
      <div className='p-6'>
        <BackButton />
      </div>
      <div className='flex flex-col md:flex-row gap-6 p-6  bg-white shadow-lg rounded-lg'>
        {/* Left Side - Contact Info */}
        <div className='w-full md:w-1/3 p-6 border rounded-lg'>
          <div className='flex items-center gap-3 mb-6'>
            <FaPhoneAlt className='text-green-500 text-xl' />
            <div>
              <h3 className='font-semibold'>Call To Us</h3>
              <p className='text-gray-600'>
                We are available 24/7, 7 days a week.
              </p>
              <p className='font-semibold'>Phone: +380611122222</p>
            </div>
          </div>
          <hr className='my-4' />
          <div className='flex items-center gap-3'>
            <FaEnvelope className='text-green-500 text-xl' />
            <div>
              <h3 className='font-semibold'>Write To Us</h3>
              <p className='text-gray-600'>
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className='font-semibold'>customer@exclusive.com</p>
              <p className='font-semibold'>support@exclusive.com</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className='w-full md:w-2/3 p-6 border rounded-lg'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <input
              type='text'
              placeholder='Your Name *'
              className='p-3 border rounded-md w-full'
            />
            <input
              type='email'
              placeholder='Your Email *'
              className='p-3 border rounded-md w-full'
            />
            <input
              type='text'
              placeholder='Your Phone *'
              className='p-3 border rounded-md w-full'
            />
          </div>
          <textarea
            placeholder='Your Message'
            className='w-full p-3 border rounded-md mt-4 h-32'
          ></textarea>
          <button className='bg-green-500 text-white cursor-pointer py-3 px-6 rounded-md mt-4 hover:bg-green-600 transition-all'>
            Send Message
          </button>
        </div>
      </div>{" "}
    </>
  );
};

export default ContactForm;
