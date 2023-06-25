import { createTheme } from "@mui/material/styles";

export const customGlobalTheme = createTheme({
  // CUSTOM TYPOGRAPHY
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "96px",
    },
    h2: {
      fontSize: "60px",
    },
    h3: {
      fontSize: "48px",
    },
    h4: {
      fontSize: "34px",
    },
    h5: {
      fontSize: "24px",
    },
    h6: {
      fontSize: "20px",
    },
    subtitle1: {
      fontSize: "16px",
    },
    subtitle2: {
      fontSize: "14px",
    },
    body1: {
      fontSize: "16px",
    },
    body2: {
      fontSize: "14px",
    },
    caption: {
      fontSize: "12px",
    },
    overline: {
      fontSize: "12px",
    },
    tableHeader: {
      fontSize: "14px",
    },
    buttonText: {
      fontSize: "16px",
    },
  },
  // COLOR PALETTE
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
      main: "#0381BF",
      dark: "#026799",
      light: "#039BE5",
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

export const customTheme = createTheme({
  ...customGlobalTheme,
  //Custom component
  components: {
    // BUTTON COMPONENTS
    MuiButton: {
      variants: [
        //Button Variants
        {
          props: { variant: "primary" },
          style: {
            backgroundColor: customGlobalTheme.palette.primary.main,
            color: "white",
            textTransform: "none",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: customGlobalTheme.palette.primary.light,
              color: "white",
            },
            "&:active": {
              backgroundColor: customGlobalTheme.palette.primary.dark,
            },
            ":disabled": {
              backgroundColor: customGlobalTheme.palette.primary.main,
              opacity: 0.5,
              color: "white",
            },
            "&:focus": {
              backgroundColor: customGlobalTheme.palette.primary.light,
              color: "white",
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            backgroundColor: customGlobalTheme.palette.light.main,
            border: `1px solid ${customGlobalTheme.palette.primary.main}`,
            color: customGlobalTheme.palette.primary.main,
            textTransform: "none",
            borderRadius: "4px",
            "&:hover": {
              color: customGlobalTheme.palette.primary.dark,
              backgroundColor: "white",
            },
            "&:focus": {
              color: customGlobalTheme.palette.primary.dark,
              backgroundColor: "white",
            },
            "&:active": {
              color: customGlobalTheme.palette.primary.dark,
              backgroundColor: "white",
            },
            ":disabled": {
              opacity: 0.5,
              color: customGlobalTheme.palette.primary.dark,
            },
          },
        },
        //Button Size
        {
          props: { size: "small" },
          style: {
            width: "315px",
            height: "32px",
          },
        },
        {
          props: { size: "medium" },
          style: {
            width: "315px",
            height: "40px",
          },
        },
        {
          props: { size: "large" },
          style: {
            width: "315px",
            height: "48px",
          },
        },
      ],
    },
    // TEXT FIELD
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInput-underline": {
            "&:before": {
              borderBottom: "none", // Remove the underline
            },
            "&:after": {
              borderBottom: "none", // Remove the underline after interaction
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: "none", // Remove the underline on hover
            },
          },
        },
      },
    },
  },
});

export const ContentMiddle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
