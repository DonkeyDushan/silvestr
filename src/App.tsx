import { Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { TeamScores, TopBar, PageChevrons } from "components";
import { FinalPage, QuestionPage, RoundPage } from "pages";
import { TeamProvider, PageProvider, SettingsProvider, usePage } from "context";
import { wrapperStyles } from "./styles";

function MainApp() {
  const { currentPage } = usePage();

  return (
    <Box sx={wrapperStyles.appWrapper}>
      <TopBar />
      <Box sx={wrapperStyles.contentWrapper}>
        <PageChevrons />
        {currentPage.type === "final" && <FinalPage />}
        {currentPage.type === "intro" && <RoundPage />}
        {currentPage.type === "question" && (
          <>
            <QuestionPage /> <TeamScores />
          </>
        )}
      </Box>
    </Box>
  );
}

function App() {
  const savedDataset = localStorage.getItem("lastDataset") || "2025";
  return (
    <SettingsProvider>
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
    </SettingsProvider>
  );
}

export default App;
