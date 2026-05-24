const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const vehicleRoutes = require("./routes/vehicleRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("FleetFlow API Running");
});

// Port
const PORT = process.env.PORT || 5000;

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});