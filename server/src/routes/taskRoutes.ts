import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
} from "../controllers/taskController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").post(protect, createTask).get(protect, getTasks);

router.route("/:id").put(protect, updateTask);

export default router;
