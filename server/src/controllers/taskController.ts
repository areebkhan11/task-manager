import { Request, Response } from "express";
import Task, { ITask } from "../models/Task";

export const createTask = async (req: Request, res: Response) => {
  const { title, checklist } = req.body;
  const task = new Task({ title, checklist, user: req.user._id });

  if (await task.save()) {
    res.status(201).json(task);
  } else {
    res.status(400).json({ message: "Invalid task data" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

export const updateTask = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    task.title = req.body.title || task.title;
    task.checklist = req.body.checklist || task.checklist;
    task.completed =
      req.body.completed !== undefined ? req.body.completed : task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};
