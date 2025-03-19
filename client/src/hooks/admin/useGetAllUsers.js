import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import axios from "../../config/axios";
import { handleError } from "../../helpers/errorHandler";

const useGetAllUsers = () => {
  const dispatch = useDispatch();

  const getAllUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(`/api/users/get-all-user`);

      // toast.success(response.data.message || "Profile updated successfully!");
      return response.data.users;
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { getAllUsers };
};

export default useGetAllUsers;
