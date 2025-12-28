import { Dataset } from "./type";

export const dataset2024: Dataset = [
  {
    id: 1,
    text: "1. kolo",
    questions: [
      {
        id: 1,
        question: "Lorem ipsum dolor sit amet?",
        answers: [
          { id: 1, text: "This is random text", points: 32, score: 6 },
          { id: 2, text: "Another answer", points: 20, score: 5 },
        ],
      },
      {
        id: 1,
        question: "Lorem ipsum dolor sit amet?",
        answers: [{ id: 1, text: "", points: 1, score: 1 }],
      },
    ],
  },
];
