import React, { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { scoreStyles } from "styles/scores";
import { Results } from "components";

export const FinalPage: React.FC = () => {
  useEffect(() => {
    const audio = new Audio("audio/victory-chime.mp3");
    audio.play().catch((e) => console.error("Error playing audio:", e));
  }, []);

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
      <Results />
    </Box>
  );
};
