import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Import Routes
import authRoutes from "./routes/auth-routes.js";
import userRoutes from "./routes/user-routes.js";
import productRoutes from "./routes/product-routes.js";
import categoryRoutes from "./routes/category-routes.js";
import errorHandler from "./middleware/custom-error-middleware.js";
import ErrorHandler from "./utils/ErrorHandler.js";
import config from "./config/env.config.js";

const app = express();

// CORS Setup
app.use(
  cors({
    origin: config.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// Error Handler
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));
});
app.use(errorHandler);

export default app;
