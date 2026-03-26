import React from "react";
import type { Task } from "../types/Task";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskItem = ({ task, onToggle }: Props) => {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.completed ? "line-through" : ""}>
          {task.text}
        </span>
      </div>
      ={" "}
    </div>
  );
};

export default TaskItem;
