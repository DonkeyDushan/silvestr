import { Round, Question } from "./types";

export type PageType = {
  type: "intro" | "question" | "final";
  round?: Round;
  question?: Question;
  index: number;
};

export function generatePages(dataset: Round[]): PageType[] {
  const p: PageType[] = [];
  dataset.forEach((round: Round) => {
    p.push({ type: "intro", round, index: p.length });
    round.questions.forEach((q) => {
      p.push({ type: "question", round, question: q, index: p.length });
    });
  });
  p.push({ type: "final", index: p.length });
  return p;
}
