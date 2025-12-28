import React from "react";
import { Typography, Box } from "@mui/material";
import { useTeams } from "context";
import { scoreStyles } from "styles/scores";

export const TeamScores: React.FC = () => {
  const { teams, scores } = useTeams();
  return (
    <Box sx={{ spacing: 4, mt: 4, display: "flex", flexWrap: "wrap", gap: 4 }}>
      {teams.map((team) => (
        <Box key={team.id} sx={scoreStyles.scoreBox}>
          <Box sx={[scoreStyles.teamName, { backgroundColor: team.color }]}>
            <Typography variant="h4" color={"primary.contrastText"}>
              {team.name}
            </Typography>
          </Box>
          <Typography variant="h4" color={"text.primary"} sx={{ py: 2, px: 4 }}>
            {scores[team.id] || 0}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
