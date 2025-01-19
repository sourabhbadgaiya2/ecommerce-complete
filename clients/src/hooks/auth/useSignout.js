import axios from "../../config/axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";

const useSignout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signout = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/auth/signout");
      localStorage.removeItem("token");
      navigate("/signin");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { signout };
};

export default useSignout;
