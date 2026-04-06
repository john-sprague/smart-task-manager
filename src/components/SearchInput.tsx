import React, { useState, useEffect, ChangeEvent } from "react";
import useDebounce from "../hooks/useDebounce";

interface Props {
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 500);

  // Pass debounced value to parent
  useEffect(() => {
    onSearch(debouncedQuery.trim());
  }, [debouncedQuery, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative mb-6">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        🔍
      </div>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search tasks..."
        className="w-full bg-[#0f172a] border border-[#475569] focus:border-[#22d3ee] 
                   rounded-2xl pl-11 pr-10 py-3.5 text-white placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/30 transition-all"
      />

      {query && (
        <button
          onClick={clearSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                     hover:text-white transition-colors p-1"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchInput;
