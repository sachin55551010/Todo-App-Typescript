import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
  updateTask,
} from "../controllers/task.controller.js";

export const taskRoute = express.Router();

taskRoute.get("/get-all-task", getAllTasks);

taskRoute.post("/add-task", createTask);

taskRoute.patch("/update-task/:taskId", updateTask);

taskRoute.delete("/delete-task/:taskId", deleteTask);

taskRoute.put("/edit-task", editTask);
