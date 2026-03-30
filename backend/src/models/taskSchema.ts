import mongoose from "mongoose";

interface Task {
  title: string;
  description: string;
  isChecked: boolean;
}

const taskSchema = new mongoose.Schema<Task>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Task = mongoose.model<Task>("Task", taskSchema);
