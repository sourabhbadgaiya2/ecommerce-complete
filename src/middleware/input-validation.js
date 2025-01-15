import { validationResult, check } from "express-validator";

export const userSignupValidator = [
  check("name", "Name is required").notEmpty(),

  check("email")
    .isEmail()
    .withMessage("Email is required")
    .isLength({ min: 4, max: 32 })
    .withMessage("Email must be between 3 to 32 characters"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];

export const userSigninValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ min: 4, max: 32 })
    .withMessage("Email must be between 3 to 32 characters"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];

export const productInputValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 to 100 characters"),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 to 500 characters"),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),

  check("category").notEmpty().withMessage("Category is required"),

  check("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 1 })
    .withMessage("Stock must be at least 1"),

  // Shipping validation
  check("shipping").isBoolean().withMessage("Shipping must be a boolean value"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return all errors in the response as an array
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
