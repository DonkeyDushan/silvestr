import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { Settings as SettingsIcon } from "@mui/icons-material";

export const Settings = () => {
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = React.useState(false);

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
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSettingsDialogOpen(false)}>Zavřít</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
