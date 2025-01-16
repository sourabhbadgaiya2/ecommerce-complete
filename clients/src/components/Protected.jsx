import toast from "react-hot-toast";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../store/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SetUser } from "../store/features/userSlice";

const Protected = ({ children, requiredRole }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.users);

  const validateToken = async () => {
    try {
      dispatch(ShowLoading());

      const response = await axios.get("/api/users/get-by-id");

      dispatch(HideLoading());

      if (response?.data?.user) {
        dispatch(SetUser(response.data.user));
      } else {
        localStorage.removeItem("token");
        toast.error(response?.data?.message || "User not found");
        navigate("/signin");
      }
    } catch (error) {
      dispatch(HideLoading());

      localStorage.removeItem("token");
      toast.error(error.response?.data?.message || "Something went wrong!");
      navigate("/signin");
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/signin");
    }
  }, []);

  if (!user) {
    return null;
  }

  if (!user || (requiredRole && user?.role !== requiredRole)) {
    if (user?.role === "user") {
      navigate("/unauthorized");
    } else {
      navigate("/signin");
    }
    return null;
  }

  return <>{children}</>;
};

export default Protected;
