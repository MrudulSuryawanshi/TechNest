import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // Blue
    },
    secondary: {
      main: "#0f172a", // Dark Navy
    },
    success: {
      main: "#16a34a",
    },
    error: {
      main: "#dc2626",
    },
    warning: {
      main: "#f59e0b",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none", // Prevents ALL CAPS buttons
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },
});

export default theme;