import { FILTERS } from "../constants/index";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type Filter = (typeof FILTERS)[keyof typeof FILTERS];
