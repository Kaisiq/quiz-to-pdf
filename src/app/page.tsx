import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { FileText, CheckCircle, Share2, Download } from "lucide-react";
import { Input } from "~/components/ui/input";
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
            <SignedOut>
              <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  href="#features"
                >
                  Features
                </Link>
                <Link
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  href="#pricing"
                >
                  Pricing
                </Link>

                <Button>
                  <SignInButton />
                </Button>
              </nav>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors"
              >
                Dashboard
              </Link>
              <UserButton />
            </SignedIn>
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
                  <LinkButton href="#pricing">Get Started</LinkButton>
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
              <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col items-center space-y-3 text-center">
                  <CheckCircle className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Easy Quiz Creation</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Intuitive interface for creating quizzes with various
                    question types.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3 text-center">
                  <Share2 className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Share Online</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Share your quizzes online with a simple link.
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
          <section id="pricing" className="mx-[15%] py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
                Pricing Plans
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                  <h3 className="mb-4 text-center text-2xl font-bold">Basic</h3>
                  <p className="mb-4 text-center text-gray-500 dark:text-gray-400">
                    Perfect for individuals
                  </p>
                  <p className="mb-6 text-center text-4xl font-bold">
                    $9.99/mo
                  </p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>Create up to 10 quizzes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>Basic PDF export</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  <Button className="mt-auto">Choose Plan</Button>
                </div>
                <div className="flex flex-col rounded-lg bg-primary p-6 text-primary-foreground shadow-lg">
                  <h3 className="mb-4 text-center text-2xl font-bold">Pro</h3>
                  <p className="mb-4 text-center opacity-90">
                    Best for professionals
                  </p>
                  <p className="mb-6 text-center text-4xl font-bold">
                    $19.99/mo
                  </p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span>Unlimited quizzes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span>Advanced PDF customization</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Button className="mt-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    Choose Plan
                  </Button>
                </div>
                <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                  <h3 className="mb-4 text-center text-2xl font-bold">
                    Enterprise
                  </h3>
                  <p className="mb-4 text-center text-gray-500 dark:text-gray-400">
                    For large organizations
                  </p>
                  <p className="mb-6 text-center text-4xl font-bold">Custom</p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>Unlimited everything</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>White-labeling</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>Dedicated account manager</span>
                    </li>
                  </ul>
                  <Button className="mt-auto">Contact Sales</Button>
                </div>
              </div>
            </div>
          </section>
          <section
            id="contact"
            className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32"
          >
            <div className="flex justify-center px-4 md:px-6">
              <div className="flex w-[85%] flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Get Started Today
                  </h2>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join thousands of satisfied users and start creating amazing
                    quizzes now.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input
                      className="max-w-lg flex-1"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button type="submit">Subscribe</Button>
                  </form>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    By subscribing, you agree to our Terms of Service and
                    Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="mx-[15%] flex shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2023 QuizMaster Inc. All rights reserved.
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
