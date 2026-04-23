import React from "react";
import type { Priority } from "../types/Task";
import { PRIORITY_LEVELS, SIZE, type Size } from "../constants";
import { useI18n } from "../hooks/useI18n";

interface Props {
  priority: Priority | null;
  onChange: (priority: Priority) => void;
  size?: Size;
  hasError?: boolean;
  ariaDescribedBy?: string;
}

const PrioritySelector = ({
  priority,
  onChange,
  size = SIZE.MEDIUM,
  hasError = false,
  ariaDescribedBy,
}: Props) => {
  const { t } = useI18n();

  const options = [
    {
      value: PRIORITY_LEVELS.HIGH.value,
      emoji: "🔴",
      label: t(PRIORITY_LEVELS.HIGH.labelKey),
    },
    {
      value: PRIORITY_LEVELS.MEDIUM.value,
      emoji: "🟠",
      label: t(PRIORITY_LEVELS.MEDIUM.labelKey),
    },
    {
      value: PRIORITY_LEVELS.LOW.value,
      emoji: "🔵",
      label: t(PRIORITY_LEVELS.LOW.labelKey),
    },
  ];

  const sizeClasses = {
    small: "w-8 h-8 text-lg",
    medium: "w-9 h-9 text-xl",
    large: "w-10 h-10 text-2xl",
  };

  return (
    <div
      className={`flex gap-1 p-1 rounded-xl transition-all ${
        hasError ? "ring-1 ring-red-500 animate-[shake_0.2s]" : ""
      }`}
      role="radiogroup"
      aria-invalid={hasError}
      aria-describedby={ariaDescribedBy}
    >
      {options.map((opt) => {
        const isSelected = priority === opt.value;

        const stateClasses = isSelected
          ? "bg-[#334155] border-[#22d3ee] ring-1 ring-[#22d3ee]"
          : "border-transparent hover:bg-[#334155] text-gray-400 hover:text-gray-200";

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            role="radio"
            aria-checked={isSelected}
            className={`flex items-center justify-center rounded-xl transition-all border
              ${sizeClasses[size]}
              ${stateClasses}`}
          >
            <span>{opt.emoji}</span>
          </button>
        );
      })}
    </div>
  );
};

export default PrioritySelector;
