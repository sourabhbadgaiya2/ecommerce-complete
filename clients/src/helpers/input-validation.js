import toast from "react-hot-toast";

export const handleInputError = (validationType, fields) => {
  const { name, email, password } = fields;

  // Check if all fields are empty
  if (Object.values(fields).every((field) => !field)) {
    toast.error("All fields are required");
    return false;
  }

  // Signup-specific validations
  if (validationType === "signup") {
    if (!name) {
      toast.error("Name is required");
      return false;
    }
  }

  // Common validations (for both signup and signin)
  if (!email) {
    toast.error("Email is required");
    return false;
  }

  if (!password) {
    toast.error("Password is required");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};
