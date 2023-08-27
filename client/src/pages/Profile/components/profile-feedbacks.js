import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { VerifyDialog } from "../../../components/UI/custom-UI";
import ProfileContext from "./context/profile-context";

const ProfileFeedbacks = (props) => {
  // Profile Context
  const profileCtx = useContext(ProfileContext);
  // Profile Actions:
  const editProfileActions = profileCtx.editProfileActions;
  // Profile States:
  const submitting = profileCtx.editingStates === "submitting"; // When user submits their new profile data
  const verifyingCancel = profileCtx.editingStates === "verifyingCancel"; // When user tries to cancel editing profile
  const verifyingSave = profileCtx.editingStates === "verifyingSave"; // When user tries to save their new profile data

  return (
    <>
      {/* Loading Backdrop */}
      <Backdrop
        open={submitting}
        sx={{
          color: "#ffff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress />
      </Backdrop>

      {/* Verify Cancel Edit Dialog */}
      {verifyingCancel && (
        <VerifyDialog
          open={verifyingCancel}
          title={"Discard Change"}
          content={
            <Box sx={{ mx: 5, textAlign: "center" }}>
              <Typography variant="subtitle1" component="p" fontWeight={400}>
                Are you sure you want to discard the changes?
              </Typography>
              <Typography variant="subtitle1" component="p" fontWeight={400}>
                Any unsaved data will be lost.
              </Typography>
            </Box>
          }
          actions={
            <Box>
              <Button
                onClick={editProfileActions.startEditProfile}
                size="small"
                sx={{ width: "auto", mx: 1 }}
              >
                No
              </Button>
              <Button
                onClick={editProfileActions.cancelEditProfile}
                variant="primary"
                size="small"
                sx={{ width: "auto", mx: 1 }}
              >
                Yes
              </Button>
            </Box>
          }
        />
      )}

      {/* Verify Save Edit Dialog */}
      {verifyingSave && (
        <VerifyDialog
          open={verifyingSave}
          title={"Save Changes"}
          content={
            <Box sx={{ mx: 5, textAlign: "center" }}>
              <Typography variant="subtitle1" component="p" fontWeight={400}>
                Are you sure you want to save the changes?
              </Typography>
            </Box>
          }
          actions={
            <Box>
              <Button
                onClick={editProfileActions.startEditProfile}
                size="small"
                sx={{ width: "auto", mx: 1 }}
              >
                No
              </Button>
              <Button
                onClick={editProfileActions.attemptEditProfile}
                variant="primary"
                size="small"
                sx={{ width: "auto", mx: 1 }}
              >
                Yes
              </Button>
            </Box>
          }
        />
      )}
    </>
  );
};

export default ProfileFeedbacks;
