import React, { useRef, useState, FormEvent } from "react";
import DueDatePicker from "./DueDatePicker";
import PrioritySelector from "./PrioritySelector";
import FormField from "./FormField";
import { useI18n } from "../hooks/useI18n";
import { SIZE } from "../constants";
import type { Priority } from "../types/Task";

interface Props {
  onAdd: (text: string, priority: Priority, dueDate: string) => void;
}

type Errors = {
  value?: string;
  priority?: string;
  dueDate?: string;
};

const TaskInput = ({ onAdd }: Props) => {
  const { t } = useI18n();

  const [value, setValue] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [priority, setPriority] = useState<Priority | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (): Errors => {
    const newErrors: Errors = {};

    if (!value.trim()) newErrors.value = t("validation.taskRequired");
    if (!priority) newErrors.priority = t("validation.priorityRequired");
    if (!dueDate) newErrors.dueDate = t("validation.dueDateRequired");

    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.value) {
        inputRef.current?.focus();
      }
      return;
    }

    onAdd(value.trim(), priority!, dueDate);

    setValue("");
    setDueDate("");
    setPriority(null);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col lg:flex-row gap-3">
        <FormField error={errors.value} className="flex-1">
          {({ describedBy, invalid }) => (
            <input
              ref={inputRef}
              type="text"
              value={value}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              onChange={(e) => {
                setValue(e.target.value);
                if (errors.value) {
                  setErrors((prev) => ({ ...prev, value: undefined }));
                }
              }}
              placeholder={t("taskInput.taskPlaceholder")}
              className={`w-full bg-[#0f172a] border ${
                invalid
                  ? "border-red-500 animate-[shake_0.2s]"
                  : "border-[#475569]"
              } focus:border-[#22d3ee]
                rounded-2xl px-5 py-3.5 text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/30 transition-all`}
            />
          )}
        </FormField>

        <div className="flex flex-col sm:flex-row items-center gap-3 lg:min-w-fit mt-4 pt-3 lg:m-0 lg:p-0 border-t border-[#334155] lg:border-none">
          <FormField error={errors.priority} align="center">
            {({ describedBy, invalid }) => (
              <PrioritySelector
                priority={priority}
                onChange={(p) => {
                  setPriority(p);
                  if (errors.priority) {
                    setErrors((prev) => ({ ...prev, priority: undefined }));
                  }
                }}
                size={SIZE.MEDIUM}
                hasError={invalid}
                ariaDescribedBy={describedBy}
              />
            )}
          </FormField>

          <FormField error={errors.dueDate} align="center">
            {({ describedBy, invalid }) => (
              <DueDatePicker
                dueDate={dueDate}
                onChange={(d) => {
                  setDueDate(d);
                  if (errors.dueDate) {
                    setErrors((prev) => ({ ...prev, dueDate: undefined }));
                  }
                }}
                size={SIZE.MEDIUM}
                hasError={invalid}
                ariaDescribedBy={describedBy}
              />
            )}
          </FormField>

          <button
            type="submit"
            className="w-full sm:w-auto sm:self-end bg-[#22d3ee] hover:bg-[#06b6d4] text-[#0a1428]
              font-semibold px-8 py-3.5 rounded-2xl transition-all active:scale-95 whitespace-nowrap"
          >
            {t("taskInput.submitButton")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;
