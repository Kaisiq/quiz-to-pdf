import type { Quiz } from "~/types/quiz";

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

const quizToHtml = (quiz: Quiz) => `
    <div class="w-[100%] h-[100%] p-16">
      <h1 class="text-center pb-6 text-7xl">${quiz.title}</h1>
      <h3 class="text-center text-4xl pb-12 text-wrap">${quiz.description}</h3>
      <div class="py-12 px-20 grid ${quiz.columns} gap-10">
      ${quiz.questions
        .map(
          (question) => `
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
        `,
        )
        .join("")}
      </div>
    </div>
  `;

export { quizToHtml };
