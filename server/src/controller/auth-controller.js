import {
  createUser,
  signInUser,
  signOutUser,
} from "../service/auth-service.js";

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
