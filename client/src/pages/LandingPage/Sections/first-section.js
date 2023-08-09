import React from "react";
import {
  Button,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
const FirstSection = () => {
  const theme = useTheme();
  const colorPalette = {
    primary: theme.palette.primary,
    danger: theme.palette.danger,
  };
  const medScreen = useMediaQuery(theme.breakpoints.up("md"));
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const styles = {
    outerContainer: {
      minHeight: "45rem",
      backgroundImage: medScreen
        ? "url(/images/gapuralight.jpg)"
        : "url(/images/gapura.jpg)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: medScreen ? "bottom" : "center",
      backgroundColor: medScreen ? "" : "gray",
      backgroundBlendMode: medScreen ? "" : "multiply",
      overflow: "hidden",
    },
    titleText: {
      color: medScreen ? colorPalette.primary.main : "white",
    },
    subtitleText: {
      color: medScreen ? colorPalette.primary.main : "white",
      py: 2,
    },
    textWrapper: {
      mt: 25,
      px: medScreen ? 7 : 2,
      maxWidth: "57rem",
    },
    exploreButton: {
      mt: 3,
      mb: 5,
      width: "13rem",
      height: "3rem",
    },
  };

  return (
    <>
      <Box>
        <Box sx={styles.outerContainer}>
          <Box sx={styles.textWrapper}>
            <Typography
              variant={medScreen ? "h1" : "h4"}
              component={medScreen ? "h1" : "h4"}
              sx={styles.titleText}
            >
              Lorem Ipsum Dolor Sit Amet Consectetur
            </Typography>

            <Typography
              variant={medScreen ? "h5" : "subtitle1"}
              component="p"
              sx={styles.subtitleText}
            >
              Lorem Ipsum Dolor Sit Amet Consectetur
            </Typography>
            <Button
              variant="primary"
              sx={styles.exploreButton}
            >
              EXPLORE HERE
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FirstSection;
