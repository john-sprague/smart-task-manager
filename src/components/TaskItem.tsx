import React from "react";
import type { Task } from "../types/Task";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ task, onToggle, onDelete }: Props) => {
  return (
    <div
      className="group flex items-center justify-between bg-[#0f172a] border border-[#334155] 
                 rounded-2xl px-4 sm:px-5 py-4 mb-3 hover:border-[#475569] transition-all"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 accent-[#22d3ee] cursor-pointer flex-shrink-0"
        />
        <span
          className={`text-white text-[17px] transition-all truncate ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.text}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 
                   transition-all text-xl p-1 flex-shrink-0 ml-2"
      >
        ✕
      </button>
    </div>
  );
};

export default TaskItem;
