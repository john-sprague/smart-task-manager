import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import SearchInput from "./components/SearchInput";
import { useTasks } from "./hooks/useTasks";
import { useI18n } from "./hooks/useI18n";
import type { Filter, Priority } from "./types/Task";
import { FILTERS, LOCALES } from "./constants";

const App = () => {
  const { t, locale, setLocale } = useI18n();
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTaskPriority,
    updateDueDate,
  } = useTasks();

  const [filter, setFilter] = useState<Filter>(FILTERS.ALL);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === FILTERS.ACTIVE) return !task.completed;
      if (filter === FILTERS.COMPLETED) return task.completed;
      return true;
    })
    .filter((task) => {
      if (!searchQuery) return true;
      return task.text.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const handlePriorityChange = (id: string, priority: Priority) => {
    updateTaskPriority(id, priority);
  };

  const handleDueDateChange = (id: string, dueDate: string) => {
    updateDueDate(id, dueDate);
  };

  return (
    <div className="min-h-screen bg-[#0a1428] py-6 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t("app.title")}
          </h1>

          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as typeof locale)}
            className="bg-[#1e2937] border border-[#334155] text-white rounded-xl px-3 py-2"
            aria-label={t("app.languageSelector")}
          >
            <option value={LOCALES.EN}>English</option>
            <option value={LOCALES.ES}>Español</option>
          </select>
        </div>

        <div className="bg-[#1e2937] border border-[#334155] rounded-3xl p-5 sm:p-8 shadow-2xl shadow-[#22d3ee]/10 ring-1 ring-[#22d3ee]/20">
          <TaskInput onAdd={addTask} />
          <FilterBar filter={filter} setFilter={setFilter} />
          <SearchInput onSearch={setSearchQuery} />

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onPriorityChange={handlePriorityChange}
            onDueDateChange={handleDueDateChange}
          />

          {filteredTasks.length === 0 && (
            <p className="text-center text-gray-400 mt-8 text-sm">
              {searchQuery
                ? t("app.noResults", { query: searchQuery })
                : t("app.empty")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
