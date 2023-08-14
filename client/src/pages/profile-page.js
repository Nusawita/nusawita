import React, { useEffect, useState, useRef } from "react";
import CustomAppbar from "../components/UI/Appbar/custom-appbar";
import {
  Alert,
  AlertTitle,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { ContentMiddle } from "../styles/shared-styles";
import { useTheme } from "@emotion/react";
import {
  CustomDatePicker,
  CustomTextField,
  VerifyDialog,
} from "../components/UI/custom-UI";
import api from "../axios-instance";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const ProfilePage = () => {
  const theme = useTheme();
  const colorPalette = theme.palette;
  const [userData, setUserData] = useState({});
  const [dataCheckpoint, setDataCheckpoint] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewOnly, setViewOnly] = useState(true);
  const [countdown, setCountdown] = useState(10);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const [errorStates, setErrorStates] = useState({
    username: "",
    phone: "",
    dob: "",
  });
  let usernameRef = useRef();

  const [submitingNewData, setSubmittingNewData] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);

  //Dialog States
  const [verifyCancelDialog, setVerifyCancelDialog] = useState(false);
  const [verifySaveDialog, setVerifySaveDialog] = useState(false);

  const getUserProfile = async () => {
    console.log("Api Calls");
    try {
      const res = await api.get("/profile", { withCredentials: true });
      if (res.status === 200) {
        setUserData(res.data.data);
        setUserData((prev) => ({
          ...prev,
          dob: dayjs(res.data.data.dob).utc(),
        }));
        setDataCheckpoint(res.data.data);
        setDataCheckpoint((prev) => ({
          ...prev,
          dob: dayjs(res.data.data.dob).utc(),
        }));
        setLoading(false);
      }
    } catch (error) {
      alert("Server Error");
    }
  };

  const fetchEditProfileApi = async (data) => {
    // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const newData = {
      username: data.username,
      email: data.email,
      noTelp: data.noTelp,
      dob: data.dob.format("YYYY-MM-DD"),
    };
    // await sleep(3000);
    try {
      const res = await api.put("/profile/edit", newData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setDataCheckpoint(data);
        setViewOnly(true);
        setSubmittingNewData(false);
        setDataChanged(true);
      }
    } catch (error) {
      alert("Server Error");
    }
  };

  useEffect(() => {
    //If data loaded or contains value
    if (userData.username || !viewOnly) {
      return;
    }
    getUserProfile();
  }, [userData, viewOnly]);

  const onDataChange = (field, value) => {
    if (field === "noTelp") {
      const numberRegex = /\D/g;
      value = value.replace(numberRegex, "");
    }
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const changeErrorState = (field, value) => {
    setErrorStates((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (!viewOnly) {
      usernameRef.current.focus();
      return;
    }
  }, [viewOnly]);

  useEffect(() => {
    if (viewOnly) {
      return;
    }
    //Check duplicate username function
    const checkUsernameDuplicate = async (username) => {
      try {
        const res = await api.post("/check-username", { username });
        if (res.status === 200) {
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
      if (userData.username === dataCheckpoint.username) {
        return;
      }
      if (userData.username.trim().length === 0) {
        changeErrorState("username", "Username cannot be empty");
        return;
      }
      const spaceRegex = /^[^ ]+$/;
      if (!spaceRegex.test(userData.username)) {
        changeErrorState("username", "Username must not contain spaces");
        return;
      }
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
      checkUsernameDuplicate(userData.username);
      changeErrorState("username", "");
    }, 600);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [userData.username, dataCheckpoint.username, viewOnly]);

  useEffect(() => {
    if (viewOnly || userData.noTelp.trim().length === 0) {
      return;
    }
    const timeoutId = setTimeout(() => {
      if (
        userData.noTelp.trim().length < 11 ||
        userData.noTelp.trim().length > 12
      ) {
        changeErrorState("phone", "Phone number must be 11 or 12 characters");
        return;
      }
      changeErrorState("phone", "");
      return () => {
        clearTimeout(timeoutId);
      };
    }, 600);
  }, [userData.noTelp, dataCheckpoint.username, viewOnly]);

  useEffect(() => {
    if (dataChanged) {
      setCountdown(10);
      // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      const intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      const timeoutId = setTimeout(() => {
        setDataChanged(false);
      }, 10000);
      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
    }
  }, [dataChanged]);

  if (loading) {
    return (
      <Box sx={{ ...ContentMiddle, height: "100vh", width: "100vw" }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <>
        <Backdrop
          open={submitingNewData}
          sx={{
            color: "#ffff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <CircularProgress />
        </Backdrop>

        <VerifyDialog
          open={verifyCancelDialog}
          onClose={() => {
            setVerifyCancelDialog(false);
          }}
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
                onClick={() => {
                  setVerifyCancelDialog(false);
                }}
                size="small"
                sx={{ width: "auto", mx: 1 }}
              >
                No
              </Button>
              <Button
                onClick={() => {
                  setViewOnly(true);
                  setUserData(dataCheckpoint);
                  setErrorStates({});
                  setVerifyCancelDialog(false);
                }}
                variant="primary"
                size="small"
                sx={{ width: "auto", mx: 1 }}
              >
                Yes
              </Button>
            </Box>
          }
        />
        <VerifyDialog
          open={verifySaveDialog}
          onClose={() => {
            setVerifySaveDialog(false);
          }}
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
                onClick={() => {
                  setVerifySaveDialog(false);
                }}
                size="small"
                sx={{ width: "auto", mx: 1 }}
              >
                No
              </Button>
              <Button
                onClick={() => {
                  setSubmittingNewData(true);
                  fetchEditProfileApi(userData);
                  setVerifySaveDialog(false);
                }}
                variant="primary"
                size="small"
                sx={{ width: "auto", mx: 1 }}
              >
                Yes
              </Button>
            </Box>
          }
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
          {/* My Profile Section */}
          <Box sx={{ width: "90%", borderBottom: "1px solid black" }}>
            <Box sx={{ px: 4, py: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Paper component="span" sx={{ mr: 2, py: 1, px: 2 }}>
                  <Icon icon="icon-park-solid:back" width={24} />
                </Paper>
                <Typography variant="h4" component="h4" fontWeight={400}>
                  My Profile
                </Typography>
              </Box>
              <Box
                sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Home / Profile</Typography>
                {viewOnly ? (
                  <Button
                    onClick={() => {
                      setViewOnly(false);
                    }}
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
                      onClick={() => {
                        setVerifyCancelDialog(true);
                      }}
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
                      onClick={() => {
                        setVerifySaveDialog(true);
                      }}
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

          {/* Account Data Section */}
          <Box sx={{ width: "90%" }}>
            {dataChanged && (
              <Alert
                severity="success"
                action={
                  <Button
                    sx={{ width: "auto", my: 3 }}
                    onClick={() => {
                      setDataChanged(false);
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
                  <CustomTextField
                    disabled={viewOnly}
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
                  <CustomTextField
                    disabled={viewOnly}
                    sx={{ mt: 3 }}
                    color={errorStates.phone && "error"}
                    error={errorStates.phone ? true : false}
                    helperText={errorStates.phone}
                    label="Phone Number"
                    onChange={(event) => {
                      onDataChange("noTelp", event.target.value);
                    }}
                    value={
                      userData.noTelp ? userData.noTelp : viewOnly ? "None" : ""
                    }
                    leftIcon={
                      <Icon icon="solar:phone-bold" color="black" width="26" />
                    }
                    variant="outlined"
                  />
                  <CustomDatePicker
                    disabled={viewOnly}
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
