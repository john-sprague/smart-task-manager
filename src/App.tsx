import "./App.css";
import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import { useTasks } from "./hooks/useTasks";
import type { Filter } from "./types/Task";
import { FILTERS } from "./constants/index";

const App = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<Filter>(FILTERS.ALL);

  const filteredTasks = tasks.filter((task) => {
    console.log(FILTERS.ACTIVE);
    if (filter === FILTERS.ACTIVE) return !task.completed;
    if (filter === FILTERS.COMPLETED) return task.completed;
    return true;
  });

  return (
    <>
      <div className="mx-auto max-w-xl mt-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Smart Task Manager</h1>
        <TaskInput onAdd={addTask} />
        <FilterBar filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </>
  );
};

export default App;
