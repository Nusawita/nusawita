import React, { useEffect, useRef, useContext } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { ContentMiddle } from "../../../styles/shared-styles";
import { useTheme } from "@emotion/react";
import {
  CustomDatePicker,
  CustomTextField,
} from "../../../components/UI/custom-UI";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ProfileFeedbacks from "./profile-feedbacks";
import { ErrorVibrateAnimation } from "../../../components/animation/custom-animation";
import MyProfile from "./my-profile";
import AccountDataAlerts from "./account-data-alerts";
import ProfileContext from "./context/profile-context";

const AccountData = () => {
  //custom theme called here
  const theme = useTheme();
  const colorPalette = theme.palette;

  // Context Variables
  const profileCtx = useContext(ProfileContext);
  //States from context
  //Editing States for profile
  const editingStates = profileCtx.editingStates;
  //Shown profile data (editable)
  const shownProfileData = profileCtx.shownProfileData;
  // Function to change shown profile data
  const changeShownProfileData = profileCtx.changeShownProfileData;
  // State that stores field errors
  const profileFormErrors = profileCtx.profileFormErrors;
  //State that handles error animation
  const errorAnimation = profileCtx.fieldErrorVibrateAnimation;
  // Function that handles error animation state
  const startErrorAnimation = profileCtx.startErrorAnimation;
  //Call auth context, the function changeLoggedInUser is needed when user change their username

  //Dayjs function to handle birth date
  dayjs.extend(utc);
  dayjs.extend(timezone);

  //Username ref to focus on the username field
  let usernameRef = useRef();

  //Focus on field when user enter edit mode
  useEffect(() => {
    if (editingStates === "editing") {
      usernameRef.current.focus();
      return;
    }
  }, [editingStates]);

  //UseMediaQuery
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  //Styles Object
  const styles = {
    profilePictureGridItem: {
      display: smallScreen && "flex",
      justifyContent: smallScreen && "center",
      alignItems: smallScreen && "center",
      flexDirection: smallScreen && "column",
    },
    profilePictureBoxWithBorder: {
      ...ContentMiddle,
      aspectRatio: 1 / 1,
      width: "60%",
      border: "1px solid #AAAAAA",
      borderRadius: "5px",
    },
    profilePicture: {
      backgroundImage: "url(/images/gapura.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      aspectRatio: 1 / 1,
      width: "92%",
    },
    profilePictureButtonsContainer: {
      display: "flex",
      justifyContent: "center",
      mt: 1,
      maxWidth: "70%",
    },
    profilePictureTrashButton: {
      backgroundColor: colorPalette.danger.main,
      ...ContentMiddle,
      px: 1,
      py: 0.5,
      mx: 1,
    },
    profilePictureEditButton: {
      mx: 1,
    },
    accountDataGridItem: {
      display: "flex",
      flexDirection: "column",
      mt: smallScreen && 3,
    },
    accountDataFieldsContainer: {
      maxWidth: smallScreen ? "100%" : "50%",
    },
    otherSettingsOuterContainer: {
      my: 3,
    },
    otherSettingsButtonsContainer: {
      display: "flex",
      justifyContent: smallScreen && "center",
      mt: 2,
      maxWidth: smallScreen ? "100%" : "50%",
    },
    changePasswordButton: { mx: 1 },
    changeEmailButton: { mx: 1 },
  };
  return (
    <>
      {/* ProfileFeedbacks contains verify dialog and backdrops */}
      <ProfileFeedbacks />
      {/* Top My Profile Tittle Section with Edit Button */}
      <MyProfile />
      {/* Account Data Section */}
      <Box sx={{ width: "90%" }}>
        {/* Alerts for account data section, 10s auto close*/}
        {editingStates === "success" && (
          <AccountDataAlerts alertType="success" closeCountdown={10} />
        )}
        {profileCtx.pageLoading ? (
          <Box sx={{ ...ContentMiddle, my: 40 }}>
            <CircularProgress size={70} />
          </Box>
        ) : (
          <Grid container sx={{ mt: 4 }}>
            <Grid
              item
              xs={12}
              md={4}
              lg={2.7}
              sx={styles.profilePictureGridItem}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Box sx={styles.profilePictureBoxWithBorder}>
                  <Box sx={styles.profilePicture} />
                </Box>
              </Box>
              {(editingStates === "editing" ||
                editingStates === "verifyingSave" ||
                editingStates === "verifyingCancel") && (
                <Box sx={{ ...ContentMiddle }}>
                  <Box sx={styles.profilePictureButtonsContainer}>
                    <Paper
                      variant="primary"
                      sx={styles.profilePictureTrashButton}
                    >
                      <Icon
                        icon="material-symbols:delete"
                        color="#FFFF"
                        width={22}
                      />
                    </Paper>
                    <Button
                      variant="primary"
                      size="medium"
                      sx={styles.profilePictureEditButton}
                    >
                      Edit Profile Photo
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={8} lg={9.3}>
              <Box sx={styles.accountDataGridItem}>
                <Typography variant="h5" component="h5" fontWeight={400}>
                  Account Data
                </Typography>
                <Box sx={styles.accountDataFieldsContainer}>
                  <ErrorVibrateAnimation
                    showAnimation={errorAnimation.username}
                    onAnimationComplete={() => {
                      startErrorAnimation("username", false);
                    }}
                  >
                    <CustomTextField
                      fullWidth
                      disabled={!editingStates || editingStates === "success"}
                      inputRef={usernameRef}
                      sx={{ mt: 3 }}
                      color={profileFormErrors.username && "error"}
                      error={profileFormErrors.username ? true : false}
                      helperText={
                        profileFormErrors.username && profileFormErrors.username
                      }
                      leftIcon={
                        <Icon icon="ic:round-person" color="black" width="26" />
                      }
                      rightIcon={
                        profileFormErrors.username && (
                          <Icon
                            icon="ep:warning-filled"
                            color={colorPalette.danger.main}
                            width="24"
                          />
                        )
                      }
                      label="Username"
                      value={shownProfileData.username}
                      onChange={(event) => {
                        changeShownProfileData("username", event.target.value);
                      }}
                      variant="outlined"
                    />
                  </ErrorVibrateAnimation>
                  <CustomTextField
                    fullWidth
                    disabled
                    sx={{ mt: 3 }}
                    label="Email"
                    value={shownProfileData.email}
                    leftIcon={
                      <Icon icon="ic:round-email" color="black" width="26" />
                    }
                    variant="outlined"
                  />
                  <ErrorVibrateAnimation
                    showAnimation={errorAnimation.phone}
                    onAnimationComplete={() => {
                      startErrorAnimation("phone", false);
                    }}
                  >
                    <CustomTextField
                      fullWidth
                      disabled={!editingStates || editingStates === "success"}
                      sx={{ mt: 3 }}
                      color={profileFormErrors.phone && "error"}
                      error={profileFormErrors.phone ? true : false}
                      helperText={profileFormErrors.phone}
                      label="Phone Number"
                      onChange={(event) => {
                        changeShownProfileData("noTelp", event.target.value);
                      }}
                      value={
                        shownProfileData.noTelp
                          ? shownProfileData.noTelp
                          : !editingStates || editingStates === "success"
                          ? "None"
                          : ""
                      }
                      leftIcon={
                        <Icon
                          icon="solar:phone-bold"
                          color="black"
                          width="26"
                        />
                      }
                      rightIcon={
                        profileFormErrors.phone && (
                          <Icon
                            icon="ep:warning-filled"
                            color={colorPalette.danger.main}
                            width="24"
                          />
                        )
                      }
                      variant="outlined"
                    />
                  </ErrorVibrateAnimation>
                  <ErrorVibrateAnimation
                    showAnimation={errorAnimation.dob}
                    onAnimationComplete={() => {
                      startErrorAnimation("dob", false);
                    }}
                  >
                    <CustomDatePicker
                      disabled={!editingStates || editingStates === "success"}
                      sx={{ mt: 3 }}
                      label="Birth Date"
                      labelDisplay={profileFormErrors.dob && "error"}
                      value={dayjs(shownProfileData.dob)}
                      display={profileFormErrors.dob && "error"}
                      message={
                        profileFormErrors.dob && (
                          <Typography
                            sx={{ color: colorPalette.danger.main }}
                            variant="caption"
                          >
                            {profileFormErrors.dob}
                          </Typography>
                        )
                      }
                      onChange={(newDate) => {
                        changeShownProfileData("dob", newDate);
                      }}
                    />
                  </ErrorVibrateAnimation>
                </Box>
                <Box sx={styles.otherSettingsOuterContainer}>
                  <Typography variant="h5" component="h5" fontWeight={400}>
                    Other Settings
                  </Typography>
                  <Box sx={styles.otherSettingsButtonsContainer}>
                    <Button
                      variant="primary"
                      size="large"
                      sx={styles.changePasswordButton}
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="primary"
                      size="large"
                      sx={styles.changeEmailButton}
                    >
                      Change Email
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
        <Divider sx={{ mt: 5 }} />
      </Box>
    </>
  );
};

export default AccountData;
