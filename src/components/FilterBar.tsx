import React from "react";
import type { Filter } from "../types/Task";
import { FILTERS } from "../constants";
import { useI18n } from "../hooks/useI18n";

interface Props {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const FILTER_OPTIONS = [
  { value: FILTERS.ALL, labelKey: "filters.all" },
  { value: FILTERS.ACTIVE, labelKey: "filters.active" },
  { value: FILTERS.COMPLETED, labelKey: "filters.completed" },
] as const;

export default function FilterBar({ filter, setFilter }: Props) {
  const { t } = useI18n();

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => setFilter(option.value)}
          className={`flex-1 py-2.5 text-sm font-medium rounded-2xl transition-all whitespace-nowrap px-4
            ${
              filter === option.value
                ? "bg-[#22d3ee] text-[#0a1428]"
                : "bg-[#334155] text-gray-300 hover:bg-[#475569]"
            }`}
        >
          {t(option.labelKey)}
        </button>
      ))}
    </div>
  );
}
