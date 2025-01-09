import User from "../models/user.models.js";
import { errorHandler } from "../helpers/ErrorHandler.js";

export const getUserById = async (req, res, next) => {
  res.json("hello");
  // try {
  //   const user = await User.findById(id); // Find user by id
  //   if (!user) {
  //     return res.status(400).json({ error: "User not found" });
  //   }
  // } catch (err) {
  //   const errorMessage = errorHandler(err);
  //   res.status(400).json({ error: errorMessage });
  // }
};
