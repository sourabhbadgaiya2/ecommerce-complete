import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import axios from "../../config/axios";
import { handleError } from "../../helpers/errorHandler";

const useUpdateProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();

  // const updateProduct = async (id, formData) => {
  //   console.log(id, formData, "sss");
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await axios.put(`/api/products/update/${id}`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     // console.log(response, "Manage Product");
  //     toast.success(response.data.message);
  //     navigate("/admin/manage-products");
  //   } catch (error) {
  //     handleError(error);
  //   } finally {
  //     dispatch(HideLoading());
  //   }
  // };

  const updateProduct = async (id, formData) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.put(`/api/products/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("✅ API Response:", response.data); // 🛠 Debug API Response

      toast.success(response.data.message);
      navigate("/admin/manage-products");
    } catch (error) {
      console.error("❌ Error in updateProduct:", error);
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  const deleteProduct = async (_id) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.delete(`/api/products/delete/${_id}`);
      // console.log(response.data, "deletes");
      return toast.success(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { updateProduct, deleteProduct };
};

export default useUpdateProduct;
