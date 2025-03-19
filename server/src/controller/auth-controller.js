import config from "../config/env.config.js";
import User from "../models/user.model.js";
import {
  createUser,
  signInUser,
  signOutUser,
} from "../service/auth-service.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendmail } from "../utils/nodemailer.js";

export const userSignup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await createUser({ name, email, password });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const userSignin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Delegate to auth service
    const { user, token } = await signInUser(email, password);

    res.cookie("token", token, {
      expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
      httpOnly: true,
      secure: config.NODE_ENV === "production", // Secure in production
      sameSite: "none", // Protects against CSRF attacks
    });

    res.status(200).json({
      message: "User Logged in successfully",
      user,
      token,
    });
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const userSignout = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "Token not found!" });
    }

    // Delegate token blacklist logic to service
    await signOutUser(token);

    res.clearCookie("token");

    res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const userSendMail = async (req, res, next) => {
  // console.log("email from frontend", req.body.email);

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "User does not exists!" });
    }

    const frontendUrl = config.CLIENT_URL || "http://localhost:5173";

    const url = `${frontendUrl}/api/auth/forget-link/${user._id}`;

    sendmail(req, res, next, url);

    user.resetPasswordToken = "1";
    await user.save();

    res.status(200).json({ user, url });
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const userForgetLink = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("+password");

    console.log(req.body.password, "server password");

    if (!user || !req.body.password) {
      return res
        .status(400)
        .json({ message: "User does not exist or password is missing!" });
    }

    if (user.resetPasswordToken === "1") {
      // Hash the new password
      user.password = await User.hashPassword(req.body.password);

      user.resetPasswordToken = "0";
      await user.save();
    } else {
      return next(
        new ErrorHandler("Invalid Reset Password Link! Please try again", 500)
      );
    }

    res.status(200).json({
      message: "Password has been successfully changed",
    });
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};
