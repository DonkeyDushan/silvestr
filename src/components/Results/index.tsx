import { useTeams } from "context";
import { Box, Stack, Typography } from "@mui/material";
import { scoreStyles } from "styles/scores";

export const Results: React.FC = () => {
  const { teams, scores } = useTeams();

  const sortedTeams = [...teams].sort((a, b) => {
    const scoreA = scores[a.id] || 0;
    const scoreB = scores[b.id] || 0;
    return scoreB - scoreA;
  });

  return (
    <Stack gap={4}>
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
    </Stack>
  );
};
