export interface Team {
  id: string;
  name: string;
  color: string;
}

export interface TeamScore {
  teamId: string;
  score: number;
}

export interface AppState {
  teams: Team[];
  scores: Record<string, number>; // teamId -> score
  assignedAnswers: Record<string, { teamId: string; score: number }>; // answerKey -> { teamId, score }
}

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
