import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} from "../controller/cart-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js"; // Middleware for authentication

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.delete("/remove/:productId", authMiddleware, removeFromCart);
router.put("/update", updateCartItem);

export default router;
