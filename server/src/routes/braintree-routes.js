import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import {
  generateToken,
  processPayment,
} from "../controller/braintree-controller.js";

const router = express.Router();

router.get("/generate_token", authMiddleware, generateToken);

router.post("/payment", authMiddleware, processPayment);

export default router;
