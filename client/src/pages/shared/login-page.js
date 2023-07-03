import LoginForm from "../../components/shared/login-form";
import React from "react";
import { ContentMiddle } from "../../styles/shared-styles";
import { Box } from "@mui/material";

export const LoginPage = () => {
  return (
    <Box
      sx={{
        ...ContentMiddle,
        width: "100vw",
        height: "100vh",
        backgroundImage: "url(/images/dark_mountain_bg_blur.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <LoginForm />
    </Box>
  );
};
