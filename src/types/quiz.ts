import type { GradingScale } from "./gradingScale";
import type { Question } from "./question";

export type Quiz = {
  title: string;
  description: string;
  columns: string;
  questions: Question[];
  gradingScale: GradingScale;
};
