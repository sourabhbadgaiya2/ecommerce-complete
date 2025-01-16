import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.users);

  return (
    <DefaultLayout
      title='Home Page'
      description='Ecommerce'
      className='container mx-auto p-6 bg-gray-50'
    >
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>
          Welcome to Ecommerce
        </h1>
        <p className='text-lg text-gray-600'>
          Discover the best products and deals tailored just for you!
        </p>
      </div>
    </DefaultLayout>
  );
};

export default Home;
