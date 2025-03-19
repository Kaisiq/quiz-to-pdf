import type { Quiz } from "~/types/quiz";

const quizToHtml = (quiz: Quiz) => `
    <div class="w-[100%] h-[100%] p-16">
      <h1 class="text-center pb-6 text-4xl">${quiz.title}</h1>
      <h3 class="text-center text-2xl pb-12 text-wrap">${quiz.description}</h3>
      <div class="p-12 grid ${quiz.columns} gap-10 justify-center items-stretch justify-items-stretch">
      ${quiz.questions
        .map(
          (question) => `
          <div class="w-fit flex flex-col" key=${question.id}>
            <h2 class="text-xl">${question.text}</h2>
            <ul class="flex flex-col">
              ${question.answers
                .map(
                  (answ) =>
                    `
                <li class="text-base" key=${answ.id}>${answ.text}</li>
              `,
                )
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
