import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import getAllProducts from "../hooks/useGetAllProducts";
import Card from "../components/Card";
import Search from "../components/Search";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const { products } = getAllProducts();

  return (
    <DefaultLayout
      title='Home Page'
      description={`Hello ${user?.name || ""}... Welcome to Ecommerce`}
      className='mx-auto p-4 bg-gray-50'
    >
      <Search />
      <div className='my-2'>
        <div className='flex flex-wrap gap-4'>
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
