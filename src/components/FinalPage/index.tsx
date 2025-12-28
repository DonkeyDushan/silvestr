import React, { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useTeams } from "context";
import { scoreStyles } from "styles/scores";

export const FinalPage: React.FC = () => {
  const { teams, scores } = useTeams();

  useEffect(() => {
    const audio = new Audio("audio/victory-chime.mp3");
    audio.play().catch((e) => console.error("Error playing audio:", e));
  }, []);

  const sortedTeams = [...teams].sort((a, b) => {
    const scoreA = scores[a.id] || 0;
    const scoreB = scores[b.id] || 0;
    return scoreB - scoreA;
  });

  return (
    <Box sx={scoreStyles.root}>
      <Typography
        variant="h2"
        textAlign="center"
        gutterBottom
        sx={{ fontSize: { xs: "2.5rem", md: "3.75rem" } }}
      >
        Konečné pořadí
      </Typography>
      {sortedTeams.map((team, index) => (
        <Box key={team.id} sx={scoreStyles.scoreBox}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              height: "100%",
            }}
          >
            <Box sx={scoreStyles.rank}>{index + 1}.</Box>
            <Box
              sx={{
                ...scoreStyles.teamName,
                backgroundColor: team.color,
              }}
            >
              <Typography
                variant="h4"
                color={"primary.contrastText"}
                fontWeight={600}
                sx={{ fontSize: { xs: "1.25rem", md: "2.125rem" } }}
              >
                {team.name}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h4"
            color={"text.primary"}
            sx={{
              px: { xs: 2, md: 4 },
              fontWeight: "bold",
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
