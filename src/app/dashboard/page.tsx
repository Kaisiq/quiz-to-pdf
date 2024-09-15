import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import {
  FileText,
  Plus,
  Settings,
  User,
  LogOut,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { HydrateClient } from "~/trpc/server";
import { UserButton } from "@clerk/nextjs";
import { LinkButton } from "~/components/ui/linkbutton";

export default async function Home() {
  const quizzes = [
    { id: 1, title: "Math Quiz", questions: 10, lastEdited: "2023-06-15" },
    { id: 2, title: "Science Trivia", questions: 15, lastEdited: "2023-06-14" },
    { id: 3, title: "History Test", questions: 20, lastEdited: "2023-06-13" },
    { id: 4, title: "Language Quiz", questions: 12, lastEdited: "2023-06-12" },
    {
      id: 5,
      title: "Geography Challenge",
      questions: 18,
      lastEdited: "2023-06-11",
    },
  ];
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
                <TableCell>{quiz.questions}</TableCell>
                <TableCell>{quiz.lastEdited}</TableCell>
                <TableCell className="text-right">
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
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Export as PDF
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </HydrateClient>
  );
}
