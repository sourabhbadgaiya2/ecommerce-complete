import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { handleError } from "../../helpers/errorHandler";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import getAllCategory from "../../hooks/useGetAllCategories";
import useUpdateProduct from "../../hooks/admin/useUpdateProduct";

const UpdateProductModal = ({ product, onClose, onUpdate }) => {
  const { updateProduct } = useUpdateProduct();
  const { categoriesData } = getAllCategory();
  const dispatch = useDispatch();

  const [products, setProducts] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    images: null, // 🛠 Fix: Image ko null rakho
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

  // const handleChange = (name) => (e) => {
  //   let value = name === "images" ? e.target.files[0] : e.target.value;

  //   if (name === "category") {
  //     value = String(value).trim();
  //   }

  //   setProducts((prevState) => {
  //     const updatedFormData = new FormData(); // 🛠 Fix: New FormData every time

  //     // ✅ Copy old formData fields
  //     for (let [key, val] of prevState.formData.entries()) {
  //       if (key !== name) updatedFormData.append(key, val);
  //     }

  //     // ✅ Append new field
  //     updatedFormData.append(name, value);

  //     return {
  //       ...prevState,
  //       [name]: value,
  //       formData: updatedFormData,
  //     };
  //   });
  // };

  // const handleChange = (name) => (e) => {
  //   const productValue =
  //     name === "images" && e.target.files ? e.target.files[0] : e.target.value;
  //   // Update the FormData object
  //   formData.set(name, productValue);
  //   // Update state
  //   setProducts({ ...products, [name]: productValue });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log("FormData Entries:", [...products.formData.entries()]); // ✅ Debugging FormData

  //   dispatch(ShowLoading());
  //   try {
  //     await updateProduct(product._id, products.formData);

  //     onUpdate();
  //     onClose();
  //     // await
  //   } catch (error) {
  //     handleError(error);
  //   } finally {
  //     dispatch(HideLoading());
  //   }
  // };

  const handleChange = (name) => (e) => {
    const productValue =
      name === "images" && e.target.files ? e.target.files[0] : e.target.value;

    setProducts((prevState) => {
      const updatedFormData = new FormData();

      // ✅ Copy existing FormData values
      for (let [key, val] of prevState.formData.entries()) {
        if (key !== name) updatedFormData.append(key, val);
      }

      updatedFormData.append(name, productValue); // ✅ Append new value

      return {
        ...prevState,
        [name]: productValue,
        formData: updatedFormData, // ✅ Update FormData in state
      };
    });
  };

  // 🛠 Debug FormData Before Sending
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🛠 Debug FormData Before Sending:");
    for (let pair of products.formData.entries()) {
      console.log(pair[0], pair[1]); // ✅ Should show "images File {}"
    }

    dispatch(ShowLoading());
    try {
      await updateProduct(product._id, products.formData);
      onUpdate();
      onClose();
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Update Product</h2>
          <IoMdClose className='text-2xl cursor-pointer' onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
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
            value={category}
            onChange={handleChange("category")}
          >
            <option value=''>{product.category?.name}</option>
            {categoriesData &&
              categoriesData.map((item, idx) => (
                <option key={idx} value={item._id}>
                  {item.name}
                </option>
              ))}
          </select>
          <input
            type='file'
            name='images'
            accept='image/*'
            className='w-full p-2 border rounded'
            onChange={handleChange("images")}
          />
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
            className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition'
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
