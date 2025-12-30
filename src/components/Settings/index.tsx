import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  IconButton,
  FormControlLabel,
  Switch,
  Typography,
  Divider,
  TextField,
  Stack,
} from "@mui/material";
import { Settings as SettingsIcon } from "@mui/icons-material";
import { useSettings, useTeams, usePage } from "context";

export const Settings = () => {
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = React.useState(false);
  const {
    showAllAnswers,
    setShowAllAnswers,
    roundMultipliers,
    setRoundMultiplier,
    pointsAsScore,
    setPointsAsScore,
    showScore,
    setShowScore,
    showTeamScore,
    setShowTeamScore,
  } = useSettings();
  const { resetScores } = useTeams();
  const { dataset } = usePage();

  const handleReset = () => {
    if (window.confirm("Opravdu chcete resetovat všechny body?")) {
      resetScores();
    }
  };

  return (
    <Box>
      <IconButton color="inherit" onClick={() => setIsSettingsDialogOpen(true)}>
        <SettingsIcon />
      </IconButton>
      <Dialog
        open={isSettingsDialogOpen}
        onClose={() => setIsSettingsDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Nastavení</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Obecné
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={showAllAnswers}
                    onChange={(e) => setShowAllAnswers(e.target.checked)}
                  />
                }
                label="Zviditelnit všechny odpovědi (pro moderátora)"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={pointsAsScore}
                    onChange={(e) => setPointsAsScore(e.target.checked)}
                  />
                }
                label="Použít počet odpovědí jako skóre"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showScore}
                    onChange={(e) => setShowScore(e.target.checked)}
                  />
                }
                label="Zobrazit skóre u odpovědí"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showTeamScore}
                    onChange={(e) => setShowTeamScore(e.target.checked)}
                  />
                }
                label="Zobrazit průběžné skóre týmů"
              />
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>
                Body
              </Typography>
              <Button variant="contained" color="error" onClick={handleReset}>
                Resetovat body
              </Button>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>
                Vážení bodů pro kola
              </Typography>
              <Stack spacing={2}>
                {dataset.map((round: any) => (
                  <Box
                    key={round.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>{round.text}</Typography>
                    <TextField
                      type="number"
                      size="small"
                      label="Činitel"
                      value={roundMultipliers[round.id] || 1}
                      onChange={(e) =>
                        setRoundMultiplier(round.id, Number(e.target.value))
                      }
                      sx={{ width: 100 }}
                      inputProps={{ min: 1, step: 0.5 }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSettingsDialogOpen(false)}>Zavřít</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
