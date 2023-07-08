import React, { useContext } from "react";
import {
  Button,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Grid,
  Container,
} from "@mui/material";
import AuthContext from "../../context/auth-context";
import { ContentMiddle } from "../../styles/shared-styles";
import { Icon } from "@iconify/react";
import { useTheme } from "@emotion/react";
import HeaderInformation from "./HeaderInformation";
import Header from "./Header";
import {
  CustomCardSm,
  CustomCard,
  LabelSelector,
} from "../../components/UI/custom-UI";

export const LandingPage = (props) => {
  const ctxAuth = useContext(AuthContext);
  const loggedIn = ctxAuth.isLoggedIn;
  const theme = useTheme();
  const colorPalette = {
    primary: theme.palette.primary,
    danger: theme.palette.danger,
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
        <HeaderInformation />
        {/* Button Section */}
        <Header />
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
        />
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
          sx={{ px: 8, py: 20, maxWidth: "45rem" }}
        >
          Lorem ipsum dolor sit amet consectetur.
        </Typography>
        <Box
          component="span"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <LabelSelector text="All" />
          <LabelSelector text="Waterfall" />
          <LabelSelector text="Beach" />
          <LabelSelector text="Landscape" />
          <LabelSelector text="Mountain" />
          <Box sx={{ backgroundColor: "white", px: 2, py: 2 }}>
            <Button variant="primary" sx={{ width: "14rem" }}>
              <Typography variant="buttonText" component="span">
                View More
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Tourism Spot Section */}
      <Box sx={{ mb: 5 }}>
        <Box
          component="span"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            icon="bxs:map-pin"
            width={70}
            color={colorPalette.primary.main}
          />
          <Typography variant="h3" component="h3">
            Tourism Spot
          </Typography>
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <CustomCard
            sx={{ mx: 2 }}
            title="Pantai Pandawa"
            rating="4.9"
            description="Lorem ipsum dolor sit amet consectetur. Ut tortor hendrerit massa
            tincidunt egestas dui. Sagittis sodales vulputate elit nisl
            bibendum."
            tags={["Beach", "Landscape", "Sunset", "Ocean", "Beautiful"]}
          />
          <CustomCard
            sx={{ mx: 2 }}
            title="Pantai Pandawa"
            rating="4.9"
            description="Lorem ipsum dolor sit amet consectetur. Ut tortor hendrerit massa
            tincidunt egestas dui. Sagittis sodales vulputate elit nisl
            bibendum."
            tags={["Beach", "Landscape", "Sunset", "Ocean", "Beautiful"]}
          />
          <CustomCard
            sx={{ mx: 2 }}
            title="Pantai Pandawa"
            rating="4.9"
            description="Lorem ipsum dolor sit amet consectetur. Ut tortor hendrerit massa
            tincidunt egestas dui. Sagittis sodales vulputate elit nisl
            bibendum."
            tags={["Beach", "Landscape", "Sunset", "Ocean", "Beautiful"]}
          />
          <CustomCard
            sx={{ mx: 2 }}
            title="Pantai Pandawa"
            rating="4.9"
            description="Lorem ipsum dolor sit amet consectetur. Ut tortor hendrerit massa
            tincidunt egestas dui. Sagittis sodales vulputate elit nisl
            bibendum."
            tags={["Beach", "Landscape", "Sunset", "Ocean", "Beautiful"]}
          />
        </Box>
      </Box>

      <Box sx={{ mt:20 }}>
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
                  bibendum massa enim ornare risus dignissim. Augue enim feugiat
                  in.
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
    </>
  );
};
