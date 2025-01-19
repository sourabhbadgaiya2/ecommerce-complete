import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector } from "react-redux";
import addCategory from "../../hooks/admin/useAddCategory";

const AddCategory = () => {
  const [name, setName] = useState("");
  const { user } = useSelector((state) => state.users);
  const { createCategory } = addCategory();

  const clickSubmit = async (e) => {
    e.preventDefault();
    await createCategory(name);
  };

  return (
    <DefaultLayout
      title='Add a new Category'
      description={`Hello ${user.name}.. ready to add a new category`}
      className='container mx-auto p-4'
    >
      <div className='flex justify-center items-center'>
        <div className='w-full max-w-lg bg-white shadow-lg rounded-lg p-6'>
          <form onSubmit={clickSubmit} className='space-y-6'>
            {/* Name Input */}
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Name
              </label>
              <input
                type='text'
                name='name'
                className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200'
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddCategory;
