import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import axios from "../config/axios";
import { ShowLoading, HideLoading } from "../store/features/alertSlice";
import { handleError } from "../helpers/errorHandler";

const getAllProducts = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("/api/products/product");

      setProducts(response.data.products);
    } catch (error) {
      handleError(error);
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
