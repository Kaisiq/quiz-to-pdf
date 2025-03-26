import type { GradingScale } from "./gradingScale";
import type { Question } from "./question";

export type Quiz = {
  title: string;
  description: string;
  columns: string;
  questions: Question[];
  gradingScale: GradingScale;
};


export const basicQuiz = {
  title: "A perfect title",
  description: "Even more perfect description",
  questions: [
    {
      id: 1,
      text: "Question number 1",
      answers: [
        { id: 1, text: "Answer 1", isCorrect: false },
        { id: 2, text: "Answer 2", isCorrect: false },
      ],
    },
  ],
  columns: "grid-cols-2",
  gradingScale: [{ minScore: 0, maxScore: 0, grade: "" }],
  } as Quiz;
