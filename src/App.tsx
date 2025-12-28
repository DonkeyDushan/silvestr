import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Box,
  IconButton,
  Paper,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import {
  useNavigate,
  useParams,
  useSearchParams,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { dataset2024, dataset2025 } from "./data";
import { Answer, Team } from "./types";
import { useLocalStorage } from "./utils/useLocalStorage";
import { generatePages } from "./utils/pageUtils";
import { TeamScores } from "./components/TeamScores";
import { QuestionPage } from "./components/QuestionPage";
import { TeamManager } from "./components/TeamManager";

const DATASETS: Record<string, any> = {
  "2024": dataset2024,
  "2025": dataset2025,
};

function MainApp() {
  const navigate = useNavigate();
  const { datasetId = "2025" } = useParams<{ datasetId: string }>();
  const [searchParams] = useSearchParams();
  const pageIndex = parseInt(searchParams.get("p") || "0", 10);

  const [scores, setScores] = useLocalStorage<Record<string, number>>(
    "scores",
    {}
  );
  const [assignedAnswers, setAssignedAnswers] = useLocalStorage<
    Record<string, string>
  >("assignedAnswers", {});

  const dataset = DATASETS[datasetId] || dataset2025;

  useEffect(() => {
    if (DATASETS[datasetId]) {
      localStorage.setItem("lastDataset", datasetId);
    }
  }, [datasetId]);

  const pages = useMemo(() => generatePages(dataset), [dataset]);

  const currentPage = pages[pageIndex] || pages[0];

  const handlePageChange = (index: number) => {
    if (index >= 0 && index < pages.length) {
      navigate(`/${datasetId}?p=${index}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePageChange(pageIndex - 1);
      } else if (e.key === "ArrowRight") {
        handlePageChange(pageIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pageIndex, pages.length, datasetId]);

  const handleAddTeam = (name: string) => {
    const newTeam: Team = {
      id: Date.now().toString(),
      name: name,
    };
    setTeams([...teams, newTeam]);
  };

  const handleDeleteTeam = (id: string) => {
    setTeams(teams.filter((t) => t.id !== id));

    const newScores = { ...scores };
    delete newScores[id];
    setScores(newScores);

    const newAssigned = { ...assignedAnswers };
    Object.keys(newAssigned).forEach((key) => {
      if (newAssigned[key] === id) {
        delete newAssigned[key];
      }
    });
    setAssignedAnswers(newAssigned);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeAnswer, setActiveAnswer] = useState<Answer | null>(null);

  const handleAnswerClick = (
    event: React.MouseEvent<HTMLElement>,
    answer: Answer
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveAnswer(answer);
  };

  const handleAssignScore = (teamId: string | null) => {
    if (
      activeAnswer &&
      currentPage.type === "question" &&
      currentPage.question
    ) {
      const answerKey = `${datasetId}-${currentPage.round.id}-${currentPage.question.id}-${activeAnswer.id}`;
      const previousTeamId = assignedAnswers[answerKey];

      // Update scores
      const newScores = { ...scores };
      if (previousTeamId) {
        newScores[previousTeamId] =
          (newScores[previousTeamId] || 0) - activeAnswer.score;
      }
      if (teamId) {
        newScores[teamId] = (newScores[teamId] || 0) + activeAnswer.score;
      }

      // Update assignments
      const newAssigned = { ...assignedAnswers };
      if (teamId) {
        newAssigned[answerKey] = teamId;
      } else {
        delete newAssigned[answerKey];
      }

      setScores(newScores);
      setAssignedAnswers(newAssigned);
    }
    setAnchorEl(null);
    setActiveAnswer(null);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
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

        <Paper
          elevation={3}
          sx={{
            p: 4,
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <QuestionPage
            page={currentPage}
            datasetId={datasetId}
            teams={teams}
            assignedAnswers={assignedAnswers}
            onAnswerClick={handleAnswerClick}
          />
        </Paper>

        <TeamScores teams={teams} scores={scores} />
      </Container>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleAssignScore(null)}
      >
        <MenuItem onClick={() => handleAssignScore(null)}>
          <em>Nikdo</em>
        </MenuItem>
        <Divider />
        {teams.map((team) => (
          <MenuItem key={team.id} onClick={() => handleAssignScore(team.id)}>
            {team.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

function App() {
  const savedDataset = localStorage.getItem("lastDataset") || "2025";
  return (
    <Routes>
      <Route path="/:datasetId" element={<MainApp />} />
      <Route
        path="/"
        element={<Navigate to={`/${savedDataset}?p=0`} replace />}
      />
    </Routes>
  );
}

export default App;
