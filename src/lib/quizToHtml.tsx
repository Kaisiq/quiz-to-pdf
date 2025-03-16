import type { Question } from "~/types/question";

const quizToHtml = (quizTitle: string, questions: Question[]) => `
    <div>
      <h1>${quizTitle}</h1>
      ${questions
        .map(
          (question) => `
          <div key=${question.id}>
            <h2>${question.text}</h2>
            <ul>
              ${question.answers
                .map(
                  (answ) =>
                    `
                <li key=${answ.id}>${answ.text}</li>
              `,
                )
                .join()}
            </ul>
          </div>
        `,
        )
        .join()}
    </div>
  `;

export { quizToHtml };
