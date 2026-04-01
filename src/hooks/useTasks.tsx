import { useState } from "react";
import type { Task } from "../types/Task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  return {
    tasks,
    setTasks,
  };
}
