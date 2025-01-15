import express from "express";
import { authMiddleware, isAdminAuth } from "../middleware/auth-middleware.js";
import {
  getCategories,
  listSearch,
  productsById,
  productsCreate,
  removeProducts,
  updateProducts,
} from "../controller/product-controller.js";
import { productInputValidator } from "../middleware/input-validation.js";

const router = express.Router();

router.post(
  "/products/create",
  authMiddleware,
  isAdminAuth,
  productsCreate,
  productInputValidator
);

router.get("/products/categories", authMiddleware, getCategories);

router.post("/products/by/search", authMiddleware, listSearch)

router.get("/products/:id", authMiddleware, productsById);

router.delete("/products/:id", authMiddleware, isAdminAuth, removeProducts);

router.put("/products/:id", authMiddleware, isAdminAuth, updateProducts);

export default router;
