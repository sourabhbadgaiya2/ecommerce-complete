import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import getAllCategory from "../../hooks/useGetAllCategories";
import useManageCategory from "../../hooks/admin/useManageCategory";
import addCategory from "../../hooks/admin/useAddCategory";
import BackButton from "../../components/BackButton";

const ManageCategories = () => {
  const { categoriesData, fetchCategories, fetchCategoriesById } =
    getAllCategory();
  const { createCategory } = addCategory();
  const { updateCategory, removeCategory } = useManageCategory();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  // Update Category State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Open Edit Modal & Fetch Data
  const handleEdit = async (id) => {
    await fetchCategoriesById(id);
    const category = categoriesData.find((cat) => cat._id === id);
    setCategoryId(id);
    setCategoryName(category ? category.name : "");
    setIsEditModalOpen(true);
  };

  // Handle Update
  const handleUpdate = async () => {
    await updateCategory(categoryId, { name: categoryName });
    setIsEditModalOpen(false);
    fetchCategories(); // Refresh categories
  };

  // Handle Delete
  const handleDelete = async (id) => {
    await removeCategory(id);
    fetchCategories();
  };

  // Handle Add Category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    await createCategory(name);
    fetchCategories();
    setName("");
    setOpen(false);
  };

  return (
    <div className='p-6 m-8'>
      <BackButton />
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold'>Manage Categories</h2>
        <button
          onClick={() => setOpen(true)}
          className='bg-green-500 text-white px-4 py-2 flex items-center rounded hover:bg-green-600'
        >
          <FaPlus className='mr-2' /> Add Category
        </button>
      </div>

      <table className='w-full border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-300 px-4 py-2'>Category Name</th>
            <th className='border border-gray-300 px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoriesData &&
            categoriesData.map((category) => (
              <tr key={category._id} className='text-center'>
                <td className='border border-gray-300 px-4 py-2'>
                  {category.name}
                </td>
                <td className=' text-xl px-4 py-2 flex justify-center gap-4'>
                  <button
                    onClick={() => handleEdit(category._id)}
                    className='text-blue-500 hover:text-blue-700'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className='text-red-500 text-xl hover:text-red-700'
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Add Category Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            label='Category Name'
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddCategory}
            color='primary'
            variant='contained'
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Category Modal */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            label='Category Name'
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} color='primary' variant='contained'>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageCategories;
