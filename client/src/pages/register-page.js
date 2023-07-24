import React from "react";
import RegisterForm from "../components/UI/Forms/register-form";
import { Box } from "@mui/material";
import CustomAppbar from "../components/UI/Appbar/custom-appbar";

export const RegisterPages = () => {
  return (
    <Box
      sx={{
        height:'100vh',
        overflow:'auto'
      }}
    >
      <CustomAppbar position = 'static' />
      <RegisterForm />
    </Box>
  );
};
