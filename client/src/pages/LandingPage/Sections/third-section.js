import React from "react";
import { Button, Box, Typography, useMediaQuery } from "@mui/material";
import { Icon } from "@iconify/react";
import { useTheme } from "@emotion/react";
import { CustomCard, LabelSelector } from "../../../components/UI/custom-UI";

const ThirdSection = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const colorPalette = {
    primary: theme.palette.primary,
    danger: theme.palette.danger,
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundImage: "url(/images/gapurasunset.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          mb: 5,
        }}
      >
        <Typography
          color="white"
          variant={smallScreen ? "h4" : "h2"}
          component={smallScreen ? "h4" : "h2"}
          sx={{ px: 4, py: 20, maxWidth: '50%' }}
        >
          Lorem ipsum dolor sit amet consectetur.
        </Typography>
        <Box
          component="span"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <LabelSelector sx={{ width: "17rem" }} text="All" />
          <LabelSelector sx={{ width: "17rem" }} text="Bali" />
          <LabelSelector sx={{ width: "17rem" }} text="Jawa" />
          <LabelSelector sx={{ width: "17rem" }} text="Kalimantan" />
          <Box sx={{ backgroundColor: "white", px: 2, py: 2 }}>
            <Button variant="primary" sx={{ width: "8rem" }}>
              <Typography variant="buttonText" component="span">
                View More
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
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
            width={50}
            color={colorPalette.primary.main}
          />
          <Typography
            variant={smallScreen ? "h4" : "h3"}
            component={smallScreen ? "h4" : "h3"}
          >
            Tourism Spot
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            maxWidth: "100vw",
          }}
        >
          <CustomCard
            sx={{ mx: 2, mb: 2 }}
            title="Pantai Pandawa"
            rating="4.9"
            description="Lorem ipsum dolor sit amet consectetur. Ut tortor hendrerit massa
              tincidunt egestas dui. Sagittis sodales vulputate elit nisl
              bibendum."
            tags={["Beach", "Landscape", "Sunset", "Ocean", "Beautiful"]}
          />
          <CustomCard
            sx={{ mx: 2, mb: 2 }}
            title="Pantai Pandawa"
            rating="4.9"
            description="Lorem ipsum dolor sit amet consectetur. Ut tortor hendrerit massa
              tincidunt egestas dui. Sagittis sodales vulputate elit nisl
              bibendum."
            tags={["Beach", "Landscape", "Sunset", "Ocean", "Beautiful"]}
          />
          <CustomCard
            sx={{ mx: 2, mb: 2 }}
            title="Pantai Pandawa"
            rating="4.9"
            description="Lorem ipsum dolor sit amet consectetur. Ut tortor hendrerit massa
              tincidunt egestas dui. Sagittis sodales vulputate elit nisl
              bibendum."
            tags={["Beach", "Landscape", "Sunset", "Ocean", "Beautiful"]}
          />
          <CustomCard
            sx={{ mx: 2, mb: 2 }}
            title="Pantai Pandawa"
            rating="4.9"
            description="Lorem ipsum dolor sit amet consectetur. Ut tortor hendrerit massa
              tincidunt egestas dui. Sagittis sodales vulputate elit nisl
              bibendum."
            tags={["Beach", "Landscape", "Sunset", "Ocean", "Beautiful"]}
          />
        </Box>
      </Box>
    </>
  );
};

export default ThirdSection;
