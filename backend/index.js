


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import listingsRoutes from "./routes/listings.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// ====================
// MongoDB Connection
// ====================
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/airbnb-clone";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ====================
// Routes
// ====================
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Use modular routes
app.use("/api/listings", listingsRoutes);
app.use("/api/auth", authRoutes);

// ====================
// Start Server
// ====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
