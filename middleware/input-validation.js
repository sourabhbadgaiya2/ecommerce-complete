import { validationResult, check } from "express-validator";

export const userSignupValidator = [
  check("name", "Name is required").notEmpty(),

  // Email validation
  check("email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ min: 4, max: 32 })
    .withMessage("Email must be between 3 to 32 characters"),

  // Password validation
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),

  // Error handler for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];

export const userSigninValidator = [
  // Email validation
  check("email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ min: 4, max: 32 })
    .withMessage("Email must be between 3 to 32 characters"),

  // Password validation
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),

  // Error handler for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return the first error message
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];
