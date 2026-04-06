import { FILTERS } from "../constants/index";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  createdAt: number;
}

export type Filter = (typeof FILTERS)[keyof typeof FILTERS];

export type Priority = "high" | "medium" | "low";
