import React from "react";
import toast from "react-hot-toast";
import axios from "../../config/axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import { handleError } from "../../helpers/errorHandler";

const addCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createCategory = async (name) => {
    if (!name) {
      toast.error("Fields are required");
      return false;
    }

    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/categories/create", { name });
      toast.success(response.data.message);
      navigate("/admin/manage-category");
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { createCategory };
};

export default addCategory;
