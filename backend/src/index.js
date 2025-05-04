import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";

import productRoutes from "./routes/product.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://shopik-71tg8u4vk-vladurkas-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payments", paymentRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
  connectDB();
});
