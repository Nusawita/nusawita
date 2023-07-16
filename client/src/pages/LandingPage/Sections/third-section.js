import React from "react";
import { Button, Box, Typography, Grid, useMediaQuery } from "@mui/material";
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
      {smallScreen ? (
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
              variant="h5"
              component="h5"
              sx={{ px: 4, py: 20 }}
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
              <Typography variant="h4" component="h4">
                Tourism Spot
              </Typography>
            </Box>

            <Grid
              spacing={2}
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
            </Grid>
          </Box>
        </>
      ) : (
        <>
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
                width={70}
                color={colorPalette.primary.main}
              />
              <Typography variant="h3" component="h3">
                Tourism Spot
              </Typography>
            </Box>

            <Grid
              spacing={2}
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
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default ThirdSection;
