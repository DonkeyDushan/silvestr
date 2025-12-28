import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Groups,
} from "@mui/icons-material";
import { useTeams } from "context";

export const TeamManager = () => {
  const { teams, addTeam, updateTeam, deleteTeam } = useTeams();
  const theme = useTheme();
  const teamColors = theme.palette.teamColors || [];

  const [isTeamDialogOpen, setIsTeamDialogOpen] = React.useState(false);
  const [newTeamName, setNewTeamName] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState(teamColors[0] || "");

  const handleAdd = () => {
    if (newTeamName.trim() && selectedColor) {
      addTeam(newTeamName.trim(), selectedColor);
      setNewTeamName("");
      // Pick next color automatically if possible
      const currentIndex = teamColors.indexOf(selectedColor);
      if (currentIndex !== -1 && currentIndex < teamColors.length - 1) {
        setSelectedColor(teamColors[currentIndex + 1]);
      }
    }
  };

  const handleColorChange = (
    teamId: string,
    name: string,
    newColor: string
  ) => {
    updateTeam(teamId, name, newColor);
  };

  return (
    <Box mx={2}>
      <IconButton color="inherit" onClick={() => setIsTeamDialogOpen(true)}>
        <Groups />
      </IconButton>
      <Dialog
        open={isTeamDialogOpen}
        onClose={() => setIsTeamDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Správa týmů</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 2,
              mt: 1,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "1fr auto",
              }}
            >
              <TextField
                fullWidth
                label="Název týmu"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAdd()}
              />
              <Button
                variant="contained"
                onClick={handleAdd}
                startIcon={<AddIcon />}
                disabled={!newTeamName.trim()}
              >
                Přidat
              </Button>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {teamColors.map((color) => (
                <Box
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: color,
                    cursor: "pointer",
                    border: "3px solid",
                    borderColor:
                      selectedColor === color ? "white" : "transparent",
                    boxShadow: 1,
                    transition: "transform 0.1s",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                />
              ))}
            </Box>
          </Box>
          <List>
            {teams.map((team) => (
              <ListItem
                key={team.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => deleteTeam(team.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    {teamColors.map((c) => (
                      <Box
                        key={c}
                        onClick={() => handleColorChange(team.id, team.name, c)}
                        sx={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          bgcolor: c,
                          cursor: "pointer",
                          border: "1px solid",
                          borderColor:
                            team.color === c ? "white" : "transparent",
                          opacity: team.color === c ? 1 : 0.4,
                          "&:hover": { opacity: 1 },
                        }}
                      />
                    ))}
                  </Box>
                  <ListItemText primary={team.name} />
                </Box>
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
};
