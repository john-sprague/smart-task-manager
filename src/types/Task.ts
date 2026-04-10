import { FILTERS, PRIORITY_LEVELS } from "../constants/index";

export type Filter = (typeof FILTERS)[keyof typeof FILTERS];

export type Priority =
  (typeof PRIORITY_LEVELS)[keyof typeof PRIORITY_LEVELS]["value"];

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string; // Format "2026-04-15"
  createdAt: number;
}
