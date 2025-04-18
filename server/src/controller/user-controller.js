import User from "../models/user.model.js";
import Order from "../models/order.model.js";

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    //  Correct query structure
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }, // Moved `$set` to the correct position
      { new: true, runValidators: true } //  Ensures updated data is returned
    );
    res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
    console.error("Error updating user:", error.message);
    next(error);
  }
};

export const purchaseHistory = async (req, res, next) => {
  try {
    const user = await Order.find({ user: req.user._id })
      .populate("user", "_id name")
      .populate("products", "name price quantity")
      .sort("created");

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field

    if (users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
