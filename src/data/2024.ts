import { Dataset } from "../utils/types";

export const dataset2024: Dataset = [
  {
    id: 1,
    text: "1. KOLO",
    questions: [
      {
        id: 1,
        question: "Co by si zákazník v lékárně kupoval šeptem?",
        answers: [
          { id: 1, text: "Viagru", points: 42, score: 6 },
          { id: 2, text: "Lék na hemoroidy", points: 23, score: 5 },
          { id: 3, text: "Kondomy", points: 18, score: 4 },
          { id: 4, text: "Postinor", points: 14, score: 3 },
          { id: 5, text: "Lék na krk/hlasivky", points: 13, score: 2 },
          { id: 6, text: "Drogy", points: 11, score: 1 },
        ],
      },
      {
        id: 2,
        question: "Co nebo koho by žena nechtěla potkat v lese?",
        answers: [
          { id: 1, text: "Muže", points: 73, score: 6 },
          { id: 2, text: "Medvěda", points: 22, score: 5 },
          { id: 3, text: "Úchyla", points: 17, score: 4 },
          { id: 4, text: "Divočáka", points: 9, score: 3 },
          { id: 5, text: "Mě", points: 6, score: 2 },
          { id: 6, text: "Vlka", points: 5, score: 1 },
        ],
      },
    ],
  },
  {
    id: 2,
    text: "2. kolo",
    questions: [
      {
        id: 3,
        question: "Lorem ipsum dolor sit amet?",
        answers: [
          { id: 1, text: "This is random text", points: 32, score: 6 },
          { id: 2, text: "Another answer", points: 20, score: 5 },
        ],
      },
      {
        id: 4,
        question: "Lorem ipsum dolor sit amet?",
        answers: [{ id: 1, text: "", points: 1, score: 1 }],
      },
    ],
  },
];
