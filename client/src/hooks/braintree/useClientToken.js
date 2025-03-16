import React from "react";
import { handleError } from "../../helpers/errorHandler";
import axiosInstance from "../../config/axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";

const useClientToken = () => {
  const dispatch = useDispatch();

  const getBrainTreeClientToken = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get("/api/braintree/generate_token");
      return response.data.clientToken;
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { getBrainTreeClientToken };
};

export default useClientToken;
