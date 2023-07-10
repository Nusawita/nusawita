import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import { Button, Box } from "@mui/material";
import HamburgerButton from "./HamburgerButton";

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
        px: { xs: 2, md: 7 },
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src="/logos/nusawita.png"
        onClick={() => {
          window.location.href = "/";
        }}
        sx={{ cursor: "pointer", display: { xs: "none", md: "block" } }}
      />

      <Box
        component="img"
        src="/logos/nusawita_logo_circle.png"
        onClick={() => {
          window.location.href = "/";
        }}
        sx={{
          cursor: "pointer",
          display: { xs: "block", md: "none" },
          width: "70px",
        }}
      />

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <HamburgerButton />
      </Box>

      <Box
        component="span"
        sx={{ px: 6, display: { xs: "none", md: "block" } }}
      >
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
