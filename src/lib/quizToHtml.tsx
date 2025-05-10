import type { Question } from "./types";
import type { Quiz } from "./types";
import { a4Height } from "./exportToPDF";

const letters = [
  "a) ",
  "b) ",
  "c) ",
  "d) ",
  "e) ",
  "f) ",
  "g) ",
  "h) ",
  "i) ",
  "j) ",
];

const questionsGap = 40;
const paddingPage = 64;
const questionsPadding = 48;

function getHeight(html: string) {
  const container = document.createElement("div");
  container.className = "top-[100000vh]";
  container.style.position = "absolute";

  container.innerHTML = html;
  document.body.appendChild(container);
  const height = container.offsetHeight;
  document.body.removeChild(container);
  return height;
}

function getHeightQuestions(questions: Question[]) {
  if (questions.length <= 0 || !questions[0]) {
    return 0;
  }
  let minValue = Number(getHeight(generateQuestionHtml(questions[0])));

  for (const question of questions) {
    if (question) {
      minValue = Math.min(
        minValue,
        Number(getHeight(generateQuestionHtml(question))),
      );
    } else return minValue;
  }
  return Number(minValue) + questionsGap;
}

const generateQuestionHtml = (question: Question) => `
<div class="w-full m-auto flex flex-col" key=${question.id}>
  <h2 class="text-3xl">${question.text}</h2>
  <ul class="pt-4 gap-2 pl-4 flex flex-col">
    ${question.answers
      .map((answ, idx) => {
        const letter = letters[idx];
        return `<li class="text-2xl" key=${answ.id}>${letter}${answ.text}</li>`;
      })
      .join("")}
  </ul>
</div>
`;

const titleHtml = (title: string) =>
  title ? `<h1 class="text-center pb-6 text-7xl">${title}</h1>` : "";

const descriptionHtml = (description: string) =>
  description
    ? `<h3 class="text-center text-4xl pb-12 text-wrap">${description}</h3>`
    : "";

const questionsDivHtml = (
  columns: string,
  questions: Question[],
) => `<div class="py-12 px-20 grid ${columns} gap-10">
${questions.map((question) => generateQuestionHtml(question)).join("")}
</div>`;

const pageHtml = (quiz: Quiz) => `
    <section class="w-[var(--150-dpi-width)] h-[var(--150-dpi-height)] p-16">
      ${titleHtml(quiz.title)}
      ${quiz.showDesctiption ? descriptionHtml(quiz.description) : ""}
      ${questionsDivHtml(quiz.columns, quiz.questions)}
    </section>
  `;

function splitToColumns(questions: Question[], columns: number) {
  const result = [];
  for (let i = 0; i < questions.length; i += columns) {
    result.push(questions.slice(i, i + columns));
  }
  return result;
}

function howMuchRowsToRender(splitQuestions: Question[][], height: number) {
  let result = 0;
  let currentHeight = height;
  while (true) {
    const current = splitQuestions?.[result];
    if (!current) break;
    const rowHeight = getHeightQuestions(current);
    console.log(currentHeight, rowHeight);

    if (rowHeight > currentHeight) {
      break;
    }
    currentHeight -= rowHeight;
    result++;
  }
  console.log(result);
  return result;
}

function quizToHtml(quiz: Quiz) {
  const screenHeight = a4Height - 2 * paddingPage;

  const columns =
    quiz.columns === "grid-cols-3" ? 3 : quiz.columns === "grid-cols-1" ? 1 : 2;
  let splitQuestions = splitToColumns(quiz.questions, columns);
  const titleHeight = getHeight(titleHtml(quiz.title));
  const descriptionHeight = quiz.showDesctiption
    ? getHeight(descriptionHtml(quiz.description))
    : 0;

  const firstPageQuestionHeight =
    screenHeight - titleHeight - descriptionHeight - 2 * questionsPadding;

  let pages = "";

  while (splitQuestions.length > 0) {
    const renderNQuestions = howMuchRowsToRender(
      splitQuestions,
      firstPageQuestionHeight,
    );
    const renderQuestions = splitQuestions.slice(0, renderNQuestions);
    splitQuestions = splitQuestions.slice(renderNQuestions);
    pages += pageHtml({ ...quiz, questions: renderQuestions.flat() });
  }

  return `<div>${pages}</div>`;
}

export { quizToHtml };
