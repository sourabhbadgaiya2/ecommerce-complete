import React, { useEffect, useState } from "react";

import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import addProduct from "../../hooks/admin/useAddProduct";
import getAllCategory from "../../hooks/useGetAllCategories";
import { handleError } from "../../helpers/errorHandler";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";

const AddProductModal = ({ onClose }) => {
  const [products, setProducts] = useState({
    name: "",
    price: "",
    description: "",
    categories: [],
    category: "",
    // shipping: "",
    stock: "",
    images: "",
    formData: new FormData(),
  });

  const { createProducts } = addProduct();
  const { categoriesData } = getAllCategory();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Handle Input Change
  const handleChange = (name) => (e) => {
    const productValue =
      name === "images" && e.target.files ? e.target.files[0] : e.target.value;
    // Update the FormData object
    formData.set(name, productValue);
    // Update state
    setProducts({ ...products, [name]: productValue });
  };

  const { name, description, price, categories, category, stock, formData } =
    products;
  // ✅ Submit New Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(ShowLoading());
    try {
      await createProducts(products.formData);
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <div className='fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Add Product</h2>
          <IoMdClose className='text-2xl cursor-pointer' onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Upload Image
          </label>
          <input
            onChange={handleChange("images")}
            type='file'
            name='images'
            accept='image/*'
            className='w-full p-2 border rounded'
          />
          <input
            type='text'
            name='name'
            value={name}
            onChange={handleChange("name")}
            placeholder='Product Title'
            className='w-full p-2 border rounded'
            required
          />
          <textarea
            name='description'
            value={description}
            onChange={handleChange("description")}
            placeholder='Product Description'
            className='w-full p-2 border rounded'
            required
          ></textarea>
          <input
            type='number'
            name='price'
            value={price}
            onChange={handleChange("price")}
            placeholder='Price'
            className='w-full p-2 border rounded'
            required
          />
          <select
            className='w-full p-2 border rounded'
            onChange={handleChange("category")}
          >
            <option value=''>Select</option>
            {categoriesData &&
              categoriesData.map((item, idx) => (
                <option key={idx} value={item._id}>
                  {item.name}
                </option>
              ))}
          </select>

          <input
            type='number'
            name='stock'
            value={stock}
            onChange={handleChange("stock")}
            placeholder='stock'
            className='w-full p-2 border rounded'
            required
          />

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
