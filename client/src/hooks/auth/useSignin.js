import toast from "react-hot-toast";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleInputError } from "../../helpers/input-validation";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import { handleError } from "../../helpers/errorHandler";

const useSignin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signin = async ({ email, password }) => {
    const success = handleInputError("signin", { email, password });
    if (!success) return;

    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { signin };
};

export default useSignin;
