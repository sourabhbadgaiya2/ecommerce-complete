import express from "express";
import { authMiddleware, isAdminAuth } from "../middleware/auth-middleware.js";
import { create } from "../controller/product-controller.js";

const router = express.Router();

router.post("/product/create", authMiddleware, isAdminAuth, create);

export default router;
