export interface Team {
  id: string;
  name: string;
}

export interface TeamScore {
  teamId: string;
  score: number;
}

export interface AppState {
  teams: Team[];
  scores: Record<string, number>; // teamId -> score
  assignedAnswers: Record<string, string>; // answerId (as string) -> teamId
}
