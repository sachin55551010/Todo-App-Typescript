import { Request, Response } from "express";
import { Task } from "../models/taskSchema.js";

type TaskBody = {
  title: string;
  description: string;
};

type TaskParams = {
  taskId: string;
};

type TaskType = {
  _id: string;
  title: string;
  description: string;
  isChecked: boolean;
  createdAt: Date;
  updatedAt: Date;
};
// function to create a new tasks
export const createTask = async (
  req: Request<{}, {}, TaskBody>,
  res: Response,
): Promise<Response> => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
    });

    return res
      .status(201)
      .json({ task, success: true, message: "Task created successfully" });
  } catch (error) {
    console.log("create Task error : ", error);
    return res.status(500).json({ error, success: false });
  }
};

// get all tasks function
export const getAllTasks = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const tasks = await Task.find().lean<TaskType[]>();

    return res.status(200).json({ tasks, success: true });
  } catch (error) {
    console.log("Get all task error");
    return res.status(500).json({ error, success: false });
  }
};

// update task function
export const updateTask = async (
  req: Request<TaskParams, {}, {}>,
  res: Response,
): Promise<Response> => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task)
      return res.status(400).json({ message: "no task found", success: false });

    task.isChecked = !task.isChecked;

    await task.save();

    return res
      .status(201)
      .json({ task, message: "Task updaded", success: true });
  } catch (error) {
    console.log("Update task error : ", error);
    return res.status(500).json({ message: error, success: false });
  }
};

export const deleteTask = async (
  req: Request<TaskParams, {}, {}>,
  res: Response,
): Promise<Response> => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndDelete(taskId);

    return res.status(201).json({ task, success: true });
  } catch (error) {
    console.log("delete task error : ", error);
    return res
      .status(400)
      .json({ message: "Something went wrong", success: false });
  }
};

export const editTask = async (
  req: Request<TaskParams, {}, TaskType>,
  res: Response,
): Promise<Response> => {
  try {
    const { title, description, _id } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      { title, description },
      { new: true },
    );
    return res
      .status(201)
      .json({ updatedTask, message: "Task updated", success: true });
  } catch (error) {
    return res.status(400).json({ message: error, success: false });
  }
};
