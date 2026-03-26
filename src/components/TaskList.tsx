import React from "react";
import type { Task } from "../types/Task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onToggle: (id: string) => void;
}

const TaskList = ({ tasks, onToggle }: Props) => {
  console.log(tasks);
  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default TaskList;
