
import './App.css'
import React, {useState} from 'react';
import TaskInput from "./components/TaskInput";
import type { Task } from "./types/Task";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string): void => {
    if (!text.trim()) return; 

    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now()
    }

    setTasks((previous) => [...previous, newTask])
  }

  return (
    <>
      <div className="mx-auto max-w-xl mt-10 text-center" >
        <h1 className="text-2xl font-bold mb-4">Smart Task Manager</h1>
        <TaskInput onAdd={addTask}/>

      </div>
    </>
  )
}

export default App
