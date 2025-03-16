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

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

Sortable.mount(new Swap());

export default function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "",
      answers: [
        { id: 1, text: "", isCorrect: false },
        { id: 2, text: "", isCorrect: false },
      ],
    },
  ]);
  const [quizColumns, setQuizColumns] = useState("grid-cols-2");

  const contentRef = useRef(null);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: "",
      answers: [
        { id: 1, text: "", isCorrect: false },
        { id: 2, text: "", isCorrect: false },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };

  const addAnswer = (questionId: number) => {
    setQuestions(
      questions.map((q) => {
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
    );
  };

  const updateQuestionText = (questionId: number, text: string) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, text } : q)),
    );
  };

  const updateAnswerText = (
    questionId: number,
    answerId: number,
    text: string,
  ) => {
    setQuestions(
      questions.map((q) => {
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
    );
  };

  const toggleCorrectAnswer = (questionId: number, answerId: number) => {
    setQuestions(
      questions.map((q) => {
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
    );
  };

  const removeQuestion = (questionId: number) => {
    setQuestions(
      questions
        .filter((q) => q.id !== questionId)
        .map((q) => {
          if (q.id > questionId) {
            q.id = q.id - 1;
          }
          return q;
        }),
    );
  };

  const removeAnswer = (questionId: number, answerId: number) => {
    setQuestions(
      questions.map((q) => {
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
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quiz data:", { title: quizTitle, questions });
    //save quiz data to DB for user
  };

  const preview = async () => {
    const generatedHtml = `
        <div id="test" class="bg-white border border-gray-300 rounded-lg p-6 w-[210mm] min-h-[297mm] shadow-lg">
            <h1 class="text-2xl font-bold mb-4 text-center">Generated Test Paper</h1>
            <div class="grid grid-cols-1 gap-4">
                <div class="mb-4">
                    <p class="font-semibold mb-2">Question 1:</p>
                    <p>asd</p>
                </div>
                <div class="mb-4">
                    <p class="font-semibold mb-2">Question 2:</p>
                    <p>asd}</p>
                </div>
                <div class="mb-4">
                    <p class="font-semibold mb-2">Question 3:</p>
                    <p>asdasd}</p>
                </div>
            </div>
        </div>
    `;

    const container = document.createElement("div");
    container.innerHTML = generatedHtml;
    try {
      document.body.appendChild(container);
      await exportToPDF(container);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      document.body.removeChild(container); // remove the container after canvas is created.
    }
  };

  return (
    <div className="container w-full p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mx-[25%] flex flex-col items-center justify-center">
          <h1 className="mb-4 text-2xl font-bold">Create New Quiz</h1>

          <Input
            id="quiz-title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Enter quiz title"
            required
          />
          <Select
            onValueChange={(value) => {
              setQuizColumns(value);
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
          list={questions}
          setList={setQuestions}
          className={`grid ${quizColumns} items-center gap-5`}
        >
          {questions.map((question, qIndex) => (
            <QuestionCard
              key={qIndex}
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
