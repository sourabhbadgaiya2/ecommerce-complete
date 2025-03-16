import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        ); // Replace with your API
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='w-1/5 min-h-screen bg-gray-100 p-4 hidden md:block'>
      <h2 className='text-xl font-semibold mb-4'>Categories</h2>
      <ul className='space-y-2'>
        {categories.map((category, index) => (
          <li key={index}>
            <Link
              to={`/category/${category}`}
              className='block p-2 bg-white rounded-md shadow hover:bg-blue-500 hover:text-white transition'
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
