import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import AuthContext from "../../../context/auth-context";

const AdminSidebar = () => {
  const ctxAuth = useContext(AuthContext);
  return (
    <Box role="presentation">
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
      >
        <List>
          <Typography variant="subtitle2" component="p" sx={{ px: 2.2, pt: 3 }}>
            Menu
          </Typography>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="ic:round-dashboard" color="black" width="24" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" component="p">
                  Dashboard
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="bi:person-fill" color="black" width="24" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" component="p">
                  User
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={()=>{
              window.location.href = '/'
            }}>
              <ListItemIcon>
                <Icon icon="fluent:sign-out-20-filled" color="black" width="24" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" component="p">
                  Back to Home
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={ctxAuth.logoutUser}>
              <ListItemIcon>
                <Icon icon="fluent:sign-out-20-filled" color="black" width="24" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" component="p">
                  Logout
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default AdminSidebar;
