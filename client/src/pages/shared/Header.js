import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import { Button, Box } from "@mui/material";

const Header = () => {
  const ctxAuth = useContext(AuthContext);
  const loggedIn = ctxAuth.isLoggedIn;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        boxShadow: 3,
        opacity: "90%",
        px: 6,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box component="img" src="/logos/nusawita.png"></Box>
      <Box component="span" sx={{}}>
        {loggedIn ? (
          <>
            <Button
              variant="primary"
              sx={{ width: "7rem", height: "2.5rem" }}
              onClick={ctxAuth.logoutUser}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              sx={{ width: "7rem", height: "2.5rem", mr: 2 }}
              href="/login"
            >
              Login
            </Button>
            <Button
              variant="primary"
              sx={{ width: "7rem", height: "2.5rem", mr: 1 }}
              href="/register"
            >
              Sign up
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
