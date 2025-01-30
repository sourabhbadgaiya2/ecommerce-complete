import { Link } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import getAllProducts from "../../hooks/useGetAllProducts";
import useUpdateProduct from "../../hooks/admin/useUpdateProduct";

const UpdateProduct = () => {
  const { products, fetchProducts } = getAllProducts();
  const { deleteProduct } = useUpdateProduct();

  const destroy = async (_id) => {
    await deleteProduct(_id);
    await fetchProducts();
  };

  return (
    <DefaultLayout
      title='Update Products'
      description='Edit product details or remove outdated listings.'
      className='mx-auto p-6 bg-gray-50'
    >
      <div className='flex flex-col items-center w-full'>
        <div className='w-full max-w-3xl'>
          <h2 className='text-xl text-center font-semibold mb-4'>
            Total Products: {products?.length || 0}
          </h2>
          {products?.length ? (
            <ul className='divide-y divide-gray-200 bg-white shadow-lg rounded-lg'>
              {products.map((p) => (
                <li
                  key={p._id}
                  className='flex justify-between items-center p-4 hover:bg-gray-100 transition'
                >
                  <strong className='text-lg font-semibold text-gray-800'>
                    {p.name}
                  </strong>
                  <div className='flex space-x-3'>
                    <Link
                      to={`/admin/product/update/${p._id}`}
                      className='bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-md hover:bg-yellow-600 transition'
                    >
                      Update
                    </Link>
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
              No products available.
            </p>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UpdateProduct;
