import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { PageType } from "../utils/pageUtils";
import { Team, Answer } from "../types";

interface QuestionPageProps {
  page: PageType;
  datasetId: string;
  teams: Team[];
  assignedAnswers: Record<string, string>;
  onAnswerClick: (event: React.MouseEvent<HTMLElement>, answer: Answer) => void;
}

export const QuestionPage: React.FC<QuestionPageProps> = ({
  page,
  datasetId,
  teams,
  assignedAnswers,
  onAnswerClick,
}) => {
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
    <Box width="100%">
      <Typography variant="h4" gutterBottom textAlign="center">
        {page.question?.question}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {page.question?.answers.map((answer) => {
          const answerKey = `${datasetId}-${page.round.id}-${page.question?.id}-${answer.id}`;
          const assignedTeamId = assignedAnswers[answerKey];
          const assignedTeam = teams.find((t) => t.id === assignedTeamId);
          return (
            <Grid size={12} key={answer.id}>
              <Button
                fullWidth
                variant={assignedTeam ? "contained" : "outlined"}
                color={assignedTeam ? "success" : "primary"}
                onClick={(e) => onAnswerClick(e, answer)}
                sx={{
                  justifyContent: "space-between",
                  py: 2,
                  fontSize: "1.2rem",
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
    </Box>
  );
};
