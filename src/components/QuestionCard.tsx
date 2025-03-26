"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

const QuestionCard = ({
  question,
  qIndex,
  updateQuestionText,
  removeQuestion,
  toggleCorrectAnswer,
  updateAnswerText,
  removeAnswer,
  addAnswer,
}: {
  question: {
    id: number;
    text: string;
    answers: { id: number; isCorrect: boolean; text: string }[];
  };
  qIndex: number;
  updateQuestionText: (id: number, text: string) => void;
  removeQuestion: (id: number) => void;
  toggleCorrectAnswer: (question: number, answer: number) => void;
  updateAnswerText: (
    questionId: number,
    answerId: number,
    text: string,
  ) => void;
  removeAnswer: (questionId: number, answerId: number) => void;
  addAnswer: (questionId: number) => void;
}) => (
  <Card key={question.id} className="min-h-32 space-y-4 rounded-md border p-2">
    <CardHeader className="flex flex-row items-center gap-2 pb-0">
      <Textarea
        className="text-xl font-semibold"
        id={`question-${question.id}`}
        value={question.text}
        onChange={(e) => updateQuestionText(question.id, e.target.value)}
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
          <div key={answer.id} className="flex items-center space-x-2">
            <RadioGroupItem
              value={answer.id.toString()}
              id={`q${question.id}-a${answer.id}`}
              checked={answer.isCorrect}
              onClick={() => toggleCorrectAnswer(question.id, answer.id)}
            />
            <Input
              value={answer.text}
              onChange={(e) =>
                updateAnswerText(question.id, answer.id, e.target.value)
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
);

export default QuestionCard;
