import React from "react";
import type { Priority } from "../types/Task";
import { PRIORITY_LEVELS } from "../constants";

interface Props {
  priority: Priority | null;
  onChange: (priority: Priority) => void;
  size?: "small" | "medium" | "large";
  hasError?: boolean;
}

const PrioritySelector = ({
  priority,
  onChange,
  size = "medium",
  hasError = false,
}: Props) => {
  const options = [
    {
      value: PRIORITY_LEVELS.HIGH.value,
      emoji: "🔴",
      label: PRIORITY_LEVELS.HIGH.label,
    },
    {
      value: PRIORITY_LEVELS.MEDIUM.value,
      emoji: "🟠",
      label: PRIORITY_LEVELS.MEDIUM.label,
    },
    {
      value: PRIORITY_LEVELS.LOW.value,
      emoji: "🔵",
      label: PRIORITY_LEVELS.LOW.label,
    },
  ];

  const sizeClasses = {
    small: "w-8 h-8 text-lg", // Used in TaskItem bottom row
    medium: "w-9 h-9 text-xl", // Current default
    large: "w-10 h-10 text-2xl", // For TaskInput (creation)
  };

  return (
    <div
      className={`flex gap-1 p-1 rounded-xl transition-all
    ${hasError ? "ring-2 ring-red-500  animate-[shake_0.2s]" : ""}
  `}
      role="radiogroup"
      aria-invalid={hasError}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          role="radio"
          aria-checked={priority === opt.value}
          className={`flex items-center justify-center rounded-xl transition-all border
          ${sizeClasses[size]}
          ${
            priority === opt.value
              ? "bg-[#334155] border-[#22d3ee] ring-1 ring-[#22d3ee]"
              : "border-transparent hover:bg-[#334155] text-gray-400 hover:text-gray-200"
          }
        `}
          title={`${opt.label} priority`}
        >
          <span>{opt.emoji}</span>
        </button>
      ))}
    </div>
  );
};

export default PrioritySelector;
