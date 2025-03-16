import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { FileText, Plus, MoreVertical, Pencil, Trash } from "lucide-react";
import { HydrateClient } from "~/trpc/server";
import { UserButton } from "@clerk/nextjs";
import { LinkButton } from "~/components/ui/linkbutton";
import { ExportDialog } from "../_components/exportDialog";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import type { Quiz } from "~/types/quiz";

export default async function Home() {
  const quizzes = [
    {
      id: 1,
      title: "Math Quiz",
      description: "Test for 9th grade, first semester. Score >60 for A",
      columns: 3,
      questions: [
        {
          id: 1,
          text: "Question One:",
          answers: [
            { id: 1, text: "option 1", isCorrect: false },
            { id: 2, text: "option 2", isCorrect: false },
          ],
        },
        {
          id: 2,
          text: "Question Two:",
          answers: [
            { id: 1, text: "1", isCorrect: false },
            { id: 2, text: "2", isCorrect: false },
          ],
        },
        {
          id: 3,
          text: "q3",
          answers: [
            { id: 1, text: "1", isCorrect: false },
            { id: 2, text: "2", isCorrect: false },
          ],
        },
        {
          id: 4,
          text: "Question Four:",
          answers: [
            { id: 1, text: "1", isCorrect: false },
            { id: 2, text: "2", isCorrect: false },
          ],
        },
        {
          id: 5,
          text: "Question Five:",
          answers: [
            { id: 1, text: "1", isCorrect: false },
            { id: 2, text: "2", isCorrect: false },
          ],
        },
      ],
      lastEdited: "2023-06-15",
    },
    {
      id: 2,
      columns: 3,
      title: "Science Trivia",
      questions: [],
      lastEdited: "2023-06-14",
    },
    {
      id: 3,
      columns: 3,
      title: "History Test",
      questions: [],
      lastEdited: "2023-06-13",
    },
    {
      id: 4,
      columns: 3,
      title: "Language Quiz",
      questions: [],
      lastEdited: "2023-06-12",
    },
    {
      id: 5,
      columns: 3,
      title: "Geography Challenge",
      questions: [],
      lastEdited: "2023-06-11",
    },
  ] as Quiz[];
  return (
    <HydrateClient>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <Input
            className="w-64"
            placeholder="Search quizzes..."
            type="search"
          />
          <div className="flex gap-5">
            <LinkButton href="/dashboard/new">
              <Plus className="mr-2 h-4 w-4" />
              Create New Quiz
            </LinkButton>
            <UserButton />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz Title</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Last Edited</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizzes.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell className="cursor-pointer font-medium">
                  {quiz.title}
                </TableCell>
                <TableCell>{quiz.questions.length}</TableCell>
                <TableCell>{quiz.lastEdited}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DialogTrigger asChild className="flex">
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Export as PDF
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <ExportDialog quiz={quiz} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </HydrateClient>
  );
}
