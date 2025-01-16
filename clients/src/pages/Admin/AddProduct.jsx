import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import addProduct from "../../hooks/admin/addProduct";
import DefaultLayout from "../../components/DefaultLayout";

const AddProduct = () => {
  const [products, setProducts] = useState({
    name: "",
    price: "",
    description: "",
    categories: [],
    category: "",
    shipping: "",
    stock: "",
    images: "",
  });

  const { user } = useSelector((state) => state.users);
  const { createProducts } = addProduct();

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    stock,
    formData,
  } = products;

  useEffect(() => {
    setProducts({ ...products, formData: new FormData() });
  }, []);

  const handleChange = (name) => (e) => {
    const productValue =
      name === "images" ? e.target.value.files[0] : e.target.value;
    formData.set(name, productValue);
    setProducts({ ...products, [name]: productValue });
  };

  const clickSubmit = async (e) => {
    e.preventDefault();

    await createProducts(products);
  };

  return (
    <DefaultLayout
      title='Add a new Product'
      description={`Hello ${user.name}.. ready to add a new Product`}
      className='container mx-auto p-4'
    >
      <div className='flex justify-center items-center min-h-screen'>
        <div className='w-full max-w-2xl bg-white shadow-lg rounded-lg p-6'>
          <form onSubmit={clickSubmit} className='space-y-6'>
            <h4 className='text-xl font-semibold mb-4'>Post Images</h4>

            {/* File Input */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Upload Image
              </label>
              <input
                onChange={handleChange("images")}
                type='file'
                name='images'
                accept='image/*'
                className='block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200'
              />
            </div>

            {/* Name Input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Name
              </label>
              <input
                type='text'
                name='name'
                className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                value={name}
                onChange={handleChange("name")}
              />
            </div>

            {/* Description Input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Description
              </label>
              <textarea
                name='description'
                className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                value={description}
                onChange={handleChange("description")}
              />
            </div>

            {/* Price Input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Price
              </label>
              <input
                type='number'
                name='price'
                className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                value={description}
                onChange={handleChange("description")}
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Category
              </label>
              <select
                className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                onChange={handleChange("category")}
              >
                <option value='6785811b49dc2493293c6324'>Node</option>
              </select>
            </div>

            {/* Shipping Dropdown */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Shipping
              </label>
              <select
                className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                onChange={handleChange("shipping")}
              >
                <option value='0'>No</option>
                <option value='1'>Yes</option>
              </select>
            </div>

            {/* Stock Input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Stock
              </label>
              <input
                type='number'
                name='stock'
                className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                value={stock}
                onChange={handleChange("stock")}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200'
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddProduct;
