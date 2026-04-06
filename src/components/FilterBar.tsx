import React from "react";
import type { Filter } from "../types/Task";
import { FILTERS } from "../constants/index";

interface Props {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export default function FilterBar({ filter, setFilter }: Props) {
  const filters = Object.values(FILTERS);

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`flex-1 py-2.5 text-sm font-medium rounded-2xl transition-all whitespace-nowrap px-4
            ${
              filter === f
                ? "bg-[#22d3ee] text-[#0a1428]"
                : "bg-[#334155] text-gray-300 hover:bg-[#475569]"
            }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
