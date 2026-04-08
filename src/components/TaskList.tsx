import React from "react";
import type { Task, Priority } from "../types/Task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, priority: Priority) => void;
  onDueDateChange: (id: string, dueDate: string | undefined) => void;
}

const TaskList = ({
  tasks,
  onToggle,
  onDelete,
  onPriorityChange,
  onDueDateChange,
}: Props) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onPriorityChange={onPriorityChange}
          onDueDateChange={onDueDateChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
