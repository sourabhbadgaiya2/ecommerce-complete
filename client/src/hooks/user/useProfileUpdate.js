// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
// import axios from "../../config/axios";
// import { handleError } from "../../helpers/errorHandler";
// import { useParams } from "react-router-dom";

// const useProfileUpdate = () => {
//   const dispatch = useDispatch();
//   // const { userId } = useParams();

//   const updateUser = async ({ userId, updateUser }) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await axios.put(`/api/users/update/${userId}`, {
//         updateUser,
//       });
//       return response.data.user;
//       // toast.success(response.data.message);
//     } catch (error) {
//       handleError(error);
//     } finally {
//       dispatch(HideLoading());
//     }
//   };

//   return { updateUser };
// };

// export default useProfileUpdate;

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import axios from "../../config/axios";
import { handleError } from "../../helpers/errorHandler";

const useProfileUpdate = () => {
  const dispatch = useDispatch();

  const updateUser = async ({ updatedUser }) => {
    try {
      dispatch(ShowLoading());

      // ✅ Correct API Call
      const response = await axios.put(`/api/users/update`, updatedUser);

      toast.success(response.data.message || "Profile updated successfully!");

      return response.data.user;
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return { updateUser };
};

export default useProfileUpdate;
