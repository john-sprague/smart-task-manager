import { useState, useEffect } from "react";
import type { Priority, Task } from "../types/Task";
import { saveTasks, loadTasks } from "../utils/storage";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (text: string, priority: Priority, dueDate: string): void => {
    if (!text.trim() || !dueDate) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      dueDate,
      createdAt: Date.now(),
    };

    setTasks((previous) => [...previous, newTask]);
  };

  const toggleTask = (id: string): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTaskPriority = (id: string, priority: Priority): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, priority: priority } : task,
      ),
    );
  };

  const updateDueDate = (id: string, dueDate: string | undefined): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, dueDate: dueDate } : task,
      ),
    );
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTaskPriority,
    updateDueDate,
  };
}
