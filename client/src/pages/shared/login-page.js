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
      }}
    >
      <Header />
      <LoginForm />
    </Box>
  );
};
