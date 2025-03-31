export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export type GradingScale = {
  minScore: number;
  maxScore: number;
  grade: string;
}[];


export type Quiz = {
  title: string;
  description: string;
  showDesctiption: boolean;
  columns: string;
  questions: Question[];
  gradingScale: GradingScale;
};

export const basicQuiz = {
  title: "A perfect title",
  description: "Even more perfect description",
  showDesctiption: false,
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


export interface Dictionary {
  create: string,
  heroTitle: string,
  heroDescription: string,
  heroMainButton: string,
  heroSecondaryButton: string,
  featuresText: string,
  feat1Title: string,
  feat1Description: string,
  feat2Title: string,
  feat2Description: string,
  sectionTitle: string,
  sectionSubTitle: string,
  sectionDescription: string,
  backButton: string,
  createNewTitle: string,
  quizTitlePlaceholder: string,
  quizShowDescription: string,
  quizDescriptionPlaceholder: string,
  quizColumnsPlaceholder: string,
  quiz1Col: string,
  quiz2Col: string,
  quiz3Col: string,
  quizGradingShow: string,
  questionAdd: string,
  quizSave: string,
}
