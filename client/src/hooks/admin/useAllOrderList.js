import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import axios from "../../config/axios";
import { handleError } from "../../helpers/errorHandler";
import { useEffect, useState } from "react";

const useAllOrderList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const listOrder = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("/api/order/all-order-list");
      //   console.log(response.data.list);
      return setData(response.data.list);
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    listOrder();
  }, []);

  return { data };
};

export default useAllOrderList;
