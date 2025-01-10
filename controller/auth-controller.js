import redisClient from "../config/redis-client.js";
import User from "../models/user.model.js";

export const userSignup = async (req, res, next) => {
  const { name, email, password } = req.body; // Destructure the request body

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

    // Respond with success
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    // Respond with the error message
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

    // if user is found j sure the email and password match

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Email and password don't match" });
    }
    // generate a signed token with user id and secret
    const token = await user.generateAuthToken();

    // persist the token in cookie with expiry date
    res.cookie("token", token, { expire: new Date() + 9999 });

    // Respond with success
    res.status(200).json({
      message: "User Logged in successfully",
      user: user,
      token,
    });
  } catch (err) {
    // Respond with the error message
    console.log(err.message);
  }
};

export const userSignout = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "Token not found!" });
  }

  try {
    // Token ko blacklist karna (correct syntax)
    await redisClient.set(`blacklist_${token}`, "true", {
      EX: 3600, // Expiry time in seconds (1 hour)
    });

    res.clearCookie("token"); // Token cookie clear karna
    console.log("Token blacklisted successfully!");

    return res.status(200).json({ message: "Logout successful!" });
  } catch (err) {
    console.error("Error during userSignout:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
