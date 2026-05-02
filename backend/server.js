const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API routes FIRST
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// ✅ FIXED PATH (IMPORTANT)
const buildPath = path.join(__dirname, "../frontend/build");

app.use(express.static(buildPath));

// Test route (optional)
app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

// React fallback (VERY IMPORTANT LAST)
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});