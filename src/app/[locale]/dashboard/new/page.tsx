import api from "~/lib/api";
import CreateQuiz from "./pageContent";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await api.dictionaries.fetch(locale);

  return <CreateQuiz dictionary={dictionary} />;
}
