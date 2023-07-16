import React from "react";
import { Box, Typography, Grid, useMediaQuery, Container, Paper } from "@mui/material";
import { Icon } from "@iconify/react";
import { useTheme } from "@emotion/react";

const FourthSection = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const colorPalette = {
    primary: theme.palette.primary,
    danger: theme.palette.danger,
  };
  return (
    <>
      {smallScreen ? (
        <Box sx={{ mt: 20 }}>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              color: colorPalette.danger.light,
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Still Not Sure?
          </Typography>
          <Box>
            <Box
              component="span"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography textAlign="center" variant="h5" component="h5">
                See What They Say About
              </Typography>
              <Icon
                icon="material-symbols:reviews"
                width={30}
                color={"#F6B001"}
              />
            </Box>
            <Container sx={{ mt: 5 }}>
              <Paper elevation={2} sx={{ py: 5, px: 3 }}>
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon icon="ic:round-person" width="50" />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{ fontWeight: 500 }}
                    >
                      Lorenzo
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      Lorem ipsum dolor sit amet consectetur. Enim at ultrices
                      magna velit orci. Aliquam tristique ultrices mauris...
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </Box>
        </Box>
      ) : (
        <Box sx={{ mt: 20 }}>
          <Typography
            variant="h4"
            component="h4"
            sx={{ color: colorPalette.danger.light, textAlign: "center" }}
          >
            Still Not Sure?
          </Typography>
          <Box>
            <Box
              component="span"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3" component="h3">
                See What They Say About
              </Typography>
              <Icon
                icon="material-symbols:reviews"
                width={60}
                color={"#F6B001"}
              />
            </Box>
            <Container>
              <Grid container sx={{ mt: 5, height: "20rem", mb: 5 }}>
                <Grid item xs={8}>
                  <Typography variant="h2" component="h2">
                    Tourism Name
                  </Typography>
                  <Typography variant="h5" component="h5" sx={{ mr: 10 }}>
                    Lorem ipsum dolor sit amet consectetur. Sit porta non magna
                    mattis eleifend neque in bibendum pellentesque. Sed ac
                    elementum felis pretium proin mi quam pellentesque. Aliquam
                    posuere vel eros mi habitant morbi at non. Scelerisque
                    pharetra ullamcorper sem pulvinar vitae. Leo sit fermentum
                    bibendum massa enim ornare risus dignissim. Augue enim
                    feugiat in.
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    backgroundImage: "url(/images/viewayunan.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
};

export default FourthSection;
