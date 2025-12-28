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
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useTeams } from "context";

interface TeamDialogProps {
  open: boolean;
  onClose: () => void;
}

export const TeamManager: React.FC<TeamDialogProps> = ({ open, onClose }) => {
  const { teams, addTeam, deleteTeam } = useTeams();
  const [newTeamName, setNewTeamName] = React.useState("");

  const handleAdd = () => {
    if (newTeamName.trim()) {
      addTeam(newTeamName.trim());
      setNewTeamName("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Správa týmů</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 1, mb: 2, mt: 1 }}>
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
          >
            Přidat
          </Button>
        </Box>
        <List>
          {teams.map((team) => (
            <ListItem key={team.id}>
              <ListItemText primary={team.name} />

              <IconButton edge="end" onClick={() => deleteTeam(team.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zavřít</Button>
      </DialogActions>
    </Dialog>
  );
};
