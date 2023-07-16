import React from "react";
import {
  Button,
  Box,
  Typography,
  Container,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
const FirstSection = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const colorPalette = {
    primary: theme.palette.primary,
    danger: theme.palette.danger,
  };
  return (
    <>
      {smallScreen ? (
        <Box>
          <Box
            sx={{
              minHeight: "100vh",
              backgroundImage: "url(/images/gapura.jpg)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "gray",
              backgroundBlendMode: "multiply",
              px: 3,
              overflow: "hidden",
              mt: 0,
            }}
          >
            <Container sx={{ mt: 30 }}>
              <Typography
                variant="h4"
                component="h4"
                sx={{
                  color: "white",
                }}
              >
                Lorem Ipsum Dolor Sit Amet Consectetur
              </Typography>

              <Typography
                variant="subtitle1"
                component="p"
                sx={{
                  py: 2,
                  color: "white",
                }}
              >
                Lorem Ipsum Dolor Sit Amet Consectetur
              </Typography>
              <Button
                variant="primary"
                sx={{ mt: 3, mb: 5, width: "13rem", height: "3rem" }}
              >
                EXPLORE HERE
              </Button>
            </Container>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              minHeight: "100vh",
              backgroundImage: "url(/images/gapuralight.jpg)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
              px: 3,
              overflow: "hidden",
              // mt: 12,
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: colorPalette.primary.main,
                mt: 20,
              }}
            >
              Lorem Ipsum Dolor Sit Amet Consectetur
            </Typography>

            <Typography
              variant="h5"
              component="h5"
              sx={{
                py: 5,
                maxWidth: "70rem",
                color: colorPalette.primary.main,
              }}
            >
              Lorem Ipsum Dolor Sit Amet Consectetur
            </Typography>
            <Button
              variant="primary"
              sx={{ mt: 3, mb: 5, width: "10rem", height: "2.5rem" }}
            >
              EXPLORE HERE
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default FirstSection;
