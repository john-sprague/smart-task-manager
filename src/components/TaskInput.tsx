import React, { useState, ChangeEvent, FormEvent } from "react";

interface Props {
  onAdd: (text: string) => void;
}

const TaskInput = ({ onAdd }: Props) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue("");
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
        onChange={handleChange}
        placeholder="Add a new task..."
        className="flex-1 bg-[#0f172a] border border-[#475569] focus:border-[#22d3ee] 
                   rounded-2xl px-5 py-3.5 text-white placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/30 transition-all"
      />
      <button
        type="submit"
        className="bg-[#22d3ee] hover:bg-[#06b6d4] text-[#0a1428] font-semibold 
                   px-8 py-3.5 rounded-2xl transition-all active:scale-95 
                   whitespace-nowrap"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskInput;
