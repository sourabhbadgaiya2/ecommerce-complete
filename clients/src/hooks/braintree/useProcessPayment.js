import React from "react";
import { handleError } from "../../helpers/errorHandler";
import axiosInstance from "../../config/axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";

const useProcessPayment = () => {
  const dispatch = useDispatch();

  const processPayment = async (paymentData) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/braintree/payment",
        paymentData
      );

      // Log the response to verify the structure
      console.log("Backend response:", response);

      if (response.data.success) {
        return {
          success: true,
          message: "Payment processed successfully",
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Payment failed",
        };
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      return {
        success: false,
        message: error.message || "An error occurred while processing payment",
      };
    } finally {
      dispatch(HideLoading());
    }
  };

  return { processPayment };
};

export default useProcessPayment;
