import dropIn from "braintree-web-drop-in";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";

import useCart from "../hooks/useCart";
import { handleError } from "../helpers/errorHandler";
import useClientToken from "../hooks/braintree/useClientToken";
import useProcessPayment from "../hooks/braintree/useProcessPayment";
import { HideLoading, ShowLoading } from "../store/features/alertSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useOrder from "../hooks/order/useOrder";

const Checkout = ({ products = [] }) => {
  const { user } = useSelector((state) => state.users);
  const dropinContainerRef = useRef(null); // Reference to the drop-in container

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [total, setTotal] = useState(0); // State to store the total amount
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    instance: null,
    address: "",
  });
  const [paymentStatus, setPaymentStatus] = useState(""); // State for payment success message

  const { emptyCart } = useCart();
  const { processPayment } = useProcessPayment();
  const { getBrainTreeClientToken } = useClientToken();
  const { createOrder } = useOrder();

  useEffect(() => {
    const initializeBraintree = async () => {
      const token = await getBrainTreeClientToken();
      setData((prevData) => ({ ...prevData, clientToken: token }));
    };

    initializeBraintree();
  }, []);

  // Function to calculate the total
  const calculateTotal = () => {
    const totalAmount = products.reduce(
      (currentValue, nextValue) =>
        currentValue + nextValue.count * nextValue.price,
      0
    );
    setTotal(totalAmount); // Update the state
  };

  useEffect(() => {
    calculateTotal();
  }, [products]);

  useEffect(() => {
    if (data.clientToken && dropinContainerRef.current) {
      // Ensure the container is empty before creating the Drop-In instance
      dropinContainerRef.current.innerHTML = "";

      dropIn.create(
        {
          authorization: data.clientToken,
          container: dropinContainerRef.current, // Reference to the DOM node
        },
        (err, instance) => {
          if (err) {
            console.error("Braintree Drop-In Error:", err);
            return;
          }
          setData((prevData) => ({ ...prevData, instance })); // Store instance
        }
      );
    }
    return () => {
      // Cleanup drop-in instance on component unmount
      if (data.instance) {
        data.instance.teardown(() => {
          setData((prevData) => ({ ...prevData, instance: null }));
        });
      }
    };
  }, [data.clientToken]);

  const handleCheckout = async () => {
  
    if (data.instance) {
      try {
        dispatch(ShowLoading());
        const { nonce } = await data.instance.requestPaymentMethod();
        // console.log("Payment nonce:", nonce);

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: total,
        };

        // Process payment
        const paymentResponse = await processPayment(paymentData);
        // console.log("Payment response:", paymentResponse);

        // Check if the payment is successful
        if (paymentResponse.success) {
          setPaymentStatus("Payment Successful! Thank you for your purchase.");
          toast.success("Payment Successful! Thank you for your purchase.");

          //empty cart
          // order
          const createOrderData = {
            products: products,
            transactionId: paymentResponse.data.transactionId,
            amount: paymentResponse.data.amount,
            address: data.address,
          };

          await createOrder(createOrderData);

          emptyCart(() => {
            // console.log("Cart emptied successfully");
            navigate("/");
          });
        } else {
          setPaymentStatus("Payment failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        setPaymentStatus("An error occurred. Please try again.");
        handleError(error);
      } finally {
        dispatch(HideLoading());
      }
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl font-semibold text-gray-700'>Order Summary</h3>
      <h2 className='text-gray-600'>Total: ${total.toFixed(2)}</h2>

      <h2 className='text-gray-600'>Delivery Address</h2>
      <textarea
        placeholder='Type here...'
        name='address'
        value={data.address}
        onChange={(e) =>
          setData((prevData) => ({ ...prevData, address: e.target.value }))
        }
        className='border min-h-[15vh] p-2'
      ></textarea>
      {/* Show Payment Status */}
      {paymentStatus && (
        <div
          className={`text-lg font-semibold ${
            paymentStatus.includes("Successful")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {paymentStatus}
        </div>
      )}

      {/* DropIn Payment UI */}
      {data.clientToken && products.length > 0 ? (
        <div>
          <div
            id='dropin-container'
            ref={dropinContainerRef}
            className='my-2'
          ></div>
          <button
            onClick={handleCheckout}
            className='px-4 py-2 w-[25vw] bg-green-500 text-white rounded-lg hover:bg-green-600 transition'
          >
            Pay
          </button>
        </div>
      ) : (
        <p>Loading payment options...</p>
      )}
    </div>
  );
};

export default Checkout;
