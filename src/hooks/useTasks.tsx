import { useState } from "react";
import type { Task } from "../types/Task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string): void => {
    if (!text.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((previous) => [...previous, newTask]);
  };

  const toggleTask = (id: string): void => {
    setTasks((prev) =>
      prev.map(
        (task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        // eslint-disable-next-line prettier/prettier
      )
    );
  };

  const deleteTask = (id: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
}
