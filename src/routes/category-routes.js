import express from "express";
import { authMiddleware, isAdminAuth } from "../middleware/auth-middleware.js";
import {
  create,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategory,
} from "../controller/category-controller.js";

const router = express.Router();

router.post("/categories/create", authMiddleware, isAdminAuth, create);

router.get("/categories", authMiddleware, getAllCategory);

router.get("/categories/:id", authMiddleware, getCategoryById);

router.put("/categories/:id", authMiddleware, isAdminAuth, updateCategory);

router.delete("/categories/:id", authMiddleware, isAdminAuth, deleteCategory);

export default router;
