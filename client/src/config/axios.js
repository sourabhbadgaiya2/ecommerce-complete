import axios from "axios";
// import { persistor } from "../store/store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ✅ Response Interceptor to check token expiry

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       persistor.purge(); // 🧹 Redux Store clear karega
//       window.location.href = "/"; // 🔄 User ko home page pe redirect karega
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
