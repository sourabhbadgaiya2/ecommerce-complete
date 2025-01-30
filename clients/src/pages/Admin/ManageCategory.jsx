import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import getAllCategory from "../../hooks/useGetAllCategories";
import { Link } from "react-router-dom";
import useManageCategory from "../../hooks/admin/useManageCategory";

const ManageCategory = () => {
  const { categoriesData, fetchCategories, fetchCategoriesById } =
    getAllCategory();
  const { removeCategory, updateCategory } = useManageCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const init = async (_id) => {
    await fetchCategoriesById(_id);
    // Set the category ID and name to the state to populate the modal
    setCategoryId(_id);
    setCategoryName(categoriesData.find((cat) => cat._id === _id)?.name || "");
    setIsModalOpen(true);
  };

  const destroy = async (_id) => {
    await removeCategory(_id);
    await fetchCategories();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateCategory(categoryId, { name: categoryName });
    setIsModalOpen(false);
    fetchCategories(); // Refetch categories after update
  };

  return (
    <DefaultLayout
      title='Manage Category'
      description='Edit categories details or remove outdated listings.'
      className='mx-auto p-4 bg-gray-50'
    >
      <div className='flex flex-col items-center w-full'>
        <div className='w-full max-w-3xl'>
          <h2 className='text-xl text-center font-semibold mb-4'>
            Total Categories: {categoriesData?.length || 0}
          </h2>
          {categoriesData?.length ? (
            <ul className='divide-y divide-gray-200 bg-white shadow-lg rounded-lg'>
              {categoriesData.map((p) => (
                <li
                  key={p._id}
                  className='flex justify-between items-center p-4 hover:bg-gray-100 transition'
                >
                  <strong className='text-lg font-semibold text-gray-800'>
                    {p.name}
                  </strong>

                  <div className='flex space-x-3'>
                    <button
                      onClick={() => init(p._id)}
                      className='bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-md hover:bg-yellow-600 transition'
                    >
                      Update
                    </button>
                    <button
                      onClick={() => destroy(p._id)}
                      className='bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-md hover:bg-red-600 transition'
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-gray-500 text-center mt-4'>
              No categoriesData available.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50'>
          <div className='bg-white p-6 rounded-lg w-96'>
            <h3 className='text-xl font-semibold mb-4'>Update Category</h3>
            <form onSubmit={handleUpdate}>
              <div className='mb-4'>
                <label
                  htmlFor='categoryName'
                  className='block text-sm font-medium text-gray-700'
                >
                  Category Name
                </label>
                <input
                  type='text'
                  id='categoryName'
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500'
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='ml-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600'
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ManageCategory;
