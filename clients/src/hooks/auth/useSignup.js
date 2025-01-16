import toast from "react-hot-toast";
import axios from "../../config/axios";
import { handleInputError } from "../../utils/input-validation";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const useSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async ({ name, email, password }) => {
    const success = handleInputError("signup", { name, email, password });
    if (!success) return;

    dispatch(ShowLoading());
    try {
      const response = await axios.post("/api/signup", {
        name,
        email,
        password,
      });

      toast.success(response.data.message);
      navigate("/signin");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { signup };
};

export default useSignup;
