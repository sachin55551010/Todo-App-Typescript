import { useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { PiSpinnerBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

type Task = {
  _id: string;
  title: string;
  description: string;
  isChecked: boolean;
  createdAt: Date;
};
export const AllTaskList = () => {
  const {
    isTaskLoading,
    allTasks,
    getAllTask,
    updateTask,
    deleteTask,
    setSelectedTask,
  } = useTaskStore();

  useEffect(() => {
    getAllTask();
  }, [getAllTask]);
  if (isTaskLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <PiSpinnerBold size={40} className="animate-spin" />
        <h1>Please Wait...</h1>
      </div>
    );
  }

  const handleIsChecked = (taskId: string) => {
    console.log(taskId);
    updateTask(taskId);
  };

  const handleDeleteBtn = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleEditBtn = (task: Task) => {
    setSelectedTask(task);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex justify-center px-4 mt-6">
      <div className="w-full max-w-lg flex flex-col gap-4">
        {!allTasks || allTasks.length === 0 ? (
          <div className="text-center py-10 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/30">
            <p className="text-gray-500 text-sm">No tasks yet</p>
            <p className="text-gray-400 text-xs mt-1">
              Start by adding your first task
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {allTasks.map((task) => {
              return (
                <li
                  key={task._id}
                  className={`group flex justify-between items-start gap-4 p-4 rounded-2xl
                bg-white/80 backdrop-blur-md shadow-md border border-white/30
                transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5`}
                >
                  {/* left content */}
                  <div className="flex items-start gap-3 flex-1">
                    {/* checkbox */}
                    <input
                      checked={task.isChecked}
                      onChange={() => handleIsChecked(task._id)}
                      type="checkbox"
                      className="mt-1 h-5 w-5 accent-[#374836] cursor-pointer"
                    />

                    {/* text */}
                    <div>
                      <h1
                        className={`font-semibold text-gray-800 text-sm ${
                          task.isChecked && "line-through text-gray-400"
                        }`}
                      >
                        {task.title}
                      </h1>
                      <p
                        className={`text-xs text-gray-500 mt-1 ${
                          task.isChecked && "line-through"
                        }`}
                      >
                        {task.description}
                      </p>

                      {/* date */}
                      <span className="text-[10px] text-gray-400 mt-2 block">
                        {new Date(task.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* actions */}
                  <div className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleEditBtn(task)}
                      className="p-2 rounded-lg hover:bg-green-100 transition"
                    >
                      <MdEdit size={18} className="text-green-600" />
                    </button>

                    <button
                      onClick={() => handleDeleteBtn(task._id)}
                      className="p-2 rounded-lg hover:bg-red-100 transition"
                    >
                      <MdDelete size={18} className="text-red-500" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
