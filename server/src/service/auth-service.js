import redisClient from "../config/redis-client.js";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createUser = async ({ name, email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new ErrorHandler("Email already exists");
  }

  // Hash the password
  const hashedPassword = await User.hashPassword(password);

  const newUser = new User({ name, email, password: hashedPassword });
  const savedUser = await newUser.save();

  // Remove password
  savedUser.password = undefined;

  return savedUser;
};

export const signInUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ErrorHandler("Email and password don't match");
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ErrorHandler("Email and password don't match");
  }

  // Generate token
  const token = await user.generateAuthToken();

  return { user, token };
};

export const signOutUser = async (token) => {
  const result = await redisClient.set(`blacklist_${token}`, "true", {
    EX: 3600, // Token will be blacklisted for 1 hour
  });

  if (!result) {
    throw new ErrorHandler("Failed to blacklist the token");
  }

  return true;
};
