import { FILTERS } from "../constants/index";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  dueDate?: string; // Format "2026-04-15"
  createdAt: number;
}

export type Filter = (typeof FILTERS)[keyof typeof FILTERS];

export type Priority = "high" | "medium" | "low";
