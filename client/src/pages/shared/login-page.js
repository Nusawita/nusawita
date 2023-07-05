import LoginForm from "../../components/shared/login-form";
import React from "react";
import { ContentMiddle } from "../../styles/shared-styles";
import { Box } from "@mui/material";
import Header from "./Header";

export const LoginPage = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url(/images/dark_mountain_bg_blur.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <LoginForm />
    </Box>
  );
};
