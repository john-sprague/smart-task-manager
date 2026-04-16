import React, { useState, FormEvent } from "react";
import DueDatePicker from "./DueDatePicker";
import PrioritySelector from "./PrioritySelector";
import type { Priority } from "../types/Task";

interface Props {
  onAdd: (text: string, priority: Priority, dueDate?: string) => void;
}

type Errors = {
  value?: string;
  priority?: string;
  dueDate?: string;
};

const TaskInput = ({ onAdd }: Props) => {
  const [value, setValue] = useState<string>("");
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [priority, setPriority] = useState<Priority | null>(null);

  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const newErrors: Errors = {};

    if (!value.trim()) {
      newErrors.value = "Task is required";
    }

    if (!priority) {
      newErrors.priority = "Select a priority";
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    onAdd(value.trim(), priority!, dueDate);

    // Reset
    setValue("");
    setDueDate(undefined);
    setPriority(null);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (errors.value)
                setErrors((prev) => ({ ...prev, value: undefined }));
            }}
            placeholder="Add a new task..."
            className={`w-full bg-[#0f172a] border ${
              errors.value
                ? "border-red-500  animate-[shake_0.2s]"
                : "border-[#475569]"
            } focus:border-[#22d3ee] 
              rounded-2xl px-5 py-3.5 text-white placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/30 transition-all`}
          />
          {errors.value && (
            <p className="text-red-400 text-sm mt-1">{errors.value}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 lg:min-w-fit mt-4 pt-3 lg:m-0 lg:p-0 border-t border-[#334155] lg:border-none">
          <div className="flex flex-col items-center">
            <PrioritySelector
              priority={priority}
              onChange={(p) => {
                setPriority(p);
                if (errors.priority)
                  setErrors((prev) => ({ ...prev, priority: undefined }));
              }}
              size="medium"
              hasError={!!errors.priority}
            />
            {errors.priority && (
              <p className="text-red-400 text-xs mt-1">{errors.priority}</p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <DueDatePicker
              dueDate={dueDate}
              onChange={(d) => {
                setDueDate(d);
                if (errors.dueDate)
                  setErrors((prev) => ({ ...prev, dueDate: undefined }));
              }}
              size="normal"
              hasError={!!errors.dueDate}
            />
            {errors.dueDate && (
              <p className="text-red-400 text-xs mt-1">{errors.dueDate}</p>
            )}
          </div>

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
