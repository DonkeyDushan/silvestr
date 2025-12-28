export const questionStyles = {
  points: {
    color: "text.primary",
    px: { xs: 1.5, md: 3 },
    height: "100%",
    alignContent: "center",
    fontWeight: "bold",
    backgroundColor: "background.paper",
  },
  score: {
    borderRadius: "0 2 2 0",
    ml: "2px",
  },
  answer: {
    fontSize: { xs: "1rem", md: "1.2rem" },
    display: "grid",
    gridTemplateColumns: "1fr auto auto",
    alignContent: "center",
    justifyItems: "start",
    gridTemplateRows: "1fr",
    p: 0,
    paddingLeft: { xs: 1.5, md: 3 },
    minHeight: { xs: "3.5rem", md: "5rem" },
    borderRadius: 4,
    backgroundColor: "extraBackgrounds.darker",
    overflow: "hidden",
  },
};
