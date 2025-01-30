import useProduct from "../../hooks/useProduct";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "../../helpers/errorHandler";
import DefaultLayout from "../../components/DefaultLayout";
import getAllCategory from "../../hooks/useGetAllCategories";
import useUpdateProduct from "../../hooks/admin/useUpdateProduct";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";

const UpdatesProducts = () => {
  const { user } = useSelector((state) => state.users);
  const { categoriesData } = getAllCategory();
  const { product } = useProduct(); //! Get product By id
  const { updateProduct } = useUpdateProduct();
  const dispatch = useDispatch();

  const [products, setProducts] = useState({
    name: "",
    price: "",
    description: "",
    categories: [],
    category: "",
    stock: "",
    images: "",
    formData: new FormData(),
  });

  const { name, description, price, categories, category, stock, formData } =
    products;

  useEffect(() => {
    if (product && product._id) {
      setProducts((prev) => ({
        ...prev,
        name: product.name || "",
        description: product.description || "",
        stock: product.stock || "",
        price: product.price || "",
        category: product.category?._id || "",
        formData: new FormData(),
      }));
    }
  }, [product]);

  const handleChange = (name) => (e) => {
    const productValue =
      name === "images" && e.target.files ? e.target.files[0] : e.target.value;
    // Update the FormData object
    formData.set(name, productValue);
    // Update state
    setProducts({ ...products, [name]: productValue });
  };

  const clickSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      await updateProduct(products.formData);
    } catch (error) {
      dispatch(HideLoading());
      handleError(error);
    }
  };

  return (
    <DefaultLayout
      title='Update Product'
      description={`Hello ${user.name}.. ready to Update Product`}
      className='container mx-auto p-4'
    >
      <div className='flex justify-center items-center min-h-screen'>
        {/* {JSON.stringify()} */}
        <div className='w-full max-w-2xl bg-white shadow-lg rounded-lg p-6'>
          <form onSubmit={clickSubmit} className='space-y-6'>
            <h4 className='text-xl font-semibold mb-4'>Update</h4>

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
                value={price}
                onChange={handleChange("price")}
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
                <option value={category}>{product.category?.name}</option>
                {categoriesData &&
                  categoriesData.map((item, idx) => (
                    <option key={idx} value={item._id}>
                      {item.name}
                    </option>
                  ))}
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UpdatesProducts;
