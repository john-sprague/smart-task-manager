import type { Task } from "../types/Task";
import { STORAGE_KEYS } from "../constants";

function isoDateToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export const loadTasks = (): Task[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    const parsed = data ? (JSON.parse(data) as unknown) : [];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((t): t is Record<string, unknown> =>
        Boolean(t && typeof t === "object"),
      )
      .map((t) => {
        const dueDate =
          typeof t.dueDate === "string" && t.dueDate.length > 0
            ? t.dueDate
            : isoDateToday();

        return {
          id: String(t.id ?? crypto.randomUUID()),
          text: String(t.text ?? ""),
          completed: Boolean(t.completed),
          priority: String(t.priority ?? "medium") as Task["priority"],
          dueDate,
          createdAt: typeof t.createdAt === "number" ? t.createdAt : Date.now(),
        } satisfies Task;
      })
      .filter((t) => t.text.trim().length > 0);
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
};
