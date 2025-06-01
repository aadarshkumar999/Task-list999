import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;
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
app.use(cors({
  origin: process.env.FORNTEND_URL,
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ROUTES
app.use("/todo", todoRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
