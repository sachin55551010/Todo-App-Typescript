import { create } from "zustand";
import { axiosInstance } from "../api/axiosInstance";

type TaskData = {
  _id: string;
  title: string;
  description: string;
  isChecked: boolean;
  createdAt: Date;
};

type TaskBody = {
  title: string;
  description: string;
};

type TaskStore = {
  allTasks: TaskData[];
  isTaskCreating: boolean;
  isTaskEditing: boolean;
  isGetAllTask: boolean;
  isTaskLoading: boolean;
  isTaskUpdating: boolean;
  selectedTask: TaskData | null;

  getAllTask: () => Promise<void>;
  addTask: (tasks: TaskBody) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string) => void;
  editTask: (taskData: TaskData) => void;
  setSelectedTask: (task: TaskData) => void;
  clearSelectedTask: () => void;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  allTasks: [],
  isTaskCreating: false,
  isTaskEditing: false,
  isGetAllTask: false,
  isTaskLoading: false,
  isTaskUpdating: false,
  selectedTask: null,

  setSelectedTask: (task) => {
    set({ selectedTask: task });
  },

  clearSelectedTask: () => {
    set({ selectedTask: null });
    console.log("cleanup function run");
  },

  getAllTask: async () => {
    try {
      set({ isTaskLoading: true });
      set({ isGetAllTask: true });
      const res = await axiosInstance.get("/get-all-task");

      set({ allTasks: res.data.tasks });
    } catch (error) {
      console.log("get all task error", error);
    } finally {
      set({ isGetAllTask: false });
      set({ isTaskLoading: false });
    }
  },
  addTask: async (taskData: TaskBody): Promise<void> => {
    try {
      set({ isTaskCreating: true });
      const res = await axiosInstance.post("/add-task", taskData);
      console.log(res.data.task);

      set((state) => ({
        allTasks: [...state.allTasks, res.data.task],
      }));
    } catch (error) {
      console.log("Create task error : ", error);
    } finally {
      set({ isTaskCreating: false });
    }
  },

  updateTask: async (taskId: string) => {
    try {
      set({ isTaskUpdating: true });
      const res = await axiosInstance.patch(`/update-task/${taskId}`);
      console.log(res.data);
      set((state) => ({
        allTasks: state.allTasks.map((task) =>
          task._id === taskId ? res.data.task : task,
        ),
      }));
    } catch (error) {
      console.log("update task error : ", error);
    } finally {
      set({ isTaskUpdating: false });
    }
  },
  deleteTask: async (taskId: string) => {
    const prevTask = get().allTasks;

    set((state) => ({
      allTasks: state.allTasks.filter((task) => task._id !== taskId),
    }));
    try {
      await axiosInstance.delete(`/delete-task/${taskId}`);
    } catch (error) {
      set({ allTasks: prevTask });
      console.log("delete Task error : ", error);
    }
  },
  editTask: async (taskData: TaskData) => {
    try {
      set({ isTaskEditing: true });
      const res = await axiosInstance.put(`/edit-task`, taskData);
      console.log(res);
      set((state) => ({
        allTasks: state.allTasks.map((task) =>
          task._id === res.data.updatedTask._id ? res.data.updatedTask : task,
        ),
      }));
    } catch (error) {
      console.log("edit task error : ", error);
    } finally {
      set({ isTaskEditing: false });
    }
  },
}));
