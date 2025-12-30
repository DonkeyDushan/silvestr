import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTeams, usePage, useSettings } from "context";
import { Answer } from "data";
import { TeamSelectMenu } from "components";
import { wrapperStyles, questionStyles } from "styles";

export const QuestionPage: React.FC = () => {
  const { teams, assignedAnswers } = useTeams();
  const { currentPage: page, datasetId } = usePage();
  const { showAllAnswers, roundMultipliers, pointsAsScore, showScore } =
    useSettings();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      <Box
        textAlign="center"
        sx={{ display: "grid", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h2" fontWeight={600}>
          {page?.round?.text}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={wrapperStyles.questionWrapper}>
      <Typography
        variant="h3"
        gutterBottom
        textAlign="center"
        fontWeight={600}
        sx={{
          mt: { xs: 4, md: 14 },
          mb: { xs: 3, md: 6 },
          fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        {page.question?.question}
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        mb={{ xs: 6, md: 0 }}
        alignContent={"center"}
        width={"100%"}
      >
        {page.question?.answers.map((answer) => {
          const answerKey = `${datasetId}-${page?.round?.id}-${page.question?.id}-${answer.id}`;
          const assignedTeamId = assignedAnswers[answerKey];
          const assignedTeam =
            assignedTeamId === "0"
              ? null
              : teams.find((t) => t.id === assignedTeamId);
          return (
            <Grid size={{ xs: 12, md: 6 }} key={answer.id}>
              <Button
                fullWidth
                variant={"contained"}
                onClick={(e) => handleAnswerClick(e, answer)}
                sx={[
                  questionStyles.answer,
                  assignedTeam
                    ? { bgcolor: alpha(assignedTeam.color, 0.1) }
                    : {},
                ]}
              >
                <Box
                  sx={{
                    color: "text.primary",
                    visibility:
                      assignedTeam || showAllAnswers || assignedTeamId === "0"
                        ? "visible"
                        : "hidden",
                    fontWeight: 600,
                    fontSize: { xs: "1.1rem", md: "1.5rem" },
                    textAlign: "left",
                    flex: 1,
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
                    {
                      visibility:
                        assignedTeam || showScore || assignedTeamId === "0"
                          ? "visible"
                          : "hidden",
                    },
                  ]}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    minWidth={{ xs: "3ch", md: "4ch" }}
                    sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                  >
                    {answer.points *
                      (pointsAsScore
                        ? roundMultipliers[page?.round?.id || 1] || 1
                        : 1)}
                  </Typography>
                </Box>
                {!pointsAsScore && (
                  <Box
                    sx={[
                      questionStyles.points,
                      questionStyles.score,
                      assignedTeam
                        ? {
                            bgcolor: alpha(assignedTeam.color, 0.5),
                          }
                        : {},
                      {
                        visibility:
                          assignedTeam || showScore || assignedTeamId === "0"
                            ? "visible"
                            : "hidden",
                      },
                    ]}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      minWidth={{ xs: "6ch", md: "8ch" }}
                      sx={{ fontSize: { xs: "0.9rem", md: "1.25rem" } }}
                    >
                      {answer.score *
                        (roundMultipliers[page?.round?.id || 1] || 1)}
                      {isMobile ? " b." : " bodů"}
                    </Typography>
                  </Box>
                )}
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
