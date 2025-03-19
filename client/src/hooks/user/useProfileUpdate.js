// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
// import axios from "../../config/axios";
// import { handleError } from "../../helpers/errorHandler";

// const useProfileUpdate = () => {
//   const dispatch = useDispatch();

//   const updateUser = async ({ updatedUser }) => {
//     try {
//       dispatch(ShowLoading());

//       // ✅ Correct API Call
//       const response = await axios.put(`/api/users/update`, updatedUser);

//       toast.success(response.data.message || "Profile updated successfully!");

//       return response.data.user;
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
      if (!updatedUser?._id) {
        return toast.error("Invalid user data!");
      }

      dispatch(ShowLoading());

      // ✅ Specific API Call with User ID
      const response = await axios.put(
        `/api/users/update/${updatedUser._id}`,
        updatedUser
      );

      if (response?.data?.user) {
        toast.success(response.data.message || "Profile updated successfully!");
        return response.data.user;
      } else {
        throw new Error("User update failed!");
      }
    } catch (error) {
      handleError(error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      dispatch(HideLoading());
    }
  };

  return { updateUser };
};

export default useProfileUpdate;
