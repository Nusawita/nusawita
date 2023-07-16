import React, { useContext, useState } from "react";
import {
  Box,
  AppBar,
  Typography,
  Button,
  Toolbar,
  useTheme,
  Paper,
  useMediaQuery,
  ListItemText,
  Menu,
  MenuList,
  MenuItem,
  Divider,
  ListItemIcon,
  Container,
  List,
  ListItemButton,
  SwipeableDrawer,
} from "@mui/material";
import AuthContext from "../../../context/auth-context";
import { Icon } from "@iconify/react";
import { DrawerItem } from "../custom-UI";

const CustomAppbar = (props) => {
  const theme = useTheme();
  const colorPalette = theme.palette;
  const ctxAuth = useContext(AuthContext);
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleMenuClose = (even) => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box>
        <AppBar
          sx={{ display: "flex", flexGrow: 1, position: "static" }}
          color="transparent"
        >
          <Toolbar
            sx={{ backgroundColor: colorPalette.primary.main, color: "white" }}
          >
            <Typography
              variant="buttonText"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Covid -19: IMPORTANT Information
            </Typography>
          </Toolbar>
        </AppBar>

        <AppBar
          position={props.position}
          sx={{ mt: props.position === "absolute" ? 8 : 0, opacity: "90%" }}
        >
          <Toolbar
            sx={{
              backgroundColor: "white",
              justifyContent: "space-between",
            }}
          >
            {smallScreen ? (
              <Box
                component="img"
                src="/logos/nusawita_logo_circle.png"
                onClick={() => {
                  window.location.href = "/";
                }}
                sx={{
                  cursor: "pointer",
                  maxHeight: "6rem",
                }}
              />
            ) : (
              <Box
                component="img"
                src="/logos/nusawita.png"
                onClick={() => {
                  window.location.href = "/";
                }}
                sx={{
                  cursor: "pointer",
                  maxHeight: "6rem",
                }}
              />
            )}

            {smallScreen ? (
              <Paper
                elevation={1}
                sx={{
                  display: { xs: "flex", md: "none" },
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={handleOpenDrawer}
                  sx={{ maxWidth: "4rem", backgroundColor: "white" }}
                >
                  <Icon icon="ion:menu" width="27" color="black" />
                </Button>
                <SwipeableDrawer
                  anchor="bottom"
                  open={openDrawer}
                  onClose={() => setOpenDrawer(false)}
                  onOpen={() => setOpenDrawer(true)}
                >
                  {ctxAuth.isLoggedIn ? (
                    <Box
                      sx={{ width: "auto", height: "80vh", px: 3 }}
                      role="presentation"
                      onClick={() => {
                        setOpenDrawer(true);
                      }}
                      onKeyDown={() => {
                        setOpenDrawer(false);
                      }}
                    >
                      <List>
                        <ListItemButton sx={{ py: 2 }}>
                          <ListItemIcon>
                            <Icon
                              icon="ion:person-circle"
                              color="gray"
                              width="42"
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
                              {ctxAuth.loginUser}
                            </Typography>
                          </ListItemText>
                        </ListItemButton>
                        <Divider />
                        <DrawerItem
                          sx={{ py: 2 }}
                          icon={
                            <Icon
                              icon="bi:person-fill"
                              color="black"
                              width="24"
                            />
                          }
                          item="Edit Profile"
                          divider="bottom"
                        />
                        <DrawerItem
                          sx={{ py: 2 }}
                          icon={
                            <Icon icon="bxs:map-pin" color="black" width="24" />
                          }
                          item="Destinations"
                          divider="bottom"
                        />
                        {ctxAuth.isAdmin && (
                          <DrawerItem
                            onClick={() => {
                              window.location.href = "/admin/dashboard";
                            }}
                            sx={{ py: 2 }}
                            icon={
                              <Icon
                                icon="ic:round-dashboard"
                                color="black"
                                width="24"
                              />
                            }
                            item="Admin Dashboard"
                            divider="bottom"
                          />
                        )}
                        <DrawerItem
                          onClick={ctxAuth.logoutUser}
                          sx={{ pt: 5 }}
                          icon={
                            <Icon
                              icon="fluent:sign-out-20-filled"
                              color="black"
                              width="24"
                            />
                          }
                          item="Sign Out"
                        />
                      </List>
                    </Box>
                  ) : (
                    <Box
                      sx={{ width: "auto", height: "80vh" }}
                      role="presentation"
                      onClick={() => {
                        setOpenDrawer(true);
                      }}
                      onKeyDown={() => {
                        setOpenDrawer(false);
                      }}
                    >
                      <List>
                        <DrawerItem
                          onClick={()=>{window.location.href = '/login'}}
                          sx={{ py: 2 }}
                          icon={
                            <Icon
                              icon="ic:round-dashboard"
                              color="black"
                              width="24"
                            />
                          }
                          item="Sign In"
                          divider="bottom"
                        />
                        <DrawerItem
                          onClick={()=>{window.location.href = '/register'}}
                          sx={{ py: 2 }}
                          icon={
                            <Icon
                              icon="ic:round-dashboard"
                              color="black"
                              width="24"
                            />
                          }
                          item="Sign Up"
                          divider="bottom"
                        />                        
                      </List>
                    </Box>
                  )}
                </SwipeableDrawer>
              </Paper>
            ) : (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="buttonText"
                  component="div"
                  color="black"
                  sx={{ mx: 5 }}
                >
                  Destinations
                </Typography>
                {ctxAuth.isLoggedIn ? (
                  <Box sx={{ px: ctxAuth.isLoggedIn ? 0 : 4 }}>
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
                          <Icon
                            icon="ion:person-circle"
                            color="gray"
                            width="42"
                          />
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
                            <Icon
                              icon="bi:person-fill"
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
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default CustomAppbar;
