import type { Question } from "./question";

export type Quiz = {
  id: number;
  title: string;
  description: string;
  columns: number;
  questions: Question[];
  lastEdited: string;
};
