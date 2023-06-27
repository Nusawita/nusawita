import React, { useContext } from "react";
import { Button } from "@mui/material";
import AuthContext from "../../context/auth-context";

export const AdminDashboard = () => {
  const ctxAuth = useContext(AuthContext)
  return (
    <>
      <h1>Admin Page</h1>
      <Button onClick={ctxAuth.logoutUser} variant="primary">LOGOUT</Button>
    </>
  );
};
