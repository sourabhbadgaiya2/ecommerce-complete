import toast from "react-hot-toast";
import axios from "../../config/axios";
import { handleInputError } from "../../helpers/input-validation";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleError } from "../../helpers/errorHandler";

const useSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async ({ name, email, password }) => {
    const success = handleInputError("signup", { name, email, password });
    if (!success) return;

    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      toast.success(response.data.message);
      navigate("/signin");
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { signup };
};

export default useSignup;
