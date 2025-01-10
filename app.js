import "dotenv/config";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

//  Import Files
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";
import userRoutes from "./routes/user-routes.js";
import categoryRoutes from "./routes/category-routes.js";
import productRoutes from "./routes/product-routes.js";

const app = express();

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
