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

  return {
    tasks,
    addTask,
    setTasks,
  };
}
