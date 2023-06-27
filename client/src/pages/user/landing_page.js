import React, { useContext } from "react";
import { Button, Box } from "@mui/material";
import AuthContext from "../../context/auth-context";

export const LandingPage = () => {
  const ctxAuth = useContext(AuthContext);
  return (
    <>
      <h1>This is Landing Page</h1>
      {ctxAuth.isLoggedIn ? (
        <>
          <h3>You are a logged in {ctxAuth.isAdmin ? "admin" : "user"}</h3>
          <Box>
            <Button
              onClick={ctxAuth.logoutUser}
              variant="primary"
              sx={{ mb: 3 }}
            >
              Logout
            </Button>
          </Box>
          {ctxAuth.isAdmin && (
            <Box>
              <Button href="/admin/dashboard" variant="primary">
                Go to Admin Page
              </Button>
            </Box>
          )}
        </>
      ) : (
        <>
          <h3>You are not logged in</h3>
          <Button href="/login" variant="primary">
            Login
          </Button>
        </>
      )}
    </>
  );
};
