import { ThemeProvider, createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: { fontFamily: "Fira Code, monospace" },
      },
    },
  },
});
