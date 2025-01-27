import jwt from "jsonwebtoken";
import redisClient from "../config/redis-client.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
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
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
    console.log(error.message, "middleware");
    
  }
};

export const isAdminAuth = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden! Admin access required." });
  }
  next();
};
