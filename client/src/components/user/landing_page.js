import React, { useContext } from "react";
import { Button } from "@mui/material";
import AuthContext from "../../context/auth-context";

export const LandingPage = (props) => {
  const ctxAuth = useContext(AuthContext);
  return (
    <>
      <h1>This is Landing Page</h1>
      {ctxAuth.isLoggedIn ? (
        <>
          <h3>You are a logged in user</h3>
          <Button onClick={ctxAuth.logoutUser} variant="primary">
            LOGOUT
          </Button>
        </>
      ) : (
        <h3>You are not logged in</h3>
      )}
    </>
  );
};
