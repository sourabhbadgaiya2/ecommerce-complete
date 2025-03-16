import React from "react";
import { FaShippingFast, FaHeadphones, FaShieldAlt } from "react-icons/fa";
import { FaShoppingCart, FaUsers, FaChartLine } from "react-icons/fa";
import BackButton from "../components/BackButton";

const AboutUs = () => {
  const stats = [
    {
      id: 1,
      label: "Sales active on site",
      value: "10.5k",
      icon: <FaShoppingCart />,
    },
    {
      id: 2,
      label: "Monthly Product Sale",
      value: "33k",
      icon: <FaChartLine />,
      highlight: true,
    },
    {
      id: 3,
      label: "Customers active on site",
      value: "45.5k",
      icon: <FaUsers />,
    },
    { id: 4, label: "Annual gross sale", value: "25k", icon: <FaUsers /> },
  ];

  const team = [
    {
      name: "Tom Cruise",
      role: "Founder & Chairman",
      image: "/Frame 874.png",
    },
    {
      name: "Emma Watson",
      role: "Managing Director",
      image: "/Frame 875.png",
    },
    {
      name: "Will Smith",
      role: "Product Designer",
      image: "/Frame 876.png",
    },
  ];

  const services = [
    {
      icon: <FaShippingFast className='text-4xl text-white' />,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: <FaHeadphones className='text-4xl text-white' />,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: <FaShieldAlt className='text-4xl text-white' />,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <div className='container mx-auto p-4'>
      <BackButton />
      {/* Our Story Section */}
      <div className='flex flex-col md:flex-row items-center gap-6'>
        <div className='md:w-1/2'>
          <h2 className='text-3xl font-bold'>Our Story</h2>
          <p className='mt-4 text-gray-600'>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className='mt-4 text-gray-600'>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <img
          src='/AboutUs.png'
          alt='Our Story'
          className='w-full md:w-1/2 rounded-lg'
        />
      </div>

      {/* Stats Section */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 my-10'>
        {stats.map(({ id, label, value, icon, highlight }) => (
          <div
            key={id}
            className={`p-4 border rounded-lg flex flex-col items-center gap-2 text-center ${
              highlight ? "bg-red-500 text-white" : ""
            }`}
          >
            <div className='text-2xl'>{icon}</div>
            <h3 className='text-xl font-bold'>{value}</h3>
            <p className='text-sm'>{label}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {team.map(({ name, role, image }) => (
          <div key={name} className='p-4 border rounded-lg text-center'>
            <img
              src={image}
              alt={name}
              className='w-full h-82 object-cover object-top rounded-md'
            />
            <h3 className='text-lg font-semibold mt-2'>{name}</h3>
            <p className='text-sm text-gray-500'>{role}</p>
          </div>
        ))}
      </div>

      {/* Service Section */}
      <div className='flex flex-col md:flex-row justify-center items-center gap-8 py-12'>
        {services.map((service, index) => (
          <div key={index} className='flex flex-col items-center text-center'>
            <div className='bg-black p-6 rounded-full shadow-lg'>
              {service.icon}
            </div>
            <h3 className='text-lg font-bold mt-4'>{service.title}</h3>
            <p className='text-gray-600 text-sm'>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
