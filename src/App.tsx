import "./App.css";
import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import type { Task } from "./types/Task";

const App = () => {
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
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      <div className="mx-auto max-w-xl mt-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Smart Task Manager</h1>
        <TaskInput onAdd={addTask} />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </div>
    </>
  );
};

export default App;
