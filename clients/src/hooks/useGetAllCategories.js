import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import axios from "../config/axios";
import { ShowLoading, HideLoading } from "../store/features/alertSlice";
import { handleError } from "../helpers/errorHandler";

const getAllCategory = () => {
  const dispatch = useDispatch();

  const [categoriesData, setCategoriesData] = useState(null);

  const fetchCategories = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("/api/categories/category");
      setCategoriesData(response.data.categories);
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categoriesData };
};

export default getAllCategory;
