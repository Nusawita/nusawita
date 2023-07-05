import React from "react";
import RegisterForm from "../../components/user/register-form";
import { Box } from "@mui/material";
import Header from "../shared/Header";

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
