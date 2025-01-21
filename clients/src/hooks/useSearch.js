import axios from "../config/axios";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../store/features/alertSlice";
import { handleError } from "../helpers/errorHandler";

const useSearch = () => {
  const dispatch = useDispatch();

  const querySearch = async (params) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("/api/products/search", { params });
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { querySearch };
};

export default useSearch;
