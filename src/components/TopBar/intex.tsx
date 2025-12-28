import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tabs,
  Tab,
  MenuItem,
  Select,
} from "@mui/material";
import { Settings as SettingsIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { TeamManager } from "components";

export const TopBar: React.FC<{
  datasetId: string;
  onDatasetChange: (id: string) => void;
  pageIndex: number;
  pages: any[];
  onPageChange: (index: number) => void;
}> = ({ datasetId, onDatasetChange, pageIndex, pages, onPageChange }) => {
  const navigate = useNavigate();

  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);

  const handlePageChange = (newIndex: number) => {
    onPageChange(newIndex);
    navigate(`/${datasetId}?p=${newIndex}`);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Silvestr {datasetId}
        </Typography>
        <Select
          value={datasetId}
          onChange={(e) => navigate(`/${e.target.value}?p=0`)}
          sx={{
            color: "white",
            mr: 2,
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
          }}
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
        sx={{ bgcolor: "primary.dark" }}
      >
        {pages.map((p, i) => (
          <Tab
            key={i}
            label={p.type === "intro" ? `R${p.round.id}` : `Q${p.question?.id}`}
            sx={{ color: "white" }}
          />
        ))}
      </Tabs>
      <TeamManager
        open={isTeamDialogOpen}
        onClose={() => setIsTeamDialogOpen(false)}
      />
    </AppBar>
  );
};
