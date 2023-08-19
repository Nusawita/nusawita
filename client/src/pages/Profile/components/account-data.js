import React, { useEffect, useState, useRef, useContext } from "react";
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
import api from "../../../axios-instance";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import AuthContext from "../../../context/auth-context";
import ProfileFeedbacks from "./profle-feedbacks";
import { ErrorVibrateAnimation } from "../../../components/animation/custom-animation";
import MyProfile from "./my-profile";
import AccountDataAlerts from "./account-data-alerts";

const AccountData = () => {
  //custom theme called here
  const theme = useTheme();
  const colorPalette = theme.palette;

  //Call auth context, the function changeLoggedInUser is needed when user change their username
  const authCtx = useContext(AuthContext);

  //Variable to store user data
  const [userData, setUserData] = useState({});
  //Dayjs function to handle birth date
  dayjs.extend(utc);
  dayjs.extend(timezone);

  //Username ref to focus on the username field
  let usernameRef = useRef();

  //Variable to save latest user data from the server
  const [dataCheckpoint, setDataCheckpoint] = useState({});

  //When still fetching data show loading instead of account data
  const [loading, setLoading] = useState(true);

  //State to store error message when user edit data
  const [errorStates, setErrorStates] = useState({
    username: "",
    phone: "",
    dob: "",
  });

  //State to handle error animation when user edit data
  const [animationRun, setAnimationRun] = useState({
    username: false,
    noTelp: false,
    dob: false,
  });
  //Function to start or stop animation. Pass true to start, pass false to end animation
  const startAnimation = (field, boolean) => {
    setAnimationRun((prev) => ({
      ...prev,
      [field]: boolean,
    }));
  };

  //State to check the user edit status, all availabel editing status is: '', editing, verifyingSave, verifyingCancel, success
  const [editingStates, setEditingStates] = useState("");

  //Function to get profile data from the backend
  const getUserProfile = async () => {
    console.log("Api Calls");
    try {
      const res = await api.get("/profile", { withCredentials: true });
      // If success change profile:
      if (res.status === 200) {
        //Set user data to new data to reflect change in profile page
        setUserData(res.data.data);
        //Change the date format from the response to show on datepicker
        setUserData((prev) => ({
          ...prev,
          dob: dayjs(res.data.data.dob).utc(),
        }));
        //Set the data checkpoint to new data
        setDataCheckpoint(res.data.data);
        //Change the date format from the response to show on datepicker
        setDataCheckpoint((prev) => ({
          ...prev,
          dob: dayjs(res.data.data.dob).utc(),
        }));
        //Set loading to false
        setLoading(false);
      }
    } catch (error) {
      alert("Server Error");
    }
  };
  //Call the get profile data function
  useEffect(() => {
    //If data loaded or contains value or user is currently editing their profile
    if (userData.username || editingStates) {
      return;
    }
    // Else get the data
    getUserProfile();
  }, [userData, editingStates]);

  //Fetch the edit profile api
  const fetchEditProfileApi = async (data) => {
    console.log("edit api called");
    // Sleep is for debugging to visualize the loading
    // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    //Newdata to pass to the api, this is needed because the date need to be reformatted
    const newData = {
      username: data.username,
      email: data.email,
      noTelp: data.noTelp,
      //Reformat date as this is the backend format
      dob: data.dob.format("YYYY-MM-DD"),
    };
    // await sleep(3000);
    try {
      console.log("Api Calls");
      const res = await api.put("/profile/edit", newData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        //Set the data checkpoint to new data
        setDataCheckpoint(data);
        //Enter the success edit mode to show the success notification
        setEditingStates("success");
      }
    } catch (error) {
      alert("Server Error");
    }
  };

  //Function to change the userData to new data when editing profile data
  const onDataChange = (field, value) => {
    //Not allowing typing other than numbers for phone
    if (field === "noTelp") {
      const numberRegex = /\D/g;
      value = value.replace(numberRegex, "");
    }
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //Function to change the error message if error present when editing
  const changeErrorState = (field, value) => {
    setErrorStates((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //Form validation when user change their username in edit mode
  useEffect(() => {
    //If not in edit mode do nothing
    if (editingStates !== "editing") {
      return;
    }
    //Check duplicate username function
    const checkUsernameDuplicate = async (username) => {
      try {
        const res = await api.post("/check-username", { username });
        if (res.status === 200) {
          //If duplicate does not return, entered username is valid, clear the error
          changeErrorState("username", "");
          return;
        }
      } catch (error) {
        if (error.response.status === 401) {
          changeErrorState("username", "Sorry, username already exists");
          return;
        }
      }
    };
    //Do form validation
    const timeoutId = setTimeout(() => {
      //Dont validate if data is the same
      if (userData.username === dataCheckpoint.username) {
        return;
      }
      //If username empty
      if (userData.username.trim().length === 0) {
        changeErrorState("username", "Username cannot be empty");
        return;
      }

      //If username contains spaces
      const spaceRegex = /^[^ ]+$/;
      if (!spaceRegex.test(userData.username)) {
        changeErrorState("username", "Username must not contain spaces");
        return;
      }

      //Username must be between 8-16 characters
      if (
        userData.username.trim().length < 8 ||
        userData.username.trim().length > 16
      ) {
        changeErrorState(
          "username",
          "Username must be between 8-16 characters long"
        );
        return;
      }
      //If reach this function no username error detected, check for duplicates now
      checkUsernameDuplicate(userData.username);
    }, 600);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [userData.username, dataCheckpoint.username, editingStates]);
  // Form validation when user change their phone number in edit mode
  useEffect(() => {
    //If not in edit mode or phone is empty do nothing
    if (editingStates !== "editing" || userData.noTelp.trim().length === 0) {
      return;
    }
    const timeoutId = setTimeout(() => {
      // Phone must be between 11 or 12 characters
      if (
        userData.noTelp.trim().length < 11 ||
        userData.noTelp.trim().length > 12
      ) {
        changeErrorState("phone", "Phone number must be 11 or 12 characters");
        return;
      }
      //If phone valid, clear error
      changeErrorState("phone", "");
      return () => {
        clearTimeout(timeoutId);
      };
    }, 600);
  }, [userData.noTelp, editingStates]);
  //Form validation when user change their birth date in edit mode
  useEffect(() => {
    if (editingStates !== "editing") {
      return;
    }
    const dobParsed = dayjs(userData.dob);
    if (!dobParsed.isValid()) {
      changeErrorState("dob", "Please enter a valid date");
      return;
    }
    changeErrorState("dob", "");
  }, [userData.dob, editingStates]);

  //Functions to run when user edit states changed
  useEffect(() => {
    //When user save data changes, check the errors, if no errors present, fetch edit api
    if (editingStates === "submitting") {
      //If user saves without changing data avoid api calls
      if (JSON.stringify(userData) === JSON.stringify(dataCheckpoint)) {
        setEditingStates("success");
        return;
      }
      if (Object.values(errorStates).every((field) => field === "")) {
        fetchEditProfileApi(userData);
        return;
      }
      //Recheck errors, if error presents run animation
      if (errorStates.username) {
        startAnimation("username", true);
        setEditingStates("editing");
      }
      if (errorStates.phone) {
        startAnimation("noTelp", true);
        setEditingStates("editing");
      }
      if (errorStates.dob) {
        startAnimation("dob", true);
        setEditingStates("editing");
      }
    }
    //If api call to edit success
    if (editingStates === "success") {
      //Change the username shown in navbar
      authCtx.changeLoginUser(dataCheckpoint.username);
    }
  }, [editingStates, authCtx, dataCheckpoint, errorStates, userData]);

  //Functions to change user edit status
  const editFunctionality = {
    //Set the shown data to latest data from backend and exit edit
    revertEditChanges: () => {
      setEditingStates("");
      setUserData(dataCheckpoint);
      setErrorStates({});
    },
    //Set the editing status to submitting, triggers form recheck and fetch edit api if check passed
    submitEdit: () => {
      setEditingStates("submitting");
    },
    //Set the editing status to editing, user is able to type into the field and edit button changes to save and cancel buttons
    enterEditMode: () => {
      setEditingStates("editing");
    },
    //Set editing status to unverified cancel, triggers cancel verify edit dialog show
    verifyingCancel: () => {
      setEditingStates("verifyingCancel");
    },
    //Set editing status to unverified save, trigger save verify edit dialog show
    verifyingSave: () => {
      setEditingStates("verifyingSave");
    },
    //Set editing status to "", field become disabled
    exitEditMode: () => {
      setEditingStates("");
    },
    //Set editing status to succeess, triggers success edit alert show
    editSuccess: () => {
      setEditingStates("success");
    },
  };

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
      <ProfileFeedbacks
        editingStates={editingStates}
        editFunctionality={editFunctionality}
      />
      {/* Top My Profile Tittle Section with Edit Button */}
      <MyProfile
        colorPalette={colorPalette}
        editFunctionality={editFunctionality}
        editingStates={editingStates}
      />
      {/* Account Data Section */}
      <Box sx={{ width: "90%" }}>
        {/* Alerts for account data section, 10s auto close*/}
        {editingStates === "success" && (
          <AccountDataAlerts
            alertType="success"
            editFunctionality={editFunctionality}
            closeCountdown={10}
          />
        )}
        {loading ? (
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
                <Box sx = {{...ContentMiddle}}>
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
                    showAnimation={animationRun.username}
                    onAnimationComplete={() => {
                      startAnimation("username", false);
                    }}
                  >
                    <CustomTextField
                      fullWidth
                      disabled={!editingStates || editingStates === "success"}
                      inputRef={usernameRef}
                      sx={{ mt: 3 }}
                      color={errorStates.username && "error"}
                      error={errorStates.username ? true : false}
                      helperText={errorStates.username && errorStates.username}
                      leftIcon={
                        <Icon icon="ic:round-person" color="black" width="26" />
                      }
                      rightIcon={
                        errorStates.username && (
                          <Icon
                            icon="ep:warning-filled"
                            color={colorPalette.danger.main}
                            width="24"
                          />
                        )
                      }
                      label="Username"
                      value={userData.username}
                      onChange={(event) => {
                        onDataChange("username", event.target.value);
                      }}
                      variant="outlined"
                    />
                  </ErrorVibrateAnimation>
                  <CustomTextField
                    fullWidth
                    disabled
                    sx={{ mt: 3 }}
                    label="Email"
                    value={userData.email}
                    leftIcon={
                      <Icon icon="ic:round-email" color="black" width="26" />
                    }
                    variant="outlined"
                  />
                  <ErrorVibrateAnimation
                    showAnimation={animationRun.username}
                    onAnimationComplete={() => {
                      startAnimation("username", false);
                    }}
                  >
                    <CustomTextField
                      fullWidth
                      disabled={!editingStates || editingStates === "success"}
                      sx={{ mt: 3 }}
                      color={errorStates.phone && "error"}
                      error={errorStates.phone ? true : false}
                      helperText={errorStates.phone}
                      label="Phone Number"
                      onChange={(event) => {
                        onDataChange("noTelp", event.target.value);
                      }}
                      value={
                        userData.noTelp
                          ? userData.noTelp
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
                        errorStates.phone && (
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
                    showAnimation={animationRun.dob}
                    onAnimationComplete={() => {
                      startAnimation("dob", false);
                    }}
                  >
                    <CustomDatePicker
                      disabled={!editingStates || editingStates === "success"}
                      sx={{ mt: 3 }}
                      label="Birth Date"
                      labelDisplay={errorStates.dob && "error"}
                      value={userData.dob}
                      display={errorStates.dob && "error"}
                      message={
                        errorStates.dob && (
                          <Typography
                            sx={{ color: colorPalette.danger.main }}
                            variant="caption"
                          >
                            {errorStates.dob}
                          </Typography>
                        )
                      }
                      onChange={(newDate) => {
                        setUserData((prev) => ({
                          ...prev,
                          dob: dayjs(newDate).utc(),
                        }));
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
