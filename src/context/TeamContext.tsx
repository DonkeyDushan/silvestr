import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { Team, Answer, useLocalStorage, Dataset } from "utils";
import { useSettings } from "./SettingsContext";
import { dataset2024, dataset2025 } from "../data";

const datasets: Record<string, Dataset> = {
  "2024": dataset2024,
  "2025": dataset2025,
};

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
  resetScores: () => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { pointsAsScore, roundMultipliers } = useSettings();
  const [teams, setTeams] = useLocalStorage<Team[]>("teams", []);
  const [assignedAnswers, setAssignedAnswers] = useLocalStorage<
    Record<string, string>
  >("assignedAnswers", {});

  const scores = useMemo(() => {
    const newScores: Record<string, number> = {};
    teams.forEach((t) => (newScores[t.id] = 0));

    Object.entries(assignedAnswers).forEach(([key, teamId]) => {
      const [datasetId, roundId, questionId, answerId] = key.split("-");
      const dataset = datasets[datasetId];
      if (!dataset) return;

      const round = dataset.find((r) => r.id === parseInt(roundId));
      const question = round?.questions.find(
        (q) => q.id === parseInt(questionId)
      );
      const answer = question?.answers.find(
        (a) => a.id === parseInt(answerId)
      );

      if (answer) {
        const multiplier = roundMultipliers[parseInt(roundId)] || 1;
        const value = pointsAsScore ? answer.points : answer.score;
        newScores[teamId] = (newScores[teamId] || 0) + value * multiplier;
      }
    });
    return newScores;
  }, [assignedAnswers, teams, pointsAsScore, roundMultipliers]);

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

    // Update assignments
    const newAssigned = { ...assignedAnswers };
    if (teamId) {
      newAssigned[answerKey] = teamId;
    } else {
      delete newAssigned[answerKey];
    }

    setAssignedAnswers(newAssigned);
  };

  const resetScores = () => {
    setAssignedAnswers({});
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
        resetScores,
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
