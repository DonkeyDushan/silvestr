import { usePage, useTeams } from "context";
import { Answer } from "data";
import { Box, Divider, Menu, MenuItem } from "@mui/material";

export const TeamSelectMenu: React.FC<{
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  activeAnswer: Answer | null;
  setActiveAnswer: (answer: Answer | null) => void;
}> = ({ anchorEl, setAnchorEl, activeAnswer, setActiveAnswer }) => {
  const { teams, assignScore } = useTeams();
  const { datasetId, currentPage } = usePage();

  const handleAssignScore = (teamId: string | null, playSound: boolean = false) => {
    if (
      activeAnswer &&
      currentPage.type === "question" &&
      currentPage.question
    ) {
      if (playSound) {
        const audio = new Audio(
          `${process.env.PUBLIC_URL}/audio/${
            teamId === null ? "error.mp3" : "correct.mp3"
          }`
        );
        audio.play().catch((e) => console.error("Error playing audio:", e));
      }
      assignScore(
        datasetId,
        currentPage.round.id,
        currentPage.question.id,
        activeAnswer,
        teamId
      );
    }
    setAnchorEl(null);
    setActiveAnswer(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => handleAssignScore(null)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem onClick={() => handleAssignScore(null, true)}>
        <em>Nikdo</em>
      </MenuItem>
      <Divider />
      {teams.map((team) => (
        <MenuItem key={team.id} onClick={() => handleAssignScore(team.id, true)}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: team.color,
              mr: 1.5,
            }}
          />
          {team.name}
        </MenuItem>
      ))}
    </Menu>
  );
};
