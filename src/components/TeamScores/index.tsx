import React from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { useTeams } from "context";

export const TeamScores: React.FC = () => {
  const { teams, scores } = useTeams();
  return (
    <Grid container spacing={2} mt={4}>
      {teams.map((team) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={team.id}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              bgcolor: team.color || "primary.light",
              color: "white",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            <Typography variant="h6">{team.name}</Typography>
            <Typography variant="h4">{scores[team.id] || 0}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
