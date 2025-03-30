"use client";

import { Download, Plus, SkipBackIcon } from "lucide-react";
import { useRef, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Sortable, { Swap } from "sortablejs";
import QuestionCard from "~/components/QuestionCard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { LinkButton } from "~/components/ui/linkbutton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { exportToPDF } from "~/lib/exportToPDF";
import type { Question } from "~/types/question";
import { basicQuiz, type Quiz } from "~/types/quiz";
import GradingScaleInput from "~/components/GradingScaleInput";

Sortable.mount(new Swap());

export default function CreateQuiz() {
  const [quiz, setQuiz] = useState<Quiz>(basicQuiz);
  const [showDescription, setShowDescription] = useState(false);
  const [showGradingScale, setShowGradingScale] = useState(false);
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

  return (
    <div className="bg-background-secondary container relative w-full rounded-r-3xl p-4">
      <LinkButton href="/">
        <SkipBackIcon className="mr-2 h-4 w-4" /> Back
      </LinkButton>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-3 md:mx-[25%]">
          <h1 className="mb-4 text-2xl font-bold">Create New Quiz</h1>

          <Input
            className=""
            id="quiz-title"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            placeholder="Enter quiz title"
            required
          />
          <div className="flex w-full flex-col items-center gap-3 md:flex-row">
            <Textarea
              id="quiz-description"
              value={quiz.description}
              onChange={(e) =>
                setQuiz({ ...quiz, description: e.target.value })
              }
              placeholder="Enter quiz description"
            />
            <div className="flex items-center gap-1 md:flex-col">
              <span className="text-nowrap text-sm">Show in PDF?</span>
              <Switch
                checked={showDescription}
                onCheckedChange={(checked) => setShowDescription(checked)}
              />
            </div>
          </div>
          <Select
            onValueChange={(value) => {
              setQuiz({ ...quiz, columns: value });
            }}
          >
            <SelectTrigger className="sm:w-full md:w-[180px]">
              <SelectValue placeholder="How many columns per row" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid-cols-1">1 Column</SelectItem>
              <SelectItem value="grid-cols-2">2 Columns</SelectItem>
              <SelectItem value="grid-cols-3">3 Columns</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-nowrap text-sm">Grading Scale</span>
          <Switch
            checked={showGradingScale}
            onCheckedChange={(checked) => setShowGradingScale(checked)}
          />
        </div>
        {showGradingScale && (
          <GradingScaleInput
            gradingScale={quiz.gradingScale}
            setGradingScale={(newGradingScale) =>
              setQuiz({ ...quiz, gradingScale: newGradingScale })
            }
          />
        )}
        <ReactSortable
          ref={contentRef}
          swap
          list={quiz.questions}
          setList={(newQuestions) =>
            setQuiz({ ...quiz, questions: newQuestions })
          }
          className={`grid sm:grid-cols-1 md:grid-cols-2 lg:${quiz.columns} items-center gap-5`}
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
          <Button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              await exportToPDF(quiz);
            }}
          >
            <Download className="mr-2 h-4 w-4" /> Save as PDF
          </Button>
        </div>
      </form>
    </div>
  );
}
