import LoginForm from "../components/UI/Forms/login-form";
import React from "react";
import { Box } from "@mui/material";
import CustomAppbar from "../components/UI/Appbar/custom-appbar";

export const LoginPage = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          overflow: "auto",
        }}
      >
        <CustomAppbar position="static" />
        <LoginForm />
      </Box>
    </>
  );
};
