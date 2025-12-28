import React, { createContext, useContext, ReactNode } from "react";
import { Team, Answer, useLocalStorage } from "utils";

interface TeamContextType {
  teams: Team[];
  scores: Record<string, number>;
  assignedAnswers: Record<string, string>;
  addTeam: (name: string, color: string) => void;
  updateTeam: (id: string, name: string, color: string) => void;
  deleteTeam: (id: string) => void;
  assignScore: (
    datasetId: string,
    roundId: number,
    questionId: number,
    answer: Answer,
    teamId: string | null
  ) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [teams, setTeams] = useLocalStorage<Team[]>("teams", []);
  const [scores, setScores] = useLocalStorage<Record<string, number>>(
    "scores",
    {}
  );
  const [assignedAnswers, setAssignedAnswers] = useLocalStorage<
    Record<string, string>
  >("assignedAnswers", {});

  const addTeam = (name: string, color: string) => {
    const newTeam: Team = {
      id: Date.now().toString(),
      name: name,
      color: color,
    };
    setTeams([...teams, newTeam]);
  };

  const updateTeam = (id: string, name: string, color: string) => {
    setTeams(
      teams.map((t) => (t.id === id ? { ...t, name: name, color: color } : t))
    );
  };

  const deleteTeam = (id: string) => {
    setTeams(teams.filter((t) => t.id !== id));

    const newScores = { ...scores };
    delete newScores[id];
    setScores(newScores);

    const newAssigned = { ...assignedAnswers };
    Object.keys(newAssigned).forEach((key) => {
      if (newAssigned[key] === id) {
        delete newAssigned[key];
      }
    });
    setAssignedAnswers(newAssigned);
  };

  const assignScore = (
    datasetId: string,
    roundId: number,
    questionId: number,
    answer: Answer,
    teamId: string | null
  ) => {
    const answerKey = `${datasetId}-${roundId}-${questionId}-${answer.id}`;
    const previousTeamId = assignedAnswers[answerKey];

    // Update scores
    const newScores = { ...scores };
    if (previousTeamId) {
      newScores[previousTeamId] =
        (newScores[previousTeamId] || 0) - answer.score;
    }
    if (teamId) {
      newScores[teamId] = (newScores[teamId] || 0) + answer.score;
    }

    // Update assignments
    const newAssigned = { ...assignedAnswers };
    if (teamId) {
      newAssigned[answerKey] = teamId;
    } else {
      delete newAssigned[answerKey];
    }

    setScores(newScores);
    setAssignedAnswers(newAssigned);
  };

  return (
    <TeamContext.Provider
      value={{
        teams,
        scores,
        assignedAnswers,
        addTeam,
        updateTeam,
        deleteTeam,
        assignScore,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeams = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeams must be used within a TeamProvider");
  }
  return context;
};
