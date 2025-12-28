import { Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { TeamScores, TopBar, QuestionPage, PageChevrons } from "components";
import { TeamProvider, PageProvider, SettingsProvider } from "context";
import { wrapperStyles } from "./styles";

function MainApp() {
  return (
    <Box sx={wrapperStyles.appWrapper}>
      <TopBar />
      <Box sx={wrapperStyles.contentWrapper}>
        <PageChevrons />
        <QuestionPage />
        <TeamScores />
      </Box>
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
              <SettingsProvider>
                <MainApp />
              </SettingsProvider>
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
