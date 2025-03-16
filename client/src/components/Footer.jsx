import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const footerLinks = [
  {
    title: "Account",
    links: ["My Account", "Login / Register", "Cart", "Shop"],
  },
  {
    title: "Quick Link",
    links: ["Privacy Policy", "Terms Of Use", "FAQ", "Contact"],
  },
];

const socialIcons = [
  { icon: <FaFacebookF />, link: "#" },
  { icon: <FaTwitter />, link: "#" },
  { icon: <FaInstagram />, link: "#" },
  { icon: <FaLinkedinIn />, link: "#" },
];

const Footer = () => {
  return (
    <footer className='bg-black text-white pt-10'>
      <div className='grid grid-cols-1 md:grid-cols-5 px-10 gap-8 text-sm'>
        {/* Subscribe Section */}
        <div>
          <h2 className='font-bold text-lg mb-8'>Exclusive</h2>
          <p className='mt-4'>Get 10% off your first order</p>
          <div className='flex mt-3 border border-gray-400 rounded-md overflow-hidden'>
            <input
              type='email'
              placeholder='Enter your email'
              className='p-2 bg-transparent w-full outline-none'
              aria-label='Enter your email'
            />
            <button className='bg-gray-700 px-4' aria-label='Subscribe'>
              &gt;
            </button>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className='font-semibold mb-8'>Support</h3>
          <p className='mt-4'>Bhopal indrapuri C sector, Madhya Pradesh.</p>
          <p className='mt-4'>sourabhbadgaiya@gmail.com</p>
          <p className='mt-4'>+91 7089-3869-76</p>
        </div>

        {/* Dynamic Footer Links */}
        {footerLinks.map((section, index) => (
          <div key={index}>
            <h3 className='font-semibold mb-8'>{section.title}</h3>
            <ul className='mt-2 space-y-4'>
              {section.links.map((link, idx) => (
                <li key={idx} className='hover:underline cursor-pointer'>
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Download App */}
        <div className=''>
          <h3 className='font-semibold mb-8'>Download App</h3>
          <p className='mt-2'>Save $3 with App New User Only</p>
          {/* <div className='flex gap-2 mt-2'>
            <img
              src='/qr-code.png'
              alt='QR Code'
              className='w-16'
              loading='lazy'
            />
            <div className='flex flex-col gap-2'>
              <img
                src='/google-play.png'
                alt='Google Play'
                className='w-24'
                loading='lazy'
              />
              <img
                src='/app-store.png'
                alt='App Store'
                className='w-24'
                loading='lazy'
              />
            </div>
          </div> */}
          {/* Social Icons */}
          <div className='flex gap-4 mt-4 text-lg'>
            {socialIcons.map((item, i) => (
              <a
                key={i}
                href={item.link}
                aria-label='Social Media'
                className='hover:text-gray-400'
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className='text-center text-gray-400 mt-8 py-4 border-t text-sm border-zinc-800 '>
        © Copyright 2025. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
