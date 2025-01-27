import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../store/features/alertSlice";
import { handleError } from "../../helpers/errorHandler";
import axiosInstance from "../../config/axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const useForgetLink = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const sendMail = async ({ email }) => {
    try {
      dispatch(ShowLoading());
      if (!email) {
        return toast.error("Email is required");
      }

      const response = await axiosInstance.post("/api/auth/sendmail", {
        email,
      });
      setUrl(response.data.url);
      toast.success("Password reset link sent to your email!");
      navigate("/signin");
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  const forgetLink = async (password) => {
    // console.log(password, "Password");

    try {
      dispatch(ShowLoading());

      await axiosInstance.post(`/api/auth/forget-link/${id}`, { password });

      toast.success("Password reset successfully");
      navigate("/signin");
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { sendMail, forgetLink };
};

export default useForgetLink;
