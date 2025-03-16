import express from "express";
import { authMiddleware, isAdminAuth } from "../middleware/auth-middleware.js";
import {
  getUserById,
  updateUser,
  purchaseHistory,
} from "../controller/user-controller.js";

const router = express.Router();

router.get("/get-by-id", authMiddleware, getUserById);

router.put("/update", authMiddleware, updateUser);

router.get("/orders-by-user", authMiddleware, purchaseHistory);

export default router;
