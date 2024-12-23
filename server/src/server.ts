import express from "express";
import dotenv from "dotenv";
import { protect } from "./middleware/authMiddleware"; // Import the protect middleware
import taskRoutes from "./routes/taskRoutes"; // Task routes
import userRoutes from "./routes/userRoutes"; // User routes

dotenv.config();

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Routes
app.use("/api/users", userRoutes); // User related routes (Login, Register)
app.use("/api/tasks", protect, taskRoutes); // Task related routes, with protection middleware

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
