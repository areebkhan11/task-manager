import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

const mongoUri: string = process.env.MONGO_URI || "";
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined");
}

const jwtSecret: string = process.env.JWT_SECRET || "default_secret_key";
const port: number = parseInt(process.env.PORT || "5000");

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

// Dummy route for testing
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
