import toast from "react-hot-toast";

export const handleError = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again!";

  toast.error(message);

  console.error("Logged Error:", error.message);
};
