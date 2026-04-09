import React, { useState, FormEvent } from "react";
import DueDatePicker from "./DueDatePicker";
import PrioritySelector from "./PrioritySelector";
import type { Priority } from "../types/Task";

interface Props {
  onAdd: (text: string, priority: Priority, dueDate?: string) => void;
}

const TaskInput = ({ onAdd }: Props) => {
  const [value, setValue] = useState<string>("");
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim(), priority, dueDate);
      setValue("");
      setDueDate(undefined);
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col lg:flex-row gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-[#0f172a] border border-[#475569] focus:border-[#22d3ee] 
                     rounded-2xl px-5 py-3.5 text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/30 transition-all"
        />

        <div className="flex flex-col sm:flex-row items-center gap-3 lg:min-w-fit mt-4 pt-3 lg:m-0 lg:p-0 border-t border-[#334155] lg:border-none">
          <PrioritySelector
            priority={priority}
            onChange={setPriority}
            size="medium"
          />

          <DueDatePicker
            dueDate={dueDate}
            onChange={setDueDate}
            size="normal"
          />

          <button
            type="submit"
            className="w-full sm:w-auto bg-[#22d3ee] hover:bg-[#06b6d4] text-[#0a1428] 
                       font-semibold px-8 py-3.5 rounded-2xl transition-all active:scale-95 whitespace-nowrap"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;
