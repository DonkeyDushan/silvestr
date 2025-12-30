import React from "react";
import { Typography, Box } from "@mui/material";
import { scoreStyles } from "styles/scores";
import { Results } from "components";
import { usePage } from "context";

export const RoundPage: React.FC = () => {
  const { currentPage: page } = usePage();

  return (
    <Box sx={scoreStyles.root}>
      <Typography
        variant="h2"
        textAlign="center"
        gutterBottom
        sx={{ fontSize: { xs: "2.5rem", md: "3.75rem" } }}
      >
        {page?.round?.text}
      </Typography>
      <Results />
    </Box>
  );
};
