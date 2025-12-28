import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  MenuItem,
  Select,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Settings, TeamManager } from "components";
import { usePage } from "context";
import { theme } from "styles/theme";

export const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const { datasetId, pageIndex, pages, handlePageChange } = usePage();

  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: "extraBackgrounds.darker" }}>
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
        <TeamManager />
        <Settings />
      </Toolbar>
      <Tabs
        value={pageIndex < pages.length ? pageIndex : 0}
        onChange={(_, newValue) => handlePageChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          bgcolor: "background.paper",
          p: 0,
          ".MuiTabs-indicator": { display: "none" },
        }}
      >
        {pages.map((p, i) => (
          <Tab
            key={i}
            label={
              p.type === "intro"
                ? `${p?.round?.id}. KOLO`
                : i === pages.length - 1
                ? "VÝSLEDKY"
                : `${p.question?.id}`
            }
            sx={{
              color: "text.primary",
              backgroundColor: ["final", "intro"].includes(p.type)
                ? alpha(theme.palette.primary.main, 0.2)
                : "transparent",
              "&.Mui-selected": {
                backgroundColor: "extraBackgrounds.darker",
                color: "text.primary",
              },
            }}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};
