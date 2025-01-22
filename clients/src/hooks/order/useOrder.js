import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import axios from "../../config/axios";
import { handleError } from "../../helpers/errorHandler";

const useOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createOrder = async (createOrderData) => {
      try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/order/create", createOrderData);
      //   return response.data.data
      console.log("response", response);

      toast.success(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { createOrder };
};

export default useOrder;
