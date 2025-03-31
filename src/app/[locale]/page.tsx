import Link from "next/link";
import { HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { FileText, CheckCircle, Download } from "lucide-react";
import { LinkButton } from "~/components/ui/linkbutton";
import api from "~/lib/api";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await api.dictionaries.fetch(locale);

  return (
    <HydrateClient>
      <div className="mt-10 bg-background text-foreground">
        <header className="mx-[15%] flex flex-row justify-between">
          <Link className="flex items-center justify-center" href="#">
            <FileText className="h-6 w-6" />
            <span className="ml-2 text-lg font-bold">QuizMaster</span>
          </Link>
          <div className="flex gap-5">
            <LinkButton href={`/${locale}/dashboard/new`}>
              {dictionary.create}
            </LinkButton>
          </div>
        </header>
        <main className="flex-1">
          <section className="mx-[15%] py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    {dictionary.heroTitle}
                  </h1>
                  <p className="mx-auto max-w-[700px] text-foreground opacity-80 dark:text-background md:text-xl">
                    {dictionary.heroDescription}
                  </p>
                </div>
                <div className="space-x-4">
                  <LinkButton href={`/${locale}/dashboard/new`}>
                    {dictionary.heroMainButton}
                  </LinkButton>
                  <Button variant="outline">
                    {dictionary.heroSecondaryButton}
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section
            id="features"
            className="w-full bg-background-secondary py-12 dark:bg-background md:py-24 lg:py-32"
          >
            <div className="mx-[15%] px-4 md:px-6">
              <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
                {dictionary.featuresText}
              </h2>
              <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col items-center space-y-3 text-center">
                  <CheckCircle className="h-12 w-12 dark:text-background" />
                  <h3 className="text-xl font-bold">{dictionary.feat1Title}</h3>
                  <p className="opacity-70 dark:text-foreground">
                    {dictionary.feat1Description}
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3 text-center">
                  <Download className="h-12 w-12 dark:text-background" />
                  <h3 className="text-xl font-bold">{dictionary.feat2Title}</h3>
                  <p className="opacity-70 dark:text-foreground">
                    {dictionary.feat2Description}
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
                    {dictionary.sectionTitle}
                  </h2>
                  <p className="max-w-[600px] text-foreground opacity-70 dark:text-background md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {dictionary.sectionSubTitle}
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <LinkButton href={`/${locale}/dashboard/new`}>
                    {dictionary.create}
                  </LinkButton>
                  <p className="text-xs text-foreground opacity-70 dark:text-background">
                    {dictionary.sectionDescription}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="mx-[15%] flex shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
          <p className="text-xs text-foreground dark:text-background">
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
