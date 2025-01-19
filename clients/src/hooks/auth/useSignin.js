import toast from "react-hot-toast";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleInputError } from "../../utils/input-validation";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";

import { useSelector } from "react-redux";

const useSignin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signin = async ({ email, password }) => {
    const success = handleInputError("signin", { email, password });
    if (!success) return;

    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/auth/signin", { email, password });

      //   !localstorage
      localStorage.setItem("token", response.data.token);

      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { signin };
};

export default useSignin;
