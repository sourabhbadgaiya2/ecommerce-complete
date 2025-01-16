import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";

import axios from "../config/axios";
import { ShowLoading, HideLoading } from "../store/features/alertSlice";

const getAllProducts = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("/api/products");

      setProducts(response.data.products);
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.response.data.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products };
};

export default getAllProducts;
