import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../config/axios";
import { HideLoading, ShowLoading } from "../store/features/alertSlice";
import { SetUser } from "../store/features/userSlice";

const Protected = ({ children, requiredRole }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    const validateToken = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axios.get("/api/users/get-by-id");

        if (response?.data?.user) {
          dispatch(SetUser(response.data.user));
        } else {
          toast.error(response?.data?.message || "User not found");
          navigate("/signin");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong!");
        navigate("/signin");
      } finally {
        dispatch(HideLoading());
      }
    };

    if (!user) {
      validateToken();
    }
  }, [dispatch, navigate, user]);

  if (!user) return null;

  if (requiredRole && user.role !== requiredRole) {
    navigate(user.role === "user" ? "/unauthorized" : "/signin");
    return null;
  }

  return <>{children}</>;
};

export default Protected;
