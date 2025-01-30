import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import axios from "../../config/axios";
import { handleError } from "../../helpers/errorHandler";
import { useParams } from "react-router-dom";

const useProfileUpdate = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const updateUser = async ({ name, email }) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.put(`/api/users/update/${userId}`, {
        name,
        email,
      });
      return response.data.user;
      // toast.success(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { updateUser };
};

export default useProfileUpdate;
