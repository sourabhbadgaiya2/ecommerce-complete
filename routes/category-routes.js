import express from "express";
import { authMiddleware, isAdminAuth } from "../middleware/auth-middleware.js";
import { create } from "../controller/category-controller.js";

const router = express.Router();

router.post("/category/create", authMiddleware, isAdminAuth, create);

export default router;
