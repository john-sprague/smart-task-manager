import React, { useMemo, useState } from "react";
import type { Task, Priority } from "../types/Task";
import PrioritySelector from "./PrioritySelector";
import DueDatePicker from "./DueDatePicker";
import { useI18n } from "../hooks/useI18n";
import { SIZE } from "../constants";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, priority: Priority) => void;
  onDueDateChange: (id: string, dueDate: string) => void;
}

const TaskItem = ({
  task,
  onToggle,
  onDelete,
  onPriorityChange,
  onDueDateChange,
}: Props) => {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);

  const canExpand = useMemo(() => {
    // Simple heuristic: avoid measuring layout; keep UI predictable.
    return task.text.trim().length > 120 || task.text.includes("\n");
  }, [task.text]);

  return (
    <div className="group bg-[#0f172a] border border-[#334155] rounded-2xl px-4 py-4 mb-3 hover:border-[#475569] transition-all">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 accent-[#22d3ee] cursor-pointer flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <span
              className={`text-white text-[17px] leading-relaxed break-words ${
                isExpanded ? "" : "line-clamp-2"
              } ${task.completed ? "line-through text-gray-500" : ""}`}
            >
              {task.text}
            </span>

            {canExpand && (
              <button
                type="button"
                onClick={() => setIsExpanded((v) => !v)}
                className="flex-shrink-0 text-xs text-gray-400 hover:text-gray-200 transition-colors mt-1"
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#334155]">
        <PrioritySelector
          priority={task.priority}
          onChange={(p) => onPriorityChange(task.id, p)}
          size={SIZE.SMALL}
        />

        <div className="flex items-center gap-2">
          <DueDatePicker
            dueDate={task.dueDate}
            onChange={(date) => onDueDateChange(task.id, date)}
            size={SIZE.SMALL}
          />

          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-500 text-2xl p-2 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-all"
            aria-label={t("task.delete")}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
