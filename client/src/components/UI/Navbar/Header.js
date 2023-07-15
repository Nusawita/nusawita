import React, { useContext, useState } from "react";
import AuthContext from "../../../context/auth-context";
import {
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Container } from "@mui/system";

const Header = () => {
  const ctxAuth = useContext(AuthContext);
  const loggedIn = ctxAuth.isLoggedIn;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleMenuClose = (even) => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
      <Box
        component="img"
        src="/logos/nusawita.png"
        onClick={() => {
          window.location.href = "/";
        }}
        sx={{ cursor: "pointer" }}
      />

      <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="p"
          sx={{
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            px: loggedIn ? 0 : 4,
          }}
        >
          Destinations
        </Typography>
        {loggedIn ? (
          <Box sx={{ px: loggedIn ? 0 : 4 }}>
            <Button
              onClick={handleMenuClick}
              sx={{
                border: "none",
                color: "black",
                width: "18rem",
                textTransform: "none",
              }}
            >
              <Container>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Icon icon="ion:person-circle" color="gray" width="42" />
                  <Box component="span">
                    Welcome, {ctxAuth.loginUser}
                  </Box>
                  <Icon icon="gridicons:dropdown" width="45" />
                </Typography>
              </Container>
            </Button>
            <Menu
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={open}
              anchorEl={anchorEl}
              onClose={handleMenuClose}
            >
              <MenuList
                sx={{
                  textTransform: "none",
                  minWidth: "12rem",
                }}
              >
                <MenuItem>
                  <Typography
                    variant="p"
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    {ctxAuth.loginUser}
                  </Typography>
                </MenuItem>
                <Divider />
                {ctxAuth.isAdmin && (
                  <MenuItem
                    onClick={() => {
                      window.location.href = "/admin/dashboard";
                    }}
                  >
                    <ListItemIcon>
                      <Icon
                        icon="ic:round-dashboard"
                        color="black"
                        width="24"
                      />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        variant="p"
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: "14px",
                          fontWeight: "400",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Dashboard
                      </Typography>
                    </ListItemText>
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    window.location.href = "/profile";
                  }}
                >
                  <ListItemIcon>
                    <Icon icon="bi:person-fill" color="black" width="24" />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      variant="p"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: "400",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Profile
                    </Typography>
                  </ListItemText>
                </MenuItem>
                <MenuItem onClick={ctxAuth.logoutUser}>
                  <ListItemIcon>
                    <Icon
                      icon="fluent:sign-out-20-filled"
                      color="black"
                      width="24"
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      variant="p"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: "400",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Sign Out
                    </Typography>
                  </ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
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
