import React, { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from "../store/features/alertSlice";
import { useDispatch } from "react-redux";
import Search from "../components/Search";

const Homes = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  // console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(ShowLoading());
        const response = await fetch("https://fakestoreapi.com/products"); // Replace with actual API
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        dispatch(HideLoading());
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <Search />
      <h2 className='text-2xl font-semibold mb-4'>Latest Products</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.map((product) => (
          <div
            key={product.id}
            className='border rounded-lg p-3 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg'
          >
            <img
              src={product.image}
              alt={product.title}
              className='w-full h-60 object-contain rounded-md'
            />
            <h3 className='font-semibold mt-2 text-lg'>{product.title}</h3>
            <p className='text-gray-600'>₹{product.price}</p>
            <span className='bg-green-100 text-green-700 px-2 py-1 rounded text-sm'>
              Free Delivery
            </span>
            <div className='flex items-center mt-2'>
              <span className='bg-green-500 text-white px-2 rounded-md text-sm'>
                4.0 ★
              </span>
              <p className='text-sm text-gray-500 ml-2'>
                {Math.floor(Math.random() * 1000)} Reviews
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homes;
