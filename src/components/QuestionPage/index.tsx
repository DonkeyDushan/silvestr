import React, { useState } from "react";
import { Box, Typography, Grid, Button, Paper, alpha } from "@mui/material";
import { useTeams, usePage } from "context";
import { Answer } from "data";
import { TeamSelectMenu } from "components";
import { wrapperStyles, questionStyles } from "styles";

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
    <Box sx={wrapperStyles.questionWrapper}>
      <Typography variant="h4" gutterBottom textAlign="center" mb={6}>
        {page.question?.question}
      </Typography>
      <Grid container spacing={4} alignContent={"center"} width={"100%"}>
        {page.question?.answers.map((answer) => {
          const answerKey = `${datasetId}-${page.round.id}-${page.question?.id}-${answer.id}`;
          const assignedTeamId = assignedAnswers[answerKey];
          const assignedTeam = teams.find((t) => t.id === assignedTeamId);
          return (
            <Grid size={6} key={answer.id}>
              <Button
                fullWidth
                variant={"contained"}
                onClick={(e) => handleAnswerClick(e, answer)}
                sx={[questionStyles.answer]}
              >
                <Box
                  sx={{
                    color: "text.primary",
                    visibility: assignedTeam ? "visible" : "hidden",
                  }}
                >
                  {answer.text}
                </Box>
                <Box
                  sx={[
                    questionStyles.points,
                    assignedTeam
                      ? {
                          bgcolor: alpha(assignedTeam.color, 0.5),
                        }
                      : {},
                  ]}
                >
                  {answer.points}
                </Box>
                <Box
                  sx={[
                    questionStyles.points,
                    questionStyles.score,
                    assignedTeam
                      ? {
                          bgcolor: alpha(assignedTeam.color, 0.5),
                        }
                      : {},
                  ]}
                >
                  {answer.score} bodů
                </Box>
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
    </Box>
  );
};
