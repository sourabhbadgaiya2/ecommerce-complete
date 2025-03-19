import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import axios from "../../config/axios";
import { handleError } from "../../helpers/errorHandler";

const useDeleteUserById = () => {
  const dispatch = useDispatch();

  const deleteUser = async (userId) => {
    console.log(userId, "dfghjk");

    try {
      dispatch(ShowLoading());

      const response = await axios.delete(`/api/users/delete/${userId}`);

      return toast.success(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { deleteUser };
};

export default useDeleteUserById;
