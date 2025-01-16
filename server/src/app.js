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

const app = express();

// CORS Setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

// Error Handler
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));
});
app.use(errorHandler);

export default app;
