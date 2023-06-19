import React from "react";
import { Grid, Box, Typography, useTheme } from "@mui/material";
import { ContentMiddle } from "../../styles/shared-styles";

export const AdminLoginForm = () => {
  const theme = useTheme();
  const lightColor = theme.palette.light.main
  return (
    <Grid
      container
      sx={{
        width: "970px",
        height: "569px",
        boxShadow: "0px 10px 15px 3px rgba(226, 226, 226, 0.25)",
        borderRadius: '10px', 
        overflow: 'hidden'
      }}
    >
      <Grid
        item
        xs={6}
        sx={{ ...ContentMiddle, backgroundColor: lightColor }}
      >
        <Box>
          <Typography variant="h5" component="h5" sx={{ fontWeight: "bold" }}>
            Admin Login
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          backgroundImage: "url(images/dark_mountain_bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>
    </Grid>
  );
};
