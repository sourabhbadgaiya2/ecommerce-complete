import redisClient from "../config/redis-client.js";
import User from "../models/user.model.js";

export const userSignup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user with the same email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await User.hashPassword(password);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const userSignin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the same email already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email and password don't match" });
    }

    // if user is found sure the email and password match

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Email and password don't match" });
    }
    // generate token
    const token = await user.generateAuthToken();

    res.cookie("token", token, { expire: new Date() + 9999 });

    res.status(200).json({
      message: "User Logged in successfully",
      user: user,
      token,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const userSignout = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "Token not found!" });
  }

  try {
    // Token ko blacklist karna
    await redisClient.set(`blacklist_${token}`, "true", {
      EX: 3600,
    });

    res.clearCookie("token");
    // console.log("Token blacklisted successfully!");

    return res.status(200).json({ message: "Logout successful!" });
  } catch (err) {
    console.error("Error during userSignout:", err.message);
  }
};
