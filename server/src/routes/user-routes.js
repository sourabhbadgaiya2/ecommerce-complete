import express from "express";
import { authMiddleware, isAdminAuth } from "../middleware/auth-middleware.js";
import {
  getUserById,
  updateUser,
  purchaseHistory,
  getAllUser,
  deleteUserById,
} from "../controller/user-controller.js";

const router = express.Router();

router.get("/get-by-id", authMiddleware, getUserById);

router.put("/update/:id", authMiddleware, updateUser);

router.get("/orders-by-user", authMiddleware, purchaseHistory);

router.get("/get-all-user", authMiddleware, isAdminAuth, getAllUser);

router.delete("/delete/:id", authMiddleware, isAdminAuth, deleteUserById);

export default router;
