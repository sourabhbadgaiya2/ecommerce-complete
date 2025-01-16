import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";

const addProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createProducts = async (name) => {
    if (!name) {
      toast.error("Fields are required");
      return false;
    }
    dispatch(ShowLoading());

    try {
      const response = await axios.post("/api/products/create", { name });
      toast.success(response.data.message);
      navigate("/admin-dashboard");
    } catch (error) {
      dispatch(HideLoading());

      toast.error(error.response.data.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { createProducts };
};

export default addProduct;
