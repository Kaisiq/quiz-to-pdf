import Link from "next/link";
import { HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { FileText, CheckCircle, Download } from "lucide-react";
import { LinkButton } from "~/components/ui/linkbutton";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="mt-10">
        <header className="mx-[15%] flex flex-row justify-between">
          <Link className="flex items-center justify-center" href="#">
            <FileText className="h-6 w-6" />
            <span className="ml-2 text-lg font-bold">QuizMaster</span>
          </Link>
          <div className="flex gap-5">
            <LinkButton href="/dashboard/new">Create Quiz</LinkButton>
          </div>
        </header>
        <main className="flex-1">
          <section className="mx-[15%] py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Create Quizzes with Ease
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                    Design, build, and export professional quizzes in minutes.
                    Perfect for teachers, trainers, and quiz enthusiasts.
                  </p>
                </div>
                <div className="space-x-4">
                  <LinkButton href="/dashboard/new">Get Started</LinkButton>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
          </section>
          <section
            id="features"
            className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32"
          >
            <div className="mx-[15%] px-4 md:px-6">
              <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
                Features
              </h2>
              <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col items-center space-y-3 text-center">
                  <CheckCircle className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Easy Quiz Creation</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Intuitive interface for creating quizzes with various
                    question types.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3 text-center">
                  <Download className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">PDF Export</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Export your quizzes as professional PDF documents.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
            <div className="flex justify-center px-4 md:px-6">
              <div className="flex w-[85%] flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Get Started Today
                  </h2>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Create a quiz using our website for free!
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <LinkButton href="/dashboard/new">Create a Quiz</LinkButton>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    The website is under heavy development and may want you to
                    sign up in the future.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="mx-[15%] flex shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 QuizMaster
          </p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </HydrateClient>
  );
}
