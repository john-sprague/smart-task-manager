import React from "react";
import type { Filter } from "../types/Task";

interface Props {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export default function FilterBar({ filter, setFilter }: Props) {
  const filters: Filter[] = ["all", "active", "completed"];

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
