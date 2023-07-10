import React, { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import AuthContext from "../../context/auth-context";
import { Icon } from "@iconify/react";

const HeaderInformation = () => {
  const theme = useTheme();
  const colorPalette = {
    primary: theme.palette.primary,
  };
  const ctxAuth = useContext(AuthContext);

  return (
    <Box
      sx={{
        backgroundColor: colorPalette.primary.main,
        alignItems: "center",
        width: "100%",
        display: { xs: "none", md: "flex" },
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ px: 7 }}>
        {ctxAuth.isLoggedIn ? (
          <Typography variant="button-text" color="white">
            {`Welcome ${ctxAuth.loginUser}`}
          </Typography>
        ) : (
          <Typography variant="button-text" color="white">
            Covid - 19 : IMPORTANT INFORMATION
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "inline-flex", pr: 14 }}>
        <Box sx={{ px: 1, py: 1 }}>
          <Icon icon="ic:baseline-facebook" color="white" />
        </Box>
        <Box sx={{ px: 1, py: 1 }}>
          <Icon icon="mdi:twitter" color="white" />
        </Box>
        <Box sx={{ px: 1, py: 1 }}>
          <Icon icon="ic:baseline-tiktok" color="white" />
        </Box>
        <Box
          sx={{
            borderLeft: 1,
            height: "100%",
            py: 1,
            px: 2,
            color: "white",
          }}
        >
          <Typography variant="button-text" color="white">
            Contact Us
          </Typography>
        </Box>

        <Box
          sx={{
            borderLeft: 1,
            height: "100%",
            borderRight: 1,
            px: 2,
            py: 1,
            color: "white",
          }}
        >
          <Typography variant="button-text" color="white">
            (1245) 2456 012
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderInformation;
