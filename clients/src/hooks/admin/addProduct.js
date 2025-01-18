import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import axios from "../../config/axios";

const addProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createProducts = async (formData) => {
    if (!formData.get("name") || !formData.get("price")) {
      toast.error("Name and price fields are required!");
      return false;
    }
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);
      navigate("/admin-dashboard");
    } catch (error) {
  
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { createProducts };
};

export default addProduct;
