import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

import { useState } from "react";

const HamburgerButton = () => {
  const [open, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };
  return (
    <AppBar position="static" sx={{ borderRadius: "7px" }}>
      {/* hamburger icon shows the drawer on click */}
      <Box sx={{ px: "20px", py: "7px" }}>
        <MenuIcon />
      </Box>

      {/* The outside of the drawer */}
      <Drawer
        anchor="right" //from which side the drawer slides in
        variant="temporary" //if and how easily the drawer can be closed
        open={open} //if open is true, drawer is shown
        onClose={toggleDrawer(false)} //function that is called when the drawer should close
        onOpen={toggleDrawer(true)} //function that is called when the drawer should open
      >
        <Box>{/* The inside of the drawer */}</Box>
      </Drawer>
    </AppBar>
  );
};

export default HamburgerButton;
