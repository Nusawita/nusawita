import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Link,
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

  const otherSettingsFunctionality = profileCtx.otherSettingsFunctionality;

  const openPasswordChangeVerifyDialog =
    profileCtx.otherSettingsState === "unverifiedPassword";

  const openPasswordChangeLinkSentDialog =
    profileCtx.otherSettingsState === "changePasswordLinkSent";

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

      {/* Confirm Change Password */}
      {openPasswordChangeVerifyDialog && (
        <VerifyDialog
          open={openPasswordChangeVerifyDialog}
          title={"Verify Change Password"}
          content={
            <Box sx={{ mx: 5, textAlign: "center" }}>
              <Typography variant="subtitle1" component="p" fontWeight={400}>
                Are you sure you want to change your password? An email with
                link to change your password will be sent to your registered
                email address
              </Typography>
            </Box>
          }
          actions={
            <Box>
              <Button
                onClick={otherSettingsFunctionality.cancelChanges}
                size="small"
                sx={{ width: "auto", mx: 1 }}
              >
                No
              </Button>
              <Button
                onClick={otherSettingsFunctionality.startChangePassword}
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

      {/* Password change sent */}
      {openPasswordChangeLinkSentDialog && (
        <VerifyDialog
          open={openPasswordChangeLinkSentDialog}
          title={"Change Password Link Sent"}
          content={
            <Box sx={{ mx: 5, textAlign: "center" }}>
              <Typography variant="subtitle1" component="p" fontWeight={400}>
                We have sent the change password link to your registered email.
                Kindly check your email to change your password.
              </Typography>
              <Typography
                sx={{ mt: 2 }}
                variant="subtitle1"
                component="p"
                fontWeight={400}
              >
                Didn't receive email?{" "}
                <Link
                  sx={{ cursor: "pointer" }}
                  onClick={otherSettingsFunctionality.startChangePassword}
                >
                  Click here
                </Link>{" "}
                to resend email
              </Typography>
            </Box>
          }
          actions={
            <Button
              onClick={otherSettingsFunctionality.cancelChanges}
              variant="primary"
              size="small"
              sx={{ width: "auto", mx: 1 }}
            >
              Close
            </Button>
          }
        />
      )}
    </>
  );
};

export default ProfileFeedbacks;
