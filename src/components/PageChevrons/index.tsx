import { usePage } from "context";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const PageChevrons: React.FC = () => {
  const { pageIndex, pages, handlePageChange } = usePage();

  return (
    <>
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
        <ChevronLeft fontSize="large" />
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
        <ChevronRight fontSize="large" />
      </IconButton>
    </>
  );
};
