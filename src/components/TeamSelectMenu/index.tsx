import { usePage, useTeams } from "@/context";
import { Answer } from "@/data";
import { Divider, Menu, MenuItem } from "@mui/material";

export const TeamSelectMenu: React.FC<{
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  activeAnswer: Answer | null;
  setActiveAnswer: (answer: Answer | null) => void;
}> = ({ anchorEl, setAnchorEl, activeAnswer, setActiveAnswer }) => {
  const { teams, assignScore } = useTeams();
  const { datasetId, currentPage } = usePage();

  const handleAssignScore = (teamId: string | null) => {
    if (
      activeAnswer &&
      currentPage.type === "question" &&
      currentPage.question
    ) {
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
  );
};
