import type { Task } from "../types/Task";

export const loadTasks = (): Task[] => {
  try {
    const data = localStorage.getItem("tasks");
    return data ? (JSON.parse(data) as Task[]) : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
