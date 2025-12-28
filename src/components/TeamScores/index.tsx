import React from "react";
import { Typography, Box } from "@mui/material";
import { useTeams } from "context";
import { scoreStyles } from "styles/scores";

export const TeamScores: React.FC = () => {
  const { teams, scores } = useTeams();
  return (
    <Box
      sx={{
        spacing: { xs: 2, md: 4 },
        mt: { xs: 2, md: 4 },
        display: "flex",
        flexWrap: "wrap",
        gap: { xs: 2, md: 4 },
        justifyContent: "center",
      }}
    >
      {teams.map((team) => (
        <Box
          key={team.id}
          sx={[
            scoreStyles.scoreBox,
            { width: { xs: "100%", sm: "calc(50% - 16px)", md: "auto" } },
          ]}
        >
          <Box sx={[scoreStyles.teamName, { backgroundColor: team.color }]}>
            <Typography
              variant="h4"
              color={"primary.contrastText"}
              sx={{ fontSize: { xs: "1.25rem", md: "2.125rem" } }}
            >
              {team.name}
            </Typography>
          </Box>
          <Typography
            variant="h4"
            color={"text.primary"}
            sx={{
              py: 2,
              px: { xs: 2, md: 4 },
              fontSize: { xs: "1.25rem", md: "2.125rem" },
            }}
          >
            {scores[team.id] || 0}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
