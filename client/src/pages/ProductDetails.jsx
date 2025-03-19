import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaTruck,
  FaUndo,
  FaCreditCard,
} from "react-icons/fa";
import useProduct from "../hooks/useProduct";
import ShowImages from "../components/ShowImages";
import getAllProducts from "../hooks/useGetAllProducts"; // Hook to fetch all products
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { product } = useProduct();
  const { products } = getAllProducts(); // Get all products
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  if (refresh) {
    navigate(0);
    setRefresh(false);
  }

  const [cart, setCart] = useState([]);
  const { user } = useSelector((state) => state.users);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const cartItem = cart.find((item) => item._id === product._id);
  const totalAmount = cartItem
    ? cartItem.price * cartItem.quantity
    : product.price * quantity;

  const addToCart = () => {
    const newCart = [...cart, { ...product, quantity }];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    navigate("/cart");
  };

  const removeFromCart = () => {
    const newCart = cart.filter((item) => item._id !== product._id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    updateCartQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCartQuantity(quantity - 1);
    }
  };

  const updateCartQuantity = (newQuantity) => {
    if (cartItem) {
      const updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const buyNow = () => {
    if (user) {
      addToCart();
      navigate("/checkout");
    } else {
      navigate("/signin");
    }
  };

  const relatedProducts = products
    ? products.filter(
        (item) =>
          item.categoryId === product.categoryId && item._id !== product._id
      )
    : [];

  if (!product) {
    return <div className='text-center text-xl mt-10'>Product not found!</div>;
  }

  return (
    <div className='container mx-auto p-6'>
      <button
        onClick={() => navigate(-1)}
        className='mb-4 flex items-center text-blue-500'
      >
        <FaUndo className='mr-2' /> Go Back
      </button>

      <div className='grid md:grid-cols-2 gap-10'>
        <div>
          <ShowImages
            imgClass={"w-[70%] rounded-lg object-contain"}
            item={product}
          />
        </div>

        <div>
          <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
          <p className='text-gray-600 mb-4'>{product.description}</p>
          <h2 className='text-2xl font-semibold text-red-500 mb-4'>
            ${product.price}
          </h2>

          <div className='flex items-center gap-2 mt-2'>
            <span className='text-green-500 px-2 py-1 rounded text-sm'>
              {product.stock > 0 ? "In Stock" : "Out Of Stock"}
            </span>
            <span className='bg-green-100 text-green-700 px-2 py-1 rounded text-sm'>
              Free Delivery
            </span>
          </div>
          {/* Total Price Section */}
          <div className='my-4 text-lg font-semibold'>
            Total Amount:
            <span className='text-red-500'>${totalAmount.toFixed(2)}</span>
          </div>
          <hr />
          <div className='mt-4 flex flex-wrap gap-4'>
            <div className='flex items-center border rounded-lg overflow-hidden'>
              <button
                onClick={decreaseQuantity}
                className='bg-gray-200 cursor-pointer px-3 py-2'
              >
                <FaMinus />
              </button>
              <input
                type='text'
                value={quantity}
                readOnly
                className='w-12 cursor-pointer text-center border-x'
              />
              <button
                onClick={increaseQuantity}
                className='bg-gray-200 cursor-pointer px-3 py-2'
              >
                <FaPlus />
              </button>
            </div>
            {cartItem ? (
              <>
                <button
                  onClick={removeFromCart}
                  className='bg-red-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-red-600 transition'
                >
                  <FaTrash /> Remove from Cart
                </button>
              </>
            ) : (
              <button
                onClick={addToCart}
                className='bg-blue-500 cursor-pointer text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition'
              >
                <FaShoppingCart /> Add to Cart
              </button>
            )}

            <button
              onClick={buyNow}
              className='bg-green-500 cursor-pointer text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-600 transition'
            >
              <FaCreditCard /> Buy Now
            </button>
          </div>

          <div className='border rounded-lg p-4 w-full mt-4 max-w-md'>
            <div className='flex items-center p-3 border-b'>
              <FaTruck className='text-xl mr-3' />
              <div>
                <h3 className='font-semibold'>Free Delivery</h3>
                <p className='text-sm text-gray-600'>
                  <a href='#' className='text-blue-500 underline'>
                    Enter your postal code
                  </a>{" "}
                  for Delivery Availability
                </p>
              </div>
            </div>

            <div className='flex items-center p-3'>
              <FaUndo className='text-xl mr-3' />
              <div>
                <h3 className='font-semibold'>Return Delivery</h3>
                <p className='text-sm text-gray-600'>
                  Free 30 Days Delivery Returns.{" "}
                  <a href='#' className='text-blue-500 underline'>
                    Details
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className='mt-10'>
        <h2 className='text-2xl font-semibold mb-4'>Related Items</h2>
        <div className='grid md:grid-cols-4 gap-6'>
          {relatedProducts.length > 0 ? (
            relatedProducts.map((item) => (
              <div
                key={item._id}
                className='border p-2 rounded-lg overflow-hidden'
              >
                <Link
                  to={`/product-details/${item._id}`}
                  onClick={() => setRefresh(true)}
                  className=' hover:underline mt-2 inline-block'
                >
                  <ShowImages
                    imgClass='h-[25vh] w-full text-center'
                    item={item}
                  />

                  <h3 className='text-lg font-semibold mt-2 text-blue-500'>
                    {item.name}
                  </h3>
                  <p className='text-red-500 font-bold'>${item.price}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaShoppingCart,
//   FaTrash,
//   FaPlus,
//   FaMinus,
//   FaTruck,
//   FaUndo,
//   FaCreditCard,
// } from "react-icons/fa";
// import useProduct from "../hooks/useProduct";
// import ShowImages from "../components/ShowImages";
// import getAllProducts from "../hooks/useGetAllProducts"; // Fetch all products
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import useCart from "../hooks/useCart"; // ✅ Cart Hook

// const ProductDetails = () => {
//   const { product } = useProduct();
//   const { products } = getAllProducts();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.users);

//   const { cart, addToCart, removeFromCart } = useCart(user);
//   const [quantity, setQuantity] = useState(1);

//   const cartItem = cart.find((item) => item.productId === product._id);
//   const totalAmount = cartItem
//     ? cartItem.price * cartItem.quantity
//     : product.price * quantity;

//   const handleAddToCart = () => {
//     addToCart({ ...product, quantity });
//     navigate("/cart");
//   };

//   const handleRemoveFromCart = () => {
//     removeFromCart(product._id);
//   };

//   const handleIncreaseQuantity = () => {
//     setQuantity(quantity + 1);
//   };

//   const handleDecreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleBuyNow = () => {
//     if (user) {
//       handleAddToCart();
//       navigate("/checkout");
//     } else {
//       navigate("/signin");
//     }
//   };

//   const relatedProducts = products?.filter(
//     (item) => item.categoryId === product.categoryId && item._id !== product._id
//   );

//   if (!product) {
//     return <div className='text-center text-xl mt-10'>Product not found!</div>;
//   }

//   return (
//     <div className='container mx-auto p-6'>
//       <button
//         onClick={() => navigate(-1)}
//         className='mb-4 flex items-center text-blue-500'
//       >
//         <FaUndo className='mr-2' /> Go Back
//       </button>

//       <div className='grid md:grid-cols-2 gap-10'>
//         <div>
//           <ShowImages
//             imgClass={"w-[70%] rounded-lg object-contain"}
//             item={product}
//           />
//         </div>

//         <div>
//           <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
//           <p className='text-gray-600 mb-4'>{product.description}</p>
//           <h2 className='text-2xl font-semibold text-red-500 mb-4'>
//             ${product.price}
//           </h2>

//           <div className='flex items-center gap-2 mt-2'>
//             <span className='text-green-500 px-2 py-1 rounded text-sm'>
//               {product.stock > 0 ? "In Stock" : "Out Of Stock"}
//             </span>
//             <span className='bg-green-100 text-green-700 px-2 py-1 rounded text-sm'>
//               Free Delivery
//             </span>
//           </div>

//           {/* Total Price Section */}
//           <div className='my-4 text-lg font-semibold'>
//             Total Amount:
//             <span className='text-red-500'>${totalAmount.toFixed(2)}</span>
//           </div>
//           <hr />

//           <div className='mt-4 flex gap-4'>
//             <div className='flex items-center border rounded-lg overflow-hidden'>
//               <button
//                 onClick={handleDecreaseQuantity}
//                 className='bg-gray-200 px-3 py-2'
//               >
//                 <FaMinus />
//               </button>
//               <input
//                 type='text'
//                 value={quantity}
//                 readOnly
//                 className='w-12 text-center border-x'
//               />
//               <button
//                 onClick={handleIncreaseQuantity}
//                 className='bg-gray-200 px-3 py-2'
//               >
//                 <FaPlus />
//               </button>
//             </div>

//             {cartItem ? (
//               <button
//                 onClick={handleRemoveFromCart}
//                 className='bg-red-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-red-600 transition'
//               >
//                 <FaTrash /> Remove from Cart
//               </button>
//             ) : (
//               <button
//                 onClick={handleAddToCart}
//                 className='bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition'
//               >
//                 <FaShoppingCart /> Add to Cart
//               </button>
//             )}

//             <button
//               onClick={handleBuyNow}
//               className='bg-green-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-600 transition'
//             >
//               <FaCreditCard /> Buy Now
//             </button>
//           </div>

//           <div className='border rounded-lg p-4 w-full mt-4 max-w-md'>
//             <div className='flex items-center p-3 border-b'>
//               <FaTruck className='text-xl mr-3' />
//               <div>
//                 <h3 className='font-semibold'>Free Delivery</h3>
//                 <p className='text-sm text-gray-600'>
//                   <a href='#' className='text-blue-500 underline'>
//                     Enter your postal code
//                   </a>{" "}
//                   for Delivery Availability
//                 </p>
//               </div>
//             </div>

//             <div className='flex items-center p-3'>
//               <FaUndo className='text-xl mr-3' />
//               <div>
//                 <h3 className='font-semibold'>Return Delivery</h3>
//                 <p className='text-sm text-gray-600'>
//                   Free 30 Days Delivery Returns.{" "}
//                   <a href='#' className='text-blue-500 underline'>
//                     Details
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Products */}
//       <div className='mt-10'>
//         <h2 className='text-2xl font-semibold mb-4'>Related Items</h2>
//         <div className='grid md:grid-cols-4 gap-6'>
//           {relatedProducts?.length > 0 ? (
//             relatedProducts.map((item) => (
//               <div
//                 key={item._id}
//                 className='border p-2 rounded-lg overflow-hidden'
//               >
//                 <Link
//                   to={`/product-details/${item._id}`}
//                   className='text-blue-500 hover:underline mt-2 inline-block'
//                 >
//                   <ShowImages
//                     imgClass='h-[25vh] w-full text-center'
//                     item={item}
//                   />
//                   <h3 className='text-lg font-semibold mt-2'>{item.name}</h3>
//                   <p className='text-red-500 font-bold'>${item.price}</p>
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p>No related products found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
