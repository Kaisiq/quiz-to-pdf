"use client";

import { LinkButton } from "~/components/ui/linkbutton";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Plus, Trash2, Save } from "lucide-react";
import { ReactSortable } from "react-sortablejs";
import { Swap } from "sortablejs";
import Sortable from "sortablejs";

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
    // Here you would typically send the quiz data to your backend
    console.log("Quiz data:", { title: quizTitle, questions });
    // You could also add validation here before submitting
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
        </div>
        <ReactSortable
          swap
          list={questions}
          setList={setQuestions}
          className="grid grid-cols-2 items-center gap-5"
        >
          {questions.map((question, qIndex) => (
            <Card
              key={question.id}
              className="min-h-32 space-y-4 rounded-md border p-2"
            >
              <CardHeader className="flex flex-row items-center gap-2 pb-0">
                <Textarea
                  className="text-xl font-semibold"
                  id={`question-${question.id}`}
                  value={question.text}
                  onChange={(e) =>
                    updateQuestionText(question.id, e.target.value)
                  }
                  placeholder={`Question ${qIndex + 1}`}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="high"
                  onClick={() => removeQuestion(question.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <RadioGroup>
                  {question.answers.map((answer, aIndex) => (
                    <div
                      key={answer.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={answer.id.toString()}
                        id={`q${question.id}-a${answer.id}`}
                        checked={answer.isCorrect}
                        onClick={() =>
                          toggleCorrectAnswer(question.id, answer.id)
                        }
                      />
                      <Input
                        value={answer.text}
                        onChange={(e) =>
                          updateAnswerText(
                            question.id,
                            answer.id,
                            e.target.value,
                          )
                        }
                        placeholder={`Answer ${aIndex + 1}`}
                        required
                        className="flex-grow"
                      />
                      {question.answers.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAnswer(question.id, answer.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </RadioGroup>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addAnswer(question.id)}
                >
                  <Plus /> Add Answer
                </Button>
              </CardContent>
            </Card>
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

          <LinkButton href="/dashboard">
            <Trash2 />
          </LinkButton>
        </div>
      </form>
    </div>
  );
}
