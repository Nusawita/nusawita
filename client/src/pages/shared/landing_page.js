import React, { useContext } from "react";
import { Button, Box, Typography, Grid } from "@mui/material";
import AuthContext from "../../context/auth-context";
import { ContentMiddle } from "../../styles/shared-styles";
import { Icon } from "@iconify/react";
import { useTheme } from "@emotion/react";

export const LandingPage = (props) => {
  const ctxAuth = useContext(AuthContext);
  const loggedIn = ctxAuth.isLoggedIn;
  const theme = useTheme();
  const colorPalette = {
    primary: theme.palette.primary,
  };
  return (
    <>
      {/* Top Section */}
      <Box
        sx={{
          width: "100%",
          backgroundImage: "url(/images/gapuralight.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
      >
        {/* Navbar Sementara */}
        {/* Contact Us Section */}
        <Grid
          container
          sx={{
            backgroundColor: colorPalette.primary.main,
          }}
        >
          <Grid sx={{}} item>
            <Box >
              {ctxAuth.isLoggedIn && (
                <Typography variant="button-text" color="white">
                  {`Welcome ${ctxAuth.loginUser}`}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
              pb: 3,
            }}
          >
            <Box sx={{ px: 20 }}>
              <Typography variant="button-text" color="white">
                Contact us
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {/* Button Section */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
            backgroundColor: "white",
            py: 2,
            opacity: "90%",
          }}
        >
          <Box component="span" sx={{ px: 5 }}>
            {loggedIn ? (
              <>
                {" "}
                <Button
                  variant="primary"
                  sx={{ mx: 2, my: 2, width: "7rem", height: "2.5rem", px: 15 }}
                  onClick={ctxAuth.logoutUser}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Button
                  variant="primary"
                  sx={{ mx: 2, my: 2, width: "7rem", height: "2.5rem" }}
                  href="/login"
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  sx={{ mx: 2, my: 2, width: "7rem", height: "2.5rem" }}
                  href="/register"
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ px: 7, pb: 15, pt: 5 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{ pt: 7, maxWidth: "70rem", color: colorPalette.primary.main }}
          >
            Lorem Ipsum Dolor Sit Amet Consectetur
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            sx={{ py: 5, maxWidth: "70rem", color: colorPalette.primary.main }}
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
      {/* Indonesia Section */}
      <Box sx={{ ...ContentMiddle, width: "100%", mt: 10 }}>
        {/* title */}
        <Icon
          icon="subway:location-3"
          width="64"
          color={colorPalette.primary.main}
        />
        <Typography variant="h3" component="h3">
          Indonesia
        </Typography>
        {/* content */}
        <Typography
          variant="h5"
          component="h5"
          sx={{ textAlign: "center", px: 5, mt: 3 }}
        >
          Lorem ipsum dolor sit amet consectetur. Enim quis massa arcu in ac
          orci ut nibh. Mattis tellus eu lectus pretium interdum in suspendisse
          turpis risus. Nunc est velit molestie tellus velit orci ligula
          adipiscing. Ut luctus feugiat nunc nec. Eget lacinia habitant habitant
          morbi quis nec dignissim. Etiam urna justo lectus potenti semper. Orci
          gravida praesent ut dolor amet.
        </Typography>
      </Box>
      {/* label section */}
      <>
        {/* Scroll more section */}
        <Box sx={{ mt: 10, width: "100%" }}>
          <Typography
            variant="h3"
            component="h3"
            style={{ color: "#FF544D", textAlign: "center" }}
          >
            Scroll To Explore More
          </Typography>
          <Box
            sx={{
              backgroundImage: "url(/assets/line_1.jpg)",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "8rem",
              mt: 2,
            }}
          ></Box>
        </Box>
        {/* label tab section */}
        <Box
          sx={{
            width: "100%",
            backgroundImage: "url(/images/gapurasunset.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            mb: 5,
          }}
        >
          <Typography
            color="white"
            variant="h2"
            component="h2"
            sx={{ px: 5, py: 20, maxWidth: "45rem" }}
          >
            Lorem ipsum dolor sit amet consectetur.
          </Typography>
        </Box>
      </>
    </>
  );
};
