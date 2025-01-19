import { useDispatch } from "react-redux";
import axios from "../config/axios";

import { HideLoading, ShowLoading } from "../store/features/alertSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const useProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  const viewProduct = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(`/api/products/get-by-id/${productId}`);
      //   console.log("product Details", response.data.product);
      setProduct(response.data.product);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    viewProduct();
  }, []);

  return { product };
};

export default useProduct;
