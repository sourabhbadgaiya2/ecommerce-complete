import User from "../models/user.model.js";

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
  }
};
