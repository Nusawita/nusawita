import React from "react";
import { Grid, Box, Typography, useTheme, Button } from "@mui/material";
import { ContentMiddle } from "../../styles/shared-styles";

export const AdminLoginForm = () => {
  const theme = useTheme();
  const lightColor = theme.palette.light.main;
  return (
    <Grid
      container
      sx={{
        width: "970px",
        height: "569px",
        boxShadow: "0px 10px 15px 3px rgba(226, 226, 226, 0.25)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Grid item xs={6} sx={{ ...ContentMiddle, backgroundColor: lightColor }}>
        <Box>
          <Typography variant="h4" component="h4">
            Admin Login
          </Typography>
        </Box>
        {/* <Button variant="secondary" size="small">Masuk</Button> */}

        <Button
          variant="contained"
          size="small"
          sx={{
            color: "#fffff",
            backgroundColor: "#0E404F",
            textTransform: "none",
            borderRadius: "10px",
            padding: "20px 0px",
          }}
        >
          Login
        </Button>
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
