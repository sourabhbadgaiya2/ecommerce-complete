import express from "express";

import { authMiddleware, isAdminAuth } from "../middleware/auth-middleware.js";
import { create } from "../controller/order-controller.js";

const router = express.Router();

router.post("/create", authMiddleware, create);

export default router;
