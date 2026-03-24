import React from "react";
import type { Task } from "../types/Task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
}

const TaskList = ({ tasks }: Props) => {
  console.log(tasks);
  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <TaskItem task={task} />
      ))}
    </div>
  );
};

export default TaskList;
