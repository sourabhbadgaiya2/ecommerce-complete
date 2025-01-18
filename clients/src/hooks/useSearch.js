import toast from "react-hot-toast";
import axios from "../config/axios";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../store/features/alertSlice";

const useSearch = () => {
  const dispatch = useDispatch();

  const querySearch = async (params) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("/api/products/search", { params });
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to perform search.");
    } finally {
      dispatch(HideLoading());
    }
  };

  return { querySearch };
};

export default useSearch;
