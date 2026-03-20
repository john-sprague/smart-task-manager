import './App.css'
import TaskInput from "./components/TaskInput";

const App = () => {

  return (
    <>
      <div className="mx-auto max-w-xl mt-10 text-center" >
        <h1 className="text-2xl font-bold mb-4">Smart Task Manager</h1>
        <TaskInput />
      </div>
    </>
  )
}

export default App
