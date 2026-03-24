import React, { useState, ChangeEvent, FormEvent } from "react";

interface Props {
  onAdd: (text: string) => void;
}

const TaskInput = ({ onAdd }: Props) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(value);
    setValue("");
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        className="flex-1 p-2 border rounded"
        onChange={handleChange}
        value={value}
        placeholder="Add a task..."
      />
      <button className="px-4 py-2 bg-black text-white rounded">Add</button>
    </form>
  );
};

export default TaskInput;
