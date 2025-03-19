import type { Question } from "./question";

export type Quiz = {
  title: string;
  description: string;
  columns: string;
  questions: Question[];
};
