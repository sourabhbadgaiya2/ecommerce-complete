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
  "/create",
  authMiddleware,
  isAdminAuth,
  productsCreate,
  productInputValidator
);

router.get("/categories", authMiddleware, getCategories);

router.get("/product", authMiddleware, getAllProduct);

router.get("/search", authMiddleware, listSearch);

router.get("/images/:id", authMiddleware, showImages);

router.get("/get-by-id/:id", authMiddleware, productsById);

router.delete("/delete/:id", authMiddleware, isAdminAuth, removeProducts);

router.put("/update/:id", authMiddleware, isAdminAuth, updateProducts);

export default router;
