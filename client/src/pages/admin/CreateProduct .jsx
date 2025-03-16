import React, { useState } from "react";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Input change handler
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Product creation failed!");
      const data = await res.json();
      setMessage("✅ Product Created Successfully!");
      setProduct({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (error) {
      setMessage("❌ Failed to create product. Try again!");
    }

    setLoading(false);
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl'>
      <h2 className='text-2xl font-bold text-center text-gray-800 mb-4'>
        Create New Product
      </h2>
      {message && (
        <p className='text-center mb-3 font-semibold text-green-600'>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='title'
          value={product.title}
          onChange={handleChange}
          placeholder='Product Title'
          className='w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300'
          required
        />
        <textarea
          name='description'
          value={product.description}
          onChange={handleChange}
          placeholder='Product Description'
          className='w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300'
          required
        ></textarea>
        <input
          type='number'
          name='price'
          value={product.price}
          onChange={handleChange}
          placeholder='Price'
          className='w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300'
          required
        />
        <input
          type='text'
          name='category'
          value={product.category}
          onChange={handleChange}
          placeholder='Category'
          className='w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300'
          required
        />
        <input
          type='text'
          name='image'
          value={product.image}
          onChange={handleChange}
          placeholder='Image URL'
          className='w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300'
          required
        />
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300'
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
