import type { Task } from "../types/Task";
import { STORAGE_KEYS } from "../constants";

export const loadTasks = (): Task[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? (JSON.parse(data) as Task[]) : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
};
