import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import axios from "../../config/axios";
import { useEffect } from "react";
const userPurchaseHistory = () => {
  const dispatch = useDispatch();

  const purchaseHistory = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(`/api/users/orders-by-user`);
      return response.data.user;
      //   toast.success(response.data.message);
    //   console.log(response.data.user, "purchase history");
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    purchaseHistory();
  }, []);
  return { purchaseHistory };
};

export default userPurchaseHistory;
