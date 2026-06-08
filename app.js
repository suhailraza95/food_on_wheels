require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

const apiKeyMiddleware = require("./middleware/apiKeyMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(morgan("tiny"));
app.use(express.json());

// API Key Protection
app.use(apiKeyMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/password", passwordRoutes);

// Error Handler (must be last)
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});