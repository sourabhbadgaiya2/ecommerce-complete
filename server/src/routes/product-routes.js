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

router.get("/categories", getCategories);

router.get("/product", getAllProduct);

router.get("/search", listSearch);

router.get("/images/:id", showImages);

router.get("/get-by-id/:id", productsById);

router.delete("/delete/:id", authMiddleware, isAdminAuth, removeProducts);

router.put("/update/:id", authMiddleware, isAdminAuth, updateProducts);

export default router;
