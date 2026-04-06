import React from "react";
import type { Task, Priority } from "../types/Task";
import PrioritySelector from "./PrioritySelector";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, priority: Priority) => void;
}

const TaskItem = ({ task, onToggle, onDelete, onPriorityChange }: Props) => {
  return (
    <div
      className="group flex items-start gap-3 bg-[#0f172a] border border-[#334155] 
                 rounded-2xl px-4 py-4 mb-3 hover:border-[#475569] transition-all"
    >
      <div className="flex items-center gap-3 flex-shrink-0 pt-0.5">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 accent-[#22d3ee] cursor-pointer flex-shrink-0"
        />

        <PrioritySelector
          priority={task.priority}
          onChange={(p) => onPriorityChange(task.id, p)}
        />
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <span
          className={`block text-white text-[17px] leading-relaxed break-words ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.text}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-gray-400 hover:text-red-500 text-2xl p-2 flex-shrink-0 
                   opacity-60 group-hover:opacity-100 transition-all active:scale-90 mt-0.5"
        aria-label="Delete task"
      >
        ✕
      </button>
    </div>
  );
};

export default TaskItem;
