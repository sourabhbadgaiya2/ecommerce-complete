import React from "react";
import toast from "react-hot-toast";
import axios from "../../config/axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";

const addCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createCategory = async (name) => {
    if (!name) {
      toast.error("Fields are required");
      return false;
    }
    dispatch(ShowLoading());

    try {
      const response = await axios.post("/api/categories/create", { name });
      toast.success(response.data.message);
      navigate("/admin-dashboard");
    } catch (error) {
      dispatch(HideLoading());

      toast.error(error.response.data.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { createCategory };
};

export default addCategory;
