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
      main: "#8684da",
      dark: "#8482e3",
      contrastText: "#050c16",
    },
    background: {
      default: "#262335",
      paper: "#241b2f",
    },
    text: {
      primary: "#ebf1f1",
      secondary: "#ccd2d2",
      disabled: "#96a6a6",
    },
    extraBackgrounds: {
      darker: "#171520",
      lighter: "#352d3f",
      blueish: "#22374c",
    },
    teamColors: [
      "#ee8095",
      "#f16567",
      "#f3674d",
      "#f78c45",
      "#faa051",
      "#ffde80",
      "#95cf92",
      "#8bcfb6",
      "#6bc7c5",
      "#51c8ed",
      "#5281c1",
      "#8e71b2",
    ],
    divider: "#171520",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      color: "#ebf1f1",
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
          padding: "24px 16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "12px 24px",
        },
      },
    },
  },
});

export default theme;
