"use client";

import { LinkButton } from "~/components/ui/linkbutton";
import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Plus, Trash2, Save, Download } from "lucide-react";
import { ReactSortable } from "react-sortablejs";
import { Swap } from "sortablejs";
import Sortable from "sortablejs";
import QuestionCard from "~/components/QuestionCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { exportToPDF } from "~/lib/exportToPDF";
import { quizToHtml } from "~/lib/quizToHtml";
import type { Question } from "~/types/question";
import type { Quiz } from "~/types/quiz";

Sortable.mount(new Swap());

export default function CreateQuiz() {
  const [quiz, setQuiz] = useState<Quiz>({
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
  });

  const contentRef = useRef(null);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: quiz.questions.length + 1,
      text: `Question #${quiz.questions.length + 1}`,
      answers: [
        { id: 1, text: "Answer 1", isCorrect: false },
        { id: 2, text: "Answer 2", isCorrect: false },
      ],
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const addAnswer = (questionId: number) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [
              ...q.answers,
              { id: q.answers.length + 1, text: "", isCorrect: false },
            ],
          };
        }
        return q;
      }),
    });
  };

  const updateQuestionText = (questionId: number, text: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q) =>
        q.id === questionId ? { ...q, text } : q,
      ),
    });
  };

  const updateAnswerText = (
    questionId: number,
    answerId: number,
    text: string,
  ) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map((a) =>
              a.id === answerId ? { ...a, text } : a,
            ),
          };
        }
        return q;
      }),
    });
  };

  const toggleCorrectAnswer = (questionId: number, answerId: number) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map((a) => ({
              ...a,
              isCorrect: a.id === answerId,
            })),
          };
        }
        return q;
      }),
    });
  };

  const removeQuestion = (questionId: number) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions
        .filter((q) => q.id !== questionId)
        .map((q) => {
          if (q.id > questionId) {
            q.id = q.id - 1;
          }
          return q;
        }),
    });
  };

  const removeAnswer = (questionId: number, answerId: number) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers
              .filter((a) => a.id !== answerId)
              .map((a) => {
                if (a.id > answerId) {
                  a.id--;
                }
                return a;
              }),
          };
        }
        return q;
      }),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quiz data:", quiz);
    //save quiz data to DB for user
  };

  const preview = async () => {
    const outerContainer = document.createElement("div");
    outerContainer.className = "w-[100vw] h-[100vh]"; /*top-[10000px] */
    outerContainer.style.position = "absolute";

    const container = document.createElement("div");
    container.innerHTML = quizToHtml(quiz);

    outerContainer.appendChild(container);

    try {
      document.body.appendChild(outerContainer);
      await exportToPDF(container);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // document.body.removeChild(outerContainer);
    }
  };

  return (
    <div className="container w-full p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mx-[25%] flex flex-col items-center justify-center">
          <h1 className="mb-4 text-2xl font-bold">Create New Quiz</h1>

          <Input
            id="quiz-title"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            placeholder="Enter quiz title"
            required
          />
          <Select
            onValueChange={(value) => {
              setQuiz({ ...quiz, columns: value });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="How much columns per row" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid-cols-1">1 Column</SelectItem>
              <SelectItem value="grid-cols-2">2 Columns</SelectItem>
              <SelectItem value="grid-cols-3">3 Columns</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ReactSortable
          ref={contentRef}
          swap
          list={quiz.questions}
          setList={(newQuestions) =>
            setQuiz({ ...quiz, questions: newQuestions })
          }
          className={`grid ${quiz.columns} items-center gap-5`}
        >
          {quiz.questions.map((question, qIndex) => (
            <QuestionCard
              key={question.id}
              question={question}
              qIndex={qIndex}
              updateAnswerText={updateAnswerText}
              addAnswer={addAnswer}
              updateQuestionText={updateQuestionText}
              removeAnswer={removeAnswer}
              removeQuestion={removeQuestion}
              toggleCorrectAnswer={toggleCorrectAnswer}
            />
          ))}
          <Button
            className="mx-auto my-[8.5rem] w-1/2 items-center"
            type="button"
            variant="outline"
            onClick={addQuestion}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Question
          </Button>
        </ReactSortable>

        <div className="flex justify-center gap-5">
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" /> Save Quiz
          </Button>

          <Button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              await preview();
            }}
          >
            <Download />
          </Button>

          <LinkButton href="/dashboard">
            <Trash2 />
          </LinkButton>
        </div>
      </form>
    </div>
  );
}
