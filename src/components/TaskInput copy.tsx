import React, { useState, ChangeEvent, FormEvent } from "react";

interface Props {
  onAdd: (text: string) => void;
}

const TaskInput = ({ onAdd }: Props) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        aria-placeholder="Add a task..."
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  );
};

export default TaskInput;
