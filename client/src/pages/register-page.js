import React from "react";
import RegisterForm from "../components/UI/Forms/register-form";
import { Box } from "@mui/material";
import Header from "../components/UI/Navbar/Header";

export const RegisterPages = () => {
  return (
    <Box
      sx={{
        height: "60rem",
      }}
    >
      <Header />
      <RegisterForm />
    </Box>
  );
};
