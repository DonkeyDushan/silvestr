import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    extraBackgrounds: {
      darker: string;
      lighter: string;
      blueish: string;
    };
    teamColors: string[];
  }
  interface PaletteOptions {
    extraBackgrounds?: {
      darker?: string;
      lighter?: string;
      blueish?: string;
    };
    teamColors?: string[];
  }
}

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#344860",
      dark: "#2c3f50",
      contrastText: "#050c16",
    },
    background: {
      default: "#050c16",
      paper: "#0b1419",
    },
    text: {
      primary: "#ebf1f1",
      secondary: "#ccd2d2",
      disabled: "#96a6a6",
    },
    extraBackgrounds: {
      darker: "#050c16",
      lighter: "#344853",
      blueish: "#22374c",
    },
    teamColors: [
      "#e54c3c",
      "#e97d23",
      "#f1c40f",
      "#ece05a",
      "#2fcc71",
      "#a5c53c",
      "#0076a8",
      "#3a6f8b",
      "#2f8290",
      "#79c9d0",
    ],
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      color: "#ebf1f1",
    },
  },
});

export default theme;
