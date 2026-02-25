import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import productRoute from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();
let port = process.env.PORT || 8000;

// Parse CORS origins
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Default to localhost if no CORS_ORIGINS is set
const defaultOrigins = ["http://localhost:5173", "http://localhost:5174"];
const finalOrigins = allowedOrigins.length ? allowedOrigins : defaultOrigins;

console.log("=== Server Configuration ===");
console.log("Environment:", process.env.NODE_ENV || "development");
console.log("Port:", port);
console.log("Allowed Origins:", finalOrigins);
console.log("==========================");

let app = express();
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman, curl, mobile apps)
      if (!origin) {
        console.log("Request with no origin - allowing");
        return callback(null, true);
      }
      
      console.log("Request from origin:", origin);
      
      if (finalOrigins.includes(origin)) {
        console.log("✓ Origin allowed");
        callback(null, true);
      } else {
        console.warn("✗ CORS blocked origin:", origin);
        console.warn("Allowed origins:", finalOrigins);
        callback(new Error(`CORS Error: Origin ${origin} not allowed`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("OneCart Backend API is running! ✓");
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// CORS test endpoint
app.get("/api/test-cors", (req, res) => {
  res.json({
    message: "✓ CORS is working!",
    origin: req.headers.origin || "No origin header",
    cookies: req.cookies,
    environment: process.env.NODE_ENV || "development",
    allowedOrigins: finalOrigins,
    corsConfigured: true,
    timestamp: new Date().toISOString(),
  });
});

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server due to DB connection error:', err);
    process.exit(1);
  }
};

start();

// VITE_SERVER_URL="https://onecart-hkks.onrender.com"
