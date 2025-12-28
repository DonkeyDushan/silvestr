import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { useTeams } from "context";

export const TeamScores: React.FC = () => {
  const { teams, scores } = useTeams();
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Týmy a body
      </Typography>
      <Grid container spacing={2}>
        {teams.map((team) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={team.id}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "primary.light",
                color: "white",
              }}
            >
              <Typography variant="h6">{team.name}</Typography>
              <Typography variant="h4">{scores[team.id] || 0}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
