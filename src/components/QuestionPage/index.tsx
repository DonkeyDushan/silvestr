import React, { useState } from "react";
import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import { useTeams, usePage } from "context";
import { Answer } from "data";
import { TeamSelectMenu } from "components";
import { wrapperStyles } from "styles";

export const QuestionPage: React.FC = () => {
  const { teams, assignedAnswers } = useTeams();
  const { currentPage: page, datasetId } = usePage();

  const [activeAnswer, setActiveAnswer] = useState<Answer | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAnswerClick = (
    event: React.MouseEvent<HTMLElement>,
    answer: Answer
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveAnswer(answer);
  };

  if (page.type === "intro") {
    return (
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Round {page.round.id}
        </Typography>
        <Typography variant="h4">{page.round.text}</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={wrapperStyles.questionWrapper}>
      <Typography variant="h4" gutterBottom textAlign="center" mb={6}>
        {page.question?.question}
      </Typography>
      <Grid container spacing={2} alignContent={"center"} width={"100%"}>
        {page.question?.answers.map((answer) => {
          const answerKey = `${datasetId}-${page.round.id}-${page.question?.id}-${answer.id}`;
          const assignedTeamId = assignedAnswers[answerKey];
          const assignedTeam = teams.find((t) => t.id === assignedTeamId);
          return (
            <Grid size={6} key={answer.id}>
              <Button
                fullWidth
                variant={assignedTeam ? "contained" : "outlined"}
                onClick={(e) => handleAnswerClick(e, answer)}
                sx={{
                  justifyContent: "space-between",
                  py: 2,
                  fontSize: "1.2rem",
                  bgcolor: assignedTeam ? assignedTeam.color : "transparent",
                  color: assignedTeam ? "white" : "primary.main",
                  borderColor: assignedTeam ? "transparent" : "primary.main",
                  textShadow: assignedTeam
                    ? "1px 1px 2px rgba(0,0,0,0.5)"
                    : "none",
                  "&:hover": {
                    bgcolor: assignedTeam
                      ? assignedTeam.color
                      : "rgba(52, 72, 96, 0.08)",
                    opacity: assignedTeam ? 0.9 : 1,
                  },
                }}
              >
                <span>{answer.text}</span>
                <span>
                  {answer.score} pts {assignedTeam && `(${assignedTeam.name})`}
                </span>
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <TeamSelectMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        activeAnswer={activeAnswer}
        setActiveAnswer={setActiveAnswer}
      />
    </Paper>
  );
};
