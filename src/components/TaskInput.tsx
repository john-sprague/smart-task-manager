import React, { useState, FormEvent } from "react";
import DueDatePicker from "./DueDatePicker";

interface Props {
  onAdd: (text: string, dueDate?: string) => void;
}

const TaskInput = ({ onAdd }: Props) => {
  const [value, setValue] = useState<string>("");
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim(), dueDate);
      setValue("");
      setDueDate(undefined);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 mb-8"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 bg-[#0f172a] border border-[#475569] focus:border-[#22d3ee] 
                   rounded-2xl px-5 py-3.5 text-white placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/30 transition-all"
      />

      <div className="flex items-center gap-3">
        <DueDatePicker dueDate={dueDate} onChange={setDueDate} size="normal" />

        <button
          type="submit"
          className="bg-[#22d3ee] hover:bg-[#06b6d4] text-[#0a1428] font-semibold 
                     px-8 py-3.5 rounded-2xl transition-all active:scale-95 whitespace-nowrap"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskInput;
