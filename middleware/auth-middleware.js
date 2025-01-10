import jwt from "jsonwebtoken";
import redisClient from "../config/redis-client.js";
import { errorHandler } from "../helpers/ErrorHandler.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; // Token cookies se le rahe hain

  if (!token) {
    return res.status(401).json({ message: "Unauthorized! Token missing." });
  }

  try {
    // Redis blacklist check
    const isBlacklisted = await redisClient.get(`blacklist_${token}`);
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Token blacklisted. Please login again!" });
    }

    // JWT validation
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Decoded data ko request object me attach karna
    // console.log("Authenticated User:", decoded);

    next(); // Successfully authenticated, aage request process karein
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    const errorMessage = errorHandler(err);
    return res
      .status(401)
      .json({ message: "Invalid token or server error!", errorMessage });
  }
};

export const isAdminAuth = (req, res, next) => {
  if (req.user.role === 0) {
    return res
      .status(403)
      .json({ message: "Forbidden! Admin access required." });
  }
  next();
};
