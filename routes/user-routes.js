import express from "express";
import { authMiddleware, isAdminAuth } from "../middleware/auth-middleware.js";
import { getUserById } from "../controller/user-controller.js";

const router = express.Router();

router.get("/getUser", authMiddleware, getUserById);

export default router;
