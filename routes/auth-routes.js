import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import {
  userSignin,
  userSignout,
  userSignup,
} from "../controller/auth-controller.js";
import {
  userSigninValidator,
  userSignupValidator,
} from "../middleware/input-validation.js";

const router = express.Router();

router.post("/signup", userSignupValidator, userSignup);

router.post("/signin", userSigninValidator, userSignin);

router.post("/signout", authMiddleware, userSignout);

export default router;
