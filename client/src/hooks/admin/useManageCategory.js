import toast from "react-hot-toast";
import axios from "../../config/axios";
import { useDispatch } from "react-redux";
import { handleError } from "../../helpers/errorHandler";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";

const useManageCategory = () => {
  const dispatch = useDispatch();

  const updateCategory = async (categoryId, { name }) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.put(`/api/categories/update/${categoryId}`, {
        name,
      });
      console.log(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  const removeCategory = async (categoryId) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.delete(
        `/api/categories/delete/${categoryId}`
      );
      //   console.log(response.data, "Category Delete");

      return toast.success(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { updateCategory, removeCategory };
};

export default useManageCategory;
