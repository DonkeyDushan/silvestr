export const wrapperStyles = {
  appWrapper: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    height: "100vh",
    bgcolor: "background.default",
    alignItems: "center",
  },
  contentWrapper: {
    display: "grid",
    gridTemplateRows: "1fr auto",
    pb: 6,
    width: { xs: "95vw", md: "80vw" },
    height: "100%",
    justifySelf: "center",
  },
  questionWrapper: {
    minHeight: "400px",
    display: "grid",
    gridTemplateRows: "auto 1fr",
    backgroundColor: "transparent",
  },
};
