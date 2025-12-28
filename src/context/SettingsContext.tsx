import React, { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "utils";

interface SettingsContextType {
  showAllAnswers: boolean;
  setShowAllAnswers: (show: boolean) => void;
  roundMultipliers: Record<number, number>;
  setRoundMultiplier: (roundId: number, multiplier: number) => void;
  pointsAsScore: boolean;
  setPointsAsScore: (use: boolean) => void;
  showScore: boolean;
  setShowScore: (show: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showAllAnswers, setShowAllAnswers] = useLocalStorage<boolean>(
    "showAllAnswers",
    false
  );
  const [pointsAsScore, setPointsAsScore] = useLocalStorage<boolean>(
    "usePointsAsScore",
    false
  );
  const [roundMultipliers, setRoundMultipliers] = useLocalStorage<
    Record<number, number>
  >("roundMultipliers", {});
  const [showScore, setShowScore] = useLocalStorage<boolean>("showScore", true);

  const setRoundMultiplier = (roundId: number, multiplier: number) => {
    setRoundMultipliers((prev: Record<number, number>) => ({
      ...prev,
      [roundId]: multiplier,
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        showAllAnswers,
        setShowAllAnswers,
        roundMultipliers,
        setRoundMultiplier,
        pointsAsScore,
        setPointsAsScore,
        showScore,
        setShowScore,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
