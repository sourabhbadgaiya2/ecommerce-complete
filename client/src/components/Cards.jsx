import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import ShowImages from "./ShowImages";
import getAllProducts from "../hooks/useGetAllProducts";
import { Link } from "react-router-dom";

const Cards = () => {
  const { products, fetchProducts } = getAllProducts();
  // const [products, setProducts] = useState([]);
  // console.log(products);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("https://fakestoreapi.com/products"); // Replace with actual API
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div className='flex'>
      {/* Products Grid */}
      <div className='w-4/5 p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Latest Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products &&
            products.map(
              (product) => (
                console.log(),
                (
                  <Link
                    key={product._id}
                    to={`/product-details/${product._id}`}
                  >
                    <div className='border rounded-lg p-3 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg'>
                      {/* ----------- */}
                      <ShowImages imgClass='h-[25vh] w-[100%]' item={product} />
                      <h3 className='font-semibold mt-2 text-lg'>
                        {product.name}
                      </h3>
                      <p className='text-gray-600'>₹{product.price}</p>
                      <div className='flex items-center gap-2 mt-2'>
                        <span className='bg-green-500 text-white px-2 py-1 rounded text-sm'>
                          {product.stock > 0 ? "In Stock" : "Out Of Stock"}
                        </span>
                        <span className='bg-green-100 text-green-700 px-2 py-1 rounded text-sm'>
                          Free Delivery
                        </span>
                      </div>

                      <div className='flex items-center mt-2'>
                        <span className='bg-green-500 text-white px-2 rounded-md text-sm'>
                          4.0 ★
                        </span>
                        <p className='text-sm text-gray-500 ml-2'>
                          {Math.floor(Math.random() * 1000)} Reviews
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              )
            )}
        </div>
      </div>
    </div>
  );
};
export default Cards;
