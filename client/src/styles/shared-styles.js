import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#008676",
      dark: "#006B5E",
      light: "#31BFAA",
    },
    secondary: {
      main: "#DC3935",
      dark: "#B91D20",
      light: "#FF544D",
    },
    info: {
      main: "#039BE5",
      dark: "#0381BF",
      light: "#2DACE9",
    },
    warning: {
      main: "#ED6C02",
      dark: "#C55A02",
      light: "#F0842C",
    },
    success: {
      main: "#2E7D32",
      dark: "#1B5E20",
      light: "#519354",
    },
    danger: {
      main: "#DE3730",
      dark: "#BA1A1A",
      light: "#FF5449",
    },
    light: {
      main: "#ffff",
    },
    text: {
      primary: "#293234",
      secondary: "#6F797A",
      disabled: "#A3ADAF",
    },
  },
});

export const ContentMiddle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
