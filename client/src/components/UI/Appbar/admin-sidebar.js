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
          width: 270,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 270,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
      >
        <Box sx={{ py: 5 }}>
          <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Box
              component="img"
              src="/logos/nusawita.png"
              onClick={() => {
                window.location.href = "/";
              }}
              sx={{
                cursor: "pointer",
                maxWidth: "15rem",
              }}
            />
          </Box>
          <List>
            <ListItem sx={{ p: 0 }}>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon="bi:person-fill" color="#0000008F" width="24" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1" component="p">
                    {ctxAuth.loginUser}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <Typography
              variant="subtitle2"
              component="p"
              sx={{ px: 2.2, pt: 3, color: "#00000099", fontWeight: "500" }}
            >
              Nusawita Website Page
            </Typography>
            <ListItem sx={{ p: 0 }}>
              <ListItemButton
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                <ListItemIcon>
                  <Icon icon="bi:person-fill" color="#0000008F" width="24" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1" component="p">
                    Home
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <Typography
              variant="subtitle2"
              component="p"
              sx={{ px: 2.2, pt: 3, color: "#00000099", fontWeight: "500" }}
            >
              Menu Admin
            </Typography>
            <ListItem sx={{ p: 0 }}>
              <ListItemButton onClick={()=>{window.location.href = '/admin/dashboard'}}>
                <ListItemIcon>
                  <Icon
                    icon="ic:round-dashboard"
                    color="#0000008F"
                    width="24"
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1" component="p">
                    Dashboard
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <ListItemButton onClick={()=>{window.location.href = '/admin/dashboard/users'}}>
                <ListItemIcon>
                  <Icon icon="bi:person-fill" color="#0000008F" width="24" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1" component="p">
                    User
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <ListItemButton>
                <ListItemIcon>
                  <Icon
                    icon="fa-solid:map-marked-alt"
                    color="#0000008F"
                    width="24"
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1" component="p">
                    Tourism
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon="mdi:chat-alert" color="#0000008F" width="24" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1" component="p">
                    Report
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ px: 0, pt: 5 }}>
              <ListItemButton onClick={ctxAuth.logoutUser}>
                <ListItemIcon>
                  <Icon
                    icon="fluent:sign-out-20-filled"
                    color="#707070"
                    width="24"
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1" component="p">
                    Logout
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AdminSidebar;
