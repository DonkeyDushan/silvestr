import { Container, Box, IconButton } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { Routes, Route, Navigate } from "react-router-dom";
import { TeamScores } from "./components/TeamScores";
import { QuestionPage } from "./components/QuestionPage";
import { TopBar } from "./components/TopBar";
import { TeamProvider, PageProvider, usePage } from "./context";

function MainApp() {
  const { pageIndex, pages, handlePageChange } = usePage();

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <TopBar />
      <Container sx={{ mt: 4, position: "relative", pb: 10 }}>
        <IconButton
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
          sx={{
            position: "fixed",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>

        <IconButton
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex === pages.length - 1}
          sx={{
            position: "fixed",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>

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
