import React from "react";
import RegisterForm from "../../components/user/register-form";
import { Box } from "@mui/material";

export const RegisterPages = () => {
  return (
    <Box
      sx={{
        height:'60rem',
      }}
    >      <RegisterForm />
    </Box>
  );
};
