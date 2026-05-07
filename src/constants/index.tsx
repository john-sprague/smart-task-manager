export const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

export const PRIORITY_LEVELS = {
  HIGH: { value: "high", labelKey: "priority.high" },
  MEDIUM: { value: "medium", labelKey: "priority.medium" },
  LOW: { value: "low", labelKey: "priority.low" },
} as const;

export const STORAGE_KEYS = {
  TASKS: "tasks",
} as const;

export const LOCALES = {
  EN: "en",
  ES: "es",
} as const;

export type Locale = (typeof LOCALES)[keyof typeof LOCALES];

export const SIZE = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

export type Size = (typeof SIZE)[keyof typeof SIZE];

export const DUE_DATE = {
  POPOVER_WIDTH_PX: 288,
  DISPLAY_FORMAT: { month: "short", day: "numeric" } as const,
  STATE: {
    ERROR: "error",
    EMPTY: "empty",
    OVERDUE: "overdue",
    ACTIVE: "active",
  } as const,
  STATE_CLASSES: {
    error: "border-red-500 text-red-400",
    overdue: "border-red-500 text-red-400",
    active: "border-[#22d3ee] text-[#22d3ee]",
    empty: "border-gray-600 text-gray-400 hover:border-gray-500",
  } as const,
  SIZE_CLASSES: {
    small: "text-xs py-1 px-2.5",
    medium: "py-[14px] text-[15px]",
  } as const,
} as const;
