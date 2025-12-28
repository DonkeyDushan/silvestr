import { Container, Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { TeamScores, TopBar, QuestionPage, PageChevrons } from "components";
import { TeamProvider, PageProvider } from "context";

function MainApp() {
  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <TopBar />
      <Container sx={{ mt: 4, position: "relative", pb: 10 }}>
        <PageChevrons />
        <QuestionPage />
        <TeamScores />
      </Container>
    </Box>
  );
}

function App() {
  const savedDataset = localStorage.getItem("lastDataset") || "2025";
  return (
    <TeamProvider>
      <Routes>
        <Route
          path="/:datasetId"
          element={
            <PageProvider>
              <MainApp />
            </PageProvider>
          }
        />
        <Route
          path="/"
          element={<Navigate to={`/${savedDataset}?p=0`} replace />}
        />
      </Routes>
    </TeamProvider>
  );
}

export default App;
