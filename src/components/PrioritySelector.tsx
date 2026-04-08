import React from "react";
import type { Priority } from "../types/Task";

interface Props {
  priority: Priority;
  onChange: (priority: Priority) => void;
}

const PrioritySelector = ({ priority, onChange }: Props) => {
  const options = [
    { value: "high" as const, emoji: "🔴" },
    { value: "medium" as const, emoji: "🟠" },
    { value: "low" as const, emoji: "🔵" },
  ];

  return (
    <div className="flex gap-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`w-9 h-9 flex items-center justify-center text-xl rounded-xl transition-all ${
            priority === opt.value
              ? "bg-[#334155] ring-1 ring-[#22d3ee]"
              : "hover:bg-[#334155] text-gray-400 hover:text-gray-200"
          }`}
        >
          {opt.emoji}
        </button>
      ))}
    </div>
  );
};

export default PrioritySelector;
