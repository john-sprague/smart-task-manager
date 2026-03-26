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
    <div className="flex gap-2 mt-4">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 border rounded ${
            filter === f ? "bg-black text-white" : ""
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
