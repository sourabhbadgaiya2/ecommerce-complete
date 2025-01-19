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

router.post("/create", authMiddleware, isAdminAuth, create);

router.get("/category", authMiddleware, getAllCategory);

router.get("/get-by-id/:id", authMiddleware, getCategoryById);

router.put("/update/:id", authMiddleware, isAdminAuth, updateCategory);

router.delete("/delete/:id", authMiddleware, isAdminAuth, deleteCategory);

export default router;
