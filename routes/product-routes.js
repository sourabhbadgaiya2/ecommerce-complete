import express from "express";
import { authMiddleware, isAdminAuth } from "../middleware/auth-middleware.js";
import {
  productById,
  productCreate,
  removeProduct,
  updateProduct,
} from "../controller/product-controller.js";

const router = express.Router();

router.post("/product/create", authMiddleware, isAdminAuth, productCreate);

router.get("/product/:id", authMiddleware, productById);

router.delete("/product/:id", authMiddleware, isAdminAuth, removeProduct);

router.put("/product/:id", authMiddleware, isAdminAuth, updateProduct);

export default router;
