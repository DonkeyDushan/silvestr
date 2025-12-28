export interface Answer {
  id: number;
  text: string;
  points: number;
  score: number;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export interface Round {
  id: number;
  text: string;
  questions: Question[];
}

export type Dataset = Round[];
