import "~/styles/globals.css";
import { FileText, Settings } from "lucide-react";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-[5%] mt-10 flex h-full rounded-md bg-background text-foreground dark:bg-foreground dark:text-background lg:mx-[0%] lg:mr-48">
      <aside className="hidden w-48 min-w-48 max-w-48 border-r border-foreground border-opacity-40 lg:block">
        <div className="flex h-14 items-center justify-center border-b border-foreground border-opacity-40 dark:border-background">
          <Link href="/" className="flex items-center">
            <FileText className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-semibold">QuizMaster</span>
          </Link>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="flex items-center rounded-md p-2 hover:bg-background-secondary dark:hover:bg-gray-700"
              >
                <FileText className="mr-3 h-5 w-5" />
                My Quizzes
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center rounded-md p-2 hover:bg-background-secondary dark:hover:bg-gray-700"
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      {children}
    </div>
  );
}
