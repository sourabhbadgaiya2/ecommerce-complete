import express from "express";
import { authMiddleware, isAdminAuth } from "../middleware/auth-middleware.js";
import {
  //   productById,
  productCreate,
} from "../controller/product-controller.js";

const router = express.Router();

router.post("/product/create", authMiddleware, isAdminAuth, productCreate);

router.get("/product/:id", authMiddleware, productById);

export default router;
