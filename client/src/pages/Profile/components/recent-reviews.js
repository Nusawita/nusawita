import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import RecentReviewCard from "./recent-review-card";

const RecentReviews = () => {
  const dummyData = [
    {
      id: 1,
      name: "Pantai Pandawa",
      rating: 4.5,
      address: "Jl. Pantai Pandawa, Kutuh, Kec. Kuta Sel, Bali",
      image: null,
    },
    {
      id: 2,
      name: "Pantai Kalimantan",
      rating: 4.5,
      address: "Jl. Pantai Pandawa, Kutuh, Kec. Kuta Sel, Kalimantan",
      image: null,
    },
    {
      id: 3,
      name: "Pantai Jawa",
      rating: 4.5,
      address: "Jl. Pantai Pandawa, Kutuh, Kec. Kuta Sel, Jawa",
      image: null,
    },
  ];
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const styles = {
    outerContainer: {
      mt: 2,
      mb: 3,
      width: "90%",
    },
    cardContainer: {
      mt: 2,
      display: "flex",
      flexDirection:smallScreen && 'column',
      justifyContent: smallScreen ? "center" : "space-between",
      alignItems: smallScreen && "center"
    },
    card: {
      maxWidth: smallScreen ? "90%" : "25%",
      cursor: "pointer",
      ":hover": { transform: "scale(1.004)" },
    },
    cardImage: {
      aspectRatio: 4 / 3,
      width: "100%",
      backgroundImage: "url(/images/cardimage.jpg)",
      backgroundPosition: "center",
      backgroundSize: "cover",
      borderRadius: "5px",
    },
  };
  return (
    <>
      {/* Recent reviews section */}
      <Box sx={styles.outerContainer}>
        <Grid container>
          <Grid item xs={12} md={4} lg={2.7}></Grid>
          <Grid item xs={12} md={8} lg={9.3}>
            <Typography variant="h5" component="h5" fontWeight={400}>
              Recent Reviews
            </Typography>
            <Box sx={styles.cardContainer}>
              {dummyData.map((data) => {
                return <RecentReviewCard key = {data.id} reviewData={data} />;
              })}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RecentReviews;
