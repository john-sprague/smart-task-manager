import React, { useLayoutEffect, useRef, useState, FormEvent } from "react";
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

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const syncTextareaHeight = () => {
    const el = inputRef.current;
    if (!el) return;
    // Allow shrink + grow reliably.
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useLayoutEffect(() => {
    // Auto-grow textarea up to a max height; after that it scrolls.
    syncTextareaHeight();
  }, [value]);

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

    // Force-collapse immediately; layout effect will also run once `value` is "".
    if (inputRef.current) inputRef.current.style.height = "auto";
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col lg:flex-row gap-3">
        <FormField error={errors.value} className="flex-1">
          {({ describedBy, invalid }) => (
            <textarea
              ref={inputRef}
              value={value}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              rows={1}
              onChange={(e) => {
                setValue(e.target.value);
                if (errors.value) {
                  setErrors((prev) => ({ ...prev, value: undefined }));
                }
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter" || e.shiftKey) return;
                e.preventDefault();
                (
                  e.currentTarget.form as HTMLFormElement | null
                )?.requestSubmit();
              }}
              placeholder={t("taskInput.taskPlaceholder")}
              className={`w-full resize-none overflow-y-auto max-h-40 bg-[#0f172a] border ${
                invalid
                  ? "border-red-500 animate-[shake_0.2s]"
                  : "border-[#475569]"
              } focus:border-[#22d3ee]
                rounded-2xl px-5 py-3.5 text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/30 transition-all`}
            />
          )}
        </FormField>

        <div className="flex flex-col sm:flex-row sm:items-start md:items-stretch md:w-full lg:w-auto gap-3 lg:min-w-fit mt-4 pt-3 lg:m-0 lg:p-0 border-t border-[#334155] lg:border-none">
          <FormField
            error={errors.priority}
            align="center"
            className="w-full sm:w-auto md:flex-1 lg:flex-none"
          >
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
                fullWidth
                hasError={invalid}
                ariaDescribedBy={describedBy}
              />
            )}
          </FormField>

          <FormField
            error={errors.dueDate}
            align="center"
            className="w-full sm:w-auto md:flex-1 lg:flex-none"
          >
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
                fullWidth
                hasError={invalid}
                ariaDescribedBy={describedBy}
              />
            )}
          </FormField>

          <button
            type="submit"
            className="w-full sm:w-auto md:flex-1 lg:flex-none sm:self-start bg-[#22d3ee] hover:bg-[#06b6d4] text-[#0a1428]
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
