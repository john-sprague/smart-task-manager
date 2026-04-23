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
