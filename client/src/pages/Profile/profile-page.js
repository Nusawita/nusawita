import React, { useEffect, useState, useRef, useContext } from "react";
import CustomAppbar from "../../components/UI/Appbar/custom-appbar";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { ContentMiddle } from "../../styles/shared-styles";
import { useTheme } from "@emotion/react";
import {
  CustomDatePicker,
  CustomTextField,
} from "../../components/UI/custom-UI";
import api from "../../axios-instance";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import AuthContext from "../../context/auth-context";
import ProfileFeedbacks from "./components/profle-feedbacks";
import { ErrorVibrateAnimation } from "../../components/animation/custom-animation";
import MyProfile from "./components/my-profile";

const ProfilePage = () => {
  const theme = useTheme();
  const colorPalette = theme.palette;
  const [userData, setUserData] = useState({});
  const [dataCheckpoint, setDataCheckpoint] = useState({});
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(10);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const [errorStates, setErrorStates] = useState({
    username: "",
    phone: "",
    dob: "",
  });
  const [animationRun, setAnimationRun] = useState({
    username: false,
    noTelp: false,
    dob: false,
  });
  const startAnimation = (field, boolean) => {
    setAnimationRun((prev) => ({
      ...prev,
      [field]: boolean,
    }));
  };

  let usernameRef = useRef();
  const authCtx = useContext(AuthContext);

  //Dialog States
  //States: '', editing, verifyingSave, verifyingCancel, success
  const [editingStates, setEditingStates] = useState("");

  //Fetch the get profile data api
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

  //Fetch the edit profile api
  const fetchEditProfileApi = async (data) => {
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

  useEffect(() => {
    //If data loaded or contains value or user in edit mode
    if (userData.username || editingStates) {
      return;
    }
    // Else get the data
    getUserProfile();
  }, [userData, editingStates]);

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

  useEffect(() => {
    if (editingStates === "editing") {
      usernameRef.current.focus();
      return;
    }
  }, [editingStates]);

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

      //Set countdown to auto close success message
      setCountdown(10);

      //Count down the countdown variable
      const intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      //Close success message when 10 seconds have passed
      const timeoutId = setTimeout(() => {
        setEditingStates("");
      }, 10000);

      //Clean up timeout and interval
      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
    }
  }, [editingStates, authCtx, dataCheckpoint.username, errorStates, userData]);

  const editFunctionality = {
    revertEditChanges: () => {
      setEditingStates("");
      setUserData(dataCheckpoint);
      setErrorStates({});
    },
    submitEdit: () => {
      setEditingStates("submitting");
    },
    enterEditMode: () => {
      setEditingStates("editing");
    },
    verifyingCancel: () => {
      setEditingStates("verifyingCancel");
    },
    verifyingSave: () => {
      setEditingStates("verifyingSave");
    },
  };

  if (loading) {
    return (
      <Box sx={{ ...ContentMiddle, height: "100vh", width: "100vw" }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <>
        <ProfileFeedbacks
          editingStates={editingStates}
          editFunctionality={editFunctionality}
        />
        <CustomAppbar position="static" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            mt: 5,
          }}
        >
          <MyProfile
            colorPalette={colorPalette}
            editFunctionality={editFunctionality}
            editingStates={editingStates}
          />
          {/* Account Data Section */}
          <Box sx={{ width: "90%" }}>
            {editingStates === "success" && (
              <Alert
                severity="success"
                action={
                  <Button
                    sx={{ width: "auto", my: 3 }}
                    onClick={() => {
                      setEditingStates("");
                    }}
                  >
                    <Icon icon="carbon:close-outline" width={32} />
                  </Button>
                }
              >
                <AlertTitle>Update Complete</AlertTitle>
                Congratulations, you have successfully updated your profile data
                <Typography component="p" variant="caption" sx={{ mt: 1 }}>
                  Auto closing in {countdown} seconds
                </Typography>
              </Alert>
            )}
            <Grid container spacing={3} sx={{ mt: 4 }}>
              <Grid item xs={2}>
                <Box
                  sx={{
                    ...ContentMiddle,
                    height: "50%",
                    width: "100%",
                    border: "1px solid #AAAAAA",
                    borderRadius: "5px",
                  }}
                >
                  <Box sx={{ height: "92%", width: "92%" }}>
                    <Box
                      sx={{
                        backgroundImage: "url(/images/gapura.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "100%",
                        // height: "11rem",
                        // width: "11rem",
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={10}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "50%",
                  }}
                >
                  <Typography variant="h5" component="h5" fontWeight={400}>
                    Account Data
                  </Typography>
                  <ErrorVibrateAnimation
                    showAnimation={animationRun.username}
                    onAnimationComplete={() => {
                      startAnimation("username", false);
                    }}
                  >
                    <CustomTextField
                      fullWidth
                      disabled={!editingStates}
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
                      disabled={!editingStates}
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
                          : !editingStates
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
                      disabled={!editingStates}
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
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="primary"
                      size="medium"
                      sx={{ width: "auto", px: 6 }}
                    >
                      Edit Password
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 5 }} />
          </Box>
          {/* Recent reviews section */}
          <Box sx={{ mt: 2, mb: 3, width: "90%" }}>
            <Grid container>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <Typography variant="h5" component="h5" fontWeight={400}>
                  Recent Reviews
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Card
                    elevation={2}
                    sx={{
                      maxWidth: "25%",
                      cursor: "pointer",
                      ":hover": { transform: "scale(1.004)" },
                    }}
                  >
                    <CardContent>
                      <Box component="span" sx={{ ...ContentMiddle }}>
                        <Box
                          sx={{
                            width: "70%",
                            minWidth: "256px",
                            minHeight: "200px",
                            backgroundImage: "url(/images/cardimage.jpg)",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        />
                      </Box>
                      <Typography variant="subtitle1" fontWeight={400}>
                        Pantai Pandawa
                      </Typography>
                      <Box
                        component="span"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          my: 1,
                        }}
                      >
                        <Typography>Your Rating:</Typography>
                        <Box sx={{ display: "flex" }}>
                          <Icon
                            icon="ant-design:star-filled"
                            width="24"
                            color="#F6B001"
                          />
                          <Typography variant="subtitle1">4.5</Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          my: 1,
                        }}
                      >
                        <Typography>Reviewed On:</Typography>
                        <Typography variant="caption">22/07/2021</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          Lorem ipsum dolor sit amet consectetur. Tincidunt orci
                          adipiscing tempor lacus sed at mauris auctor. Viverra
                          lectus morbi nibh nibh adipiscing libero volutpat
                          imperdiet facilisis. Tincidunt adipiscing turpis
                          ornare tincidunt odio amet. A purus aliquam dignissim
                          justo ut. Eget quam integer lectus eget tempus.
                          Cursus.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
};

export default ProfilePage;
