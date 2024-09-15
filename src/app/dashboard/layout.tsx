import "~/styles/globals.css";
import { FileText, Settings } from "lucide-react";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-[10%] flex h-full bg-gray-100 dark:bg-gray-900">
      <aside className="hidden w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:block">
        <div className="flex h-14 items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center">
            <FileText className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-semibold text-gray-800 dark:text-white">
              QuizMaster
            </span>
          </Link>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <FileText className="mr-3 h-5 w-5" />
                My Quizzes
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
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
