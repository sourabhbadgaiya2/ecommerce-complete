import express from "express";

import { authMiddleware, isAdminAuth } from "../middleware/auth-middleware.js";
import { createOrder, allOrderList } from "../controller/order-controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);

router.get("/all-order-list", authMiddleware, isAdminAuth, allOrderList);

export default router;
