import { FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

type Quiz = {
  id: number;
  title: string;
  description: string;
  columns: number;
  questions: {
    id: number;
    text: string;
    answers: {
      id: number;
      text: string;
      isCorrect: boolean;
    }[];
  }[];
  lastEdited: string;
};

export const ExportDialog = ({ quiz }: { quiz: Quiz }) => {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{quiz.title}</DialogTitle>
          <DialogDescription>Preview</DialogDescription>
          <div className="rounded-md border p-5">
            <div className="flex flex-col gap-1 pb-3">
              <h1 className="text-center font-bold">{quiz.title}</h1>
              <h2 className="text-center text-sm text-gray-600">
                {quiz.description}
              </h2>
            </div>
            <ol className={`grid grid-cols-${quiz.columns} gap-5`}>
              {quiz.questions.map((q) => {
                return (
                  <li
                    key={q.id}
                    className="flex flex-col items-center text-left"
                  >
                    <h3>{q.text}</h3>

                    <ul>
                      {q.answers.map((a) => {
                        return <li key={a.id}>{a.text}</li>;
                      })}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </div>
        </DialogHeader>
      </DialogContent>
    </>
  );
};
