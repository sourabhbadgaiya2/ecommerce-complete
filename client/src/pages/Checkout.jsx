import React, { useState, useEffect, useRef } from "react";
import dropIn from "braintree-web-drop-in";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShowLoading, HideLoading } from "../store/features/alertSlice";
import toast from "react-hot-toast";
import useCart from "../hooks/useCart";
import useClientToken from "../hooks/braintree/useClientToken";
import useProcessPayment from "../hooks/braintree/useProcessPayment";
import useOrder from "../hooks/order/useOrder";

const Checkout = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropinContainerRef = useRef(null);

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState({
    clientToken: null,
    instance: null,
    address: "",
  });
  const [paymentStatus, setPaymentStatus] = useState("");

  const { emptyCart } = useCart();
  const { getBrainTreeClientToken } = useClientToken();
  const { processPayment } = useProcessPayment();
  const { createOrder } = useOrder();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    const totalAmount = storedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);

    const fetchClientToken = async () => {
      const token = await getBrainTreeClientToken();
      setData((prev) => ({ ...prev, clientToken: token }));
    };

    fetchClientToken();
  }, []);

  useEffect(() => {
    if (data.clientToken && dropinContainerRef.current) {
      dropinContainerRef.current.innerHTML = "";
      dropIn.create(
        {
          authorization: data.clientToken,
          container: dropinContainerRef.current,
        },
        (err, instance) => {
          if (!err) setData((prev) => ({ ...prev, instance }));
        }
      );
    }
  }, [data.clientToken]);

  const handleCheckout = async () => {
    if (!data.instance) return;

    try {
      dispatch(ShowLoading());
      const { nonce } = await data.instance.requestPaymentMethod();

      const paymentResponse = await processPayment({
        paymentMethodNonce: nonce,
        amount: total,
      });

      if (paymentResponse.success) {
        toast.success("Payment Successful!");
        setPaymentStatus("Payment Successful!");

        await createOrder({
          products: cartItems,
          transactionId: paymentResponse.data.transactionId,
          amount: paymentResponse.data.amount,
          address: data.address,
        });

        emptyCart(() => navigate("/"));
      } else {
        setPaymentStatus("Payment Failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment Error");
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
      {/* Left: Billing Details */}
      <div>
        <h2 className='text-2xl font-bold mb-4'>Billing Details</h2>

        <div className='mb-3'>
          <label className='block text-gray-600 text-sm font-medium'>
            First Name*
          </label>
          <input
            type='text'
            className=' p-2 w-full bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>

        <div className='mb-3'>
          <label className='block text-gray-600 text-sm font-medium'>
            Company Name
          </label>
          <input type='text' className=' p-2 w-full bg-gray-100 rounded' />
        </div>

        <div className='mb-3'>
          <label className='block text-gray-600 text-sm font-medium'>
            Street Address*
          </label>
          <input type='text' className=' p-2 w-full bg-gray-100 rounded' />
        </div>

        <div className='mb-3'>
          <label className='block text-gray-600 text-sm font-medium'>
            Apartment, floor, etc. (optional)
          </label>
          <input type='text' className=' p-2 w-full bg-gray-100 rounded' />
        </div>

        <div className='mb-3'>
          <label className='block text-gray-600 text-sm font-medium'>
            Town/City*
          </label>
          <input type='text' className=' p-2 w-full bg-gray-100 rounded' />
        </div>

        <div className='mb-3'>
          <label className='block text-gray-600 text-sm font-medium'>
            Phone Number*
          </label>
          <input type='text' className=' p-2 w-full bg-gray-100 rounded' />
        </div>

        <div className='mb-3'>
          <label className='block text-gray-600 text-sm font-medium'>
            Email Address*
          </label>
          <input type='email' className=' p-2 w-full bg-gray-100 rounded' />
        </div>
      </div>

      {/* Right: Order Summary */}
      <div>
        <h2 className='text-2xl font-bold mb-4'>Order Summary</h2>
        {cartItems.map((item, index) => (
          <div key={index} className='flex justify-between items-center mb-2'>
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        ))}
        <div className='border-y py-2'>
          <p>Subtotal: ${total.toFixed(2)}</p>
          <p>Shipping: Free</p>
          <p className='font-bold'>Total: ${total.toFixed(2)}</p>
        </div>

        {paymentStatus && (
          <p className='text-lg font-bold text-green-500'>{paymentStatus}</p>
        )}

        {data.clientToken && cartItems.length > 0 ? (
          <div>
            <div ref={dropinContainerRef} className='my-2'></div>
            <button
              onClick={handleCheckout}
              className='bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600 transition'
            >
              Place Order
            </button>
          </div>
        ) : (
          <p>Loading Payment Options...</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
