import React, { useState, useEffect, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tabs,
  Tab,
  Paper,
  Menu,
  MenuItem,
  Grid,
  Divider,
  Select,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate, useParams, useSearchParams, Routes, Route, Navigate } from 'react-router-dom';
import { dataset2024, dataset2025, Round, Question, Answer } from './data';
import { Team } from './types';

const DATASETS: Record<string, any> = {
  '2024': dataset2024,
  '2025': dataset2025,
};

type PageType = {
  type: 'intro' | 'question';
  round: Round;
  question?: Question;
  index: number;
};

function MainApp() {
  const navigate = useNavigate();
  const { datasetId = '2025' } = useParams<{ datasetId: string }>();
  const [searchParams] = useSearchParams();
  const pageIndex = parseInt(searchParams.get('p') || '0', 10);

  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem('teams');
    return saved ? JSON.parse(saved) : [];
  });

  const [scores, setScores] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('scores');
    return saved ? JSON.parse(saved) : {};
  });

  const [assignedAnswers, setAssignedAnswers] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('assignedAnswers');
    return saved ? JSON.parse(saved) : {};
  });

  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');

  const dataset = DATASETS[datasetId] || dataset2025;

  useEffect(() => {
    if (DATASETS[datasetId]) {
      localStorage.setItem('lastDataset', datasetId);
    }
  }, [datasetId]);

  const pages = useMemo(() => {
    const p: PageType[] = [];
    dataset.forEach((round: Round) => {
      p.push({ type: 'intro', round, index: p.length });
      round.questions.forEach((q) => {
        p.push({ type: 'question', round, question: q, index: p.length });
      });
    });
    return p;
  }, [dataset]);

  const currentPage = pages[pageIndex] || pages[0];

  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('scores', JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem('assignedAnswers', JSON.stringify(assignedAnswers));
  }, [assignedAnswers]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePageChange(pageIndex - 1);
      } else if (e.key === 'ArrowRight') {
        handlePageChange(pageIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageIndex, pages.length, datasetId]);

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: newTeamName.trim(),
      };
      setTeams([...teams, newTeam]);
      setNewTeamName('');
    }
  };

  const handleDeleteTeam = (id: string) => {
    setTeams(teams.filter((t) => t.id !== id));
    
    const newScores = { ...scores };
    delete newScores[id];
    setScores(newScores);

    const newAssigned = { ...assignedAnswers };
    Object.keys(newAssigned).forEach(key => {
      if (newAssigned[key] === id) {
        delete newAssigned[key];
      }
    });
    setAssignedAnswers(newAssigned);
  };

  const handlePageChange = (index: number) => {
    if (index >= 0 && index < pages.length) {
      navigate(`/${datasetId}?p=${index}`);
    }
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeAnswer, setActiveAnswer] = useState<Answer | null>(null);

  const handleAnswerClick = (event: React.MouseEvent<HTMLElement>, answer: Answer) => {
    setAnchorEl(event.currentTarget);
    setActiveAnswer(answer);
  };

  const handleAssignScore = (teamId: string | null) => {
    if (activeAnswer && currentPage.type === 'question' && currentPage.question) {
      const answerKey = `${datasetId}-${currentPage.round.id}-${currentPage.question.id}-${activeAnswer.id}`;
      const previousTeamId = assignedAnswers[answerKey];

      // Update scores
      const newScores = { ...scores };
      if (previousTeamId) {
        newScores[previousTeamId] = (newScores[previousTeamId] || 0) - activeAnswer.score;
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
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Silvestr {datasetId}
          </Typography>
          <Select
            value={datasetId}
            onChange={(e) => navigate(`/${e.target.value}?p=0`)}
            sx={{ color: 'white', mr: 2, '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
          >
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
          </Select>
          <IconButton color="inherit" onClick={() => setIsTeamDialogOpen(true)}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
        <Tabs
          value={pageIndex < pages.length ? pageIndex : 0}
          onChange={(_, newValue) => handlePageChange(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ bgcolor: 'primary.dark' }}
        >
          {pages.map((p, i) => (
            <Tab
              key={i}
              label={p.type === 'intro' ? `R${p.round.id}` : `Q${p.question?.id}`}
              sx={{ color: 'white' }}
            />
          ))}
        </Tabs>
      </AppBar>

      <Container sx={{ mt: 4, position: 'relative', pb: 10 }}>
        <IconButton
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
          sx={{ position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)' }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>

        <IconButton
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex === pages.length - 1}
          sx={{ position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)' }}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>

        <Paper elevation={3} sx={{ p: 4, minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {currentPage.type === 'intro' ? (
            <Box textAlign="center">
              <Typography variant="h2" gutterBottom>
                Round {currentPage.round.id}
              </Typography>
              <Typography variant="h4">{currentPage.round.text}</Typography>
            </Box>
          ) : (
            <Box width="100%">
              <Typography variant="h4" gutterBottom textAlign="center">
                {currentPage.question?.question}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 4 }}>
                {currentPage.question?.answers.map((answer) => {
                  const answerKey = `${datasetId}-${currentPage.round.id}-${currentPage.question?.id}-${answer.id}`;
                  const assignedTeamId = assignedAnswers[answerKey];
                  const assignedTeam = teams.find(t => t.id === assignedTeamId);
                  return (
                    <Grid size={12} key={answer.id}>
                      <Button
                        fullWidth
                        variant={assignedTeam ? "contained" : "outlined"}
                        color={assignedTeam ? "success" : "primary"}
                        onClick={(e) => handleAnswerClick(e, answer)}
                        sx={{ justifyContent: 'space-between', py: 2, fontSize: '1.2rem' }}
                      >
                        <span>{answer.text}</span>
                        <span>{answer.score} pts {assignedTeam && `(${assignedTeam.name})`}</span>
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}
        </Paper>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>Týmy a body</Typography>
          <Grid container spacing={2}>
            {teams.map((team) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={team.id}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
                  <Typography variant="h6">{team.name}</Typography>
                  <Typography variant="h4">{scores[team.id] || 0}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleAssignScore(null)}
      >
        <MenuItem onClick={() => handleAssignScore(null)}><em>Nikdo</em></MenuItem>
        <Divider />
        {teams.map((team) => (
          <MenuItem key={team.id} onClick={() => handleAssignScore(team.id)}>
            {team.name}
          </MenuItem>
        ))}
      </Menu>

      <Dialog open={isTeamDialogOpen} onClose={() => setIsTeamDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Správa týmů</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Název týmu"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTeam()}
            />
            <Button variant="contained" onClick={handleAddTeam} startIcon={<AddIcon />}>
              Přidat
            </Button>
          </Box>
          <List>
            {teams.map((team) => (
              <ListItem key={team.id}>
                <ListItemText primary={team.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleDeleteTeam(team.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsTeamDialogOpen(false)}>Zavřít</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function App() {
  const savedDataset = localStorage.getItem('lastDataset') || '2025';
  return (
    <Routes>
      <Route path="/:datasetId" element={<MainApp />} />
      <Route path="/" element={<Navigate to={`/${savedDataset}?p=0`} replace />} />
    </Routes>
  );
}

export default App;

