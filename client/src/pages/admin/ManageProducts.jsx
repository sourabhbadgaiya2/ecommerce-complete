import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal"; // ✅ Import Update Modal
import ShowImages from "../../components/ShowImages";
import getAllProducts from "../../hooks/useGetAllProducts";
import useUpdateProduct from "../../hooks/admin/useUpdateProduct";
import BackButton from "../../components/BackButton";

const ManageProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // ✅ Fetch Products
  const { products, fetchProducts } = getAllProducts();
  const { deleteProduct } = useUpdateProduct();

  // ✅ Delete Product
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      await fetchProducts(); // Refresh products after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // ✅ Open Update Modal with Selected Product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className='max-w-4xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg'>
      <BackButton />
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>Manage Products</h2>
        <button
          onClick={() => setShowModal(true)}
          className='bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2'
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* Product List */}
      {products?.length ? (
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border p-2'>Image</th>
              <th className='border p-2'>Name</th>
              <th className='border p-2'>Price</th>
              <th className='border p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className='text-center'>
                <td className='border p-2'>
                  <ShowImages
                    imgClass='w-8 mx-auto rounded-xl'
                    item={product}
                  />
                </td>
                <td className='border p-2'>{product.name}</td>
                <td className='border p-2'>${product.price}</td>
                <td className='border p-2'>
                  <span className='flex justify-center gap-4'>
                    <FaEdit
                      className='text-green-500 cursor-pointer text-xl'
                      onClick={() => handleEdit(product)} // ✅ Open Update Modal
                    />
                    <FaTrash
                      className='text-red-500 cursor-pointer text-xl'
                      onClick={() => handleDelete(product._id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No product Yet"
      )}

      {/* ✅ Add Product Modal */}
      {showModal && <AddProductModal onClose={() => setShowModal(false)} />}

      {/* ✅ Update Product Modal */}
      {isUpdateModalOpen && selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={fetchProducts} // ✅ Refresh Products after Update
        />
      )}
    </div>
  );
};

export default ManageProducts;
