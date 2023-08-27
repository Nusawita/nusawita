import { Icon } from "@iconify/react";
import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import ProfileContext from "./context/profile-context";
import { useTheme } from "@emotion/react";

const MyProfile = (props) => {
  const theme = useTheme();
  const colorPalette = theme.palette;
  const profileCtx = useContext(ProfileContext);
  const editingStates = profileCtx.editingStates;
  const editProfileActions = profileCtx.editProfileActions;
  return (
    <Box sx={{ width: "90%", borderBottom: "1px solid black" }}>
      <Box sx={{ px: 4, py: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              window.location.href = "/";
            }}
            component={Paper}
            elevation={1}
            sx={{ mr: 2, py: 1, px: 2, width: "auto", color: "black" }}
          >
            <Icon icon="icon-park-solid:back" width={24} />
          </Button>
          <Typography variant="h4" component="h4" fontWeight={400}>
            My Profile
          </Typography>
        </Box>
        <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
          <Typography>Home / Profile</Typography>
          {!editingStates || editingStates === "success" ? (
            <Button
              onClick={editProfileActions.startEditProfile}
              sx={{ width: "auto", color: colorPalette.info.light }}
            >
              <Icon icon="bxs:edit" width={24} />
              <Box sx={{ ml: 1 }} component="span">
                Edit Profile
              </Box>
            </Button>
          ) : (
            <Box>
              <Button
                onClick={editProfileActions.verifyCancelEditProfile}
                sx={{
                  width: "auto",
                  color: colorPalette.danger.main,
                  mx: 1,
                }}
              >
                <Icon icon="mdi:forbid" width={24} />
                <Box sx={{ ml: 1 }} component="span">
                  Cancel
                </Box>
              </Button>
              <Button
                onClick={editProfileActions.verifySaveEditProfile}
                sx={{
                  width: "auto",
                  color: colorPalette.info.light,
                  mx: 1,
                }}
              >
                <Icon icon="bxs:edit" width={24} />
                <Box sx={{ ml: 1 }} component="span">
                  Save
                </Box>
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;
