import express from "express";
import { authMiddleware, isAdminAuth } from "../middleware/auth-middleware.js";
import { productInputValidator } from "../middleware/input-validation.js";

import {
  getAllProduct,
  getCategories,
  listSearch,
  productsById,
  productsCreate,
  removeProducts,
  showImages,
  updateProducts,
} from "../controller/product-controller.js";

const router = express.Router();

router.post(
  "/products/create",
  authMiddleware,
  isAdminAuth,
  productsCreate,
  productInputValidator
);

router.get("/products/categories", authMiddleware, getCategories);

router.get("/products", authMiddleware, getAllProduct);

router.get("/products/search", authMiddleware, listSearch);

router.get("/products/images/:id", authMiddleware, showImages);

router.get("/products/:id", authMiddleware, productsById);

router.delete("/products/:id", authMiddleware, isAdminAuth, removeProducts);

router.put("/products/:id", authMiddleware, isAdminAuth, updateProducts);

export default router;
