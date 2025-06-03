import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Get dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const DB_URL = process.env.MONGODB_URL;

// 🔒 Connect DB before anything else
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
await connectDB();

// MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://task-list999-2.onrender.com",
    // origin: "http://localhost:5173", // For local development
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ROUTES
app.use("/todo", todoRoute);
app.use("/user", userRoute);

// Serve static files
app.use(express.static(path.join(__dirname, "../FRONTEND/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../FRONTEND/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
