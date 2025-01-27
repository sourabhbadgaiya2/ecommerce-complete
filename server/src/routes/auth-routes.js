import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import {
  userForgetLink,
  userSendMail,
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

router.post("/sendmail", userSendMail);

router.post("/forget-link/:id", userForgetLink);

export default router;
