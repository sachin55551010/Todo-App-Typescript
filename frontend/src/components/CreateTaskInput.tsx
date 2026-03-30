import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";

type TaskData = {
  title: string;
  description: string;
};
export const CreateTaskInput = () => {
  const [taskData, setTaskData] = useState<TaskData>({
    title: "",
    description: "",
  });

  const {
    addTask,
    isTaskCreating,
    isTaskEditing,
    selectedTask,
    clearSelectedTask,
    editTask,
  } = useTaskStore();

  useEffect(() => {
    if (!selectedTask) return;
    if (selectedTask) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTaskData({
        title: selectedTask.title,
        description: selectedTask.description,
      });
    }

    return () => clearSelectedTask();
  }, [selectedTask, clearSelectedTask]);

  //   handle on change funtion
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  //   handle submit from
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedTask) {
      editTask({
        ...selectedTask,
        ...taskData,
      });
    } else {
      addTask(taskData);
    }
    setTaskData({ title: "", description: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#374836] via-[#7f8f80] to-[#f9faf2] px-4">
      <form
        onSubmit={handleSubmitForm}
        className="w-full max-w-lg bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-6 flex flex-col gap-6 border border-white/30"
      >
        {/* header */}
        <section className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Task Manager
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {selectedTask ? "Update your task" : "Add a new task"}
          </p>
        </section>

        {/* inputs */}
        <section className="flex flex-col gap-4">
          {/* title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              name="title"
              value={taskData.title}
              onChange={handleOnChange}
              type="text"
              placeholder="Enter task title..."
              className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none
            focus:ring-2 focus:ring-[#7f8f80] focus:border-transparent transition"
            />
          </div>

          {/* description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={(e) =>
                setTaskData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter task description..."
              rows={3}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none resize-none
            focus:ring-2 focus:ring-[#7f8f80] focus:border-transparent transition"
            />
          </div>
        </section>

        {/* button */}
        <button
          type="submit"
          disabled={!taskData.title || !taskData.description}
          className={`h-11 rounded-xl font-semibold text-white transition-all duration-300
        ${
          !taskData.title || !taskData.description
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-linear-to-r from-[#374836] to-[#7f8f80] hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        }`}
        >
          {isTaskCreating || isTaskEditing
            ? "Processing..."
            : selectedTask
              ? "Update Task"
              : "Add Task"}
        </button>
      </form>
    </div>
  );
};
