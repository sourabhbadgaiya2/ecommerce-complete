import express from "express";
import { authMiddleware, isAdminAuth } from "../middleware/auth-middleware.js";
import { getUserById, updateUser } from "../controller/user-controller.js";

const router = express.Router();

router.get("/users/get-by-id", authMiddleware, getUserById);

router.put("/users/:id", authMiddleware, updateUser);

export default router;