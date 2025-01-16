import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import getAllProducts from "../hooks/getAllProducts";
import Card from "../components/Card";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const { products } = getAllProducts();

  return (
    <DefaultLayout
      title='Home Page'
      description='Welcome to Ecommerce'
      className='container mx-auto p-6 bg-gray-50'
    >
      <div className=''>
        <h2 className='mb-4'>Best Sellers</h2>
        <div className='flex flex-wrap gap-6 justify-center'>
          {products &&
            products.map((product, idx) => (
              <Card key={idx} product={product} />
            ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
