import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUserById } from "../controller/user.controller.js";

const router = express.Router();

router.get("/getUser", authMiddleware, getUserById);

export default router;
