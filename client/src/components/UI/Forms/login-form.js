// THIS IS FILE TO TEST THE CUSTOM UI COMPONENTS
import React, { useEffect, useState, useRef, useContext } from "react";
import { Grid, Box, Typography, useTheme, Button } from "@mui/material";
import { ContentMiddle, ContentEnd } from "../../../styles/shared-styles";
import { CustomTextField } from "../custom-UI";
import { Icon } from "@iconify/react";
import { ErrorVibrateAnimation } from "../../animation/custom-animation";
import axios from "axios";
import AxiosContext from "../../../context/axios_context";

const LoginForm = () => {
  const api = useContext(AxiosContext).api;
  //call theme component
  const theme = useTheme();
  // call the colors
  const lightColor = theme.palette.light.main;
  const dangerMain = theme.palette.danger.main;
  const primaryMain = theme.palette.primary.main;
  const errorColor = theme.palette.error.main;

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  let passwordRef = useRef();

  const [authError, setAuthError] = useState(false);

  const focusHandler = {
    username: () => {
      setUsernameFocused(true);
    },
    password: () => {
      setPasswordFocused(true);
    },
  };
  const blurHandler = {
    username: () => {
      setUsernameFocused(false);
    },
    password: () => {
      setPasswordFocused(false);
    },
  };

  const [errorAnimation, setErrorAnimation] = useState({
    username: false,
    password: false,
  });
  const startAnimation = (field) => {
    setErrorAnimation((prev) => ({
      ...prev,
      [field]: true,
    }));
  };
  const endAnimation = (field) => {
    setErrorAnimation((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const [errorShow, setErrorShow] = useState({
    username: false,
    password: false,
  });

  const showError = (field) => {
    setErrorShow((prev) => ({
      ...prev,
      [field]: true,
    }));
  };
  const hideError = (field) => {
    setErrorShow((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleVisibility = {
    setVisible: () => {
      setPasswordVisibility(true);
      passwordRef.current.focus();
    },
    setHidden: () => {
      setPasswordVisibility(false);
      passwordRef.current.focus();
    },
  };

  const handleAnimationComplete = {
    username: () => {
      endAnimation("username");
    },
    password: () => {
      endAnimation("password");
    },
  };

  useEffect(() => {
    if (usernameError) {
      setUsernameError("");
      hideError("username");
      setPasswordError("");
      hideError("password");
      setAuthError(false);
    }
  }, [enteredUsername]);
  useEffect(() => {
    if (passwordError) {
      setPasswordError("");
      hideError("password");
      setPasswordError("");
      hideError("username");
      setAuthError(false);
    }
  }, [enteredPassword]);

  const validator = {
    username: () => {
      if (enteredUsername.trim().length < 8) {
        setUsernameError("Invalid username or password");
        showError("username");
        setPasswordError("Invalid username or password");
        showError("password");
        return false;
      }
      return true;
    },
    password: () => {
      if (enteredPassword.trim().length === 0) {
        setPasswordError("Password is empty");
        showError("password");
        return false;
      }
      if (enteredPassword.trim().length < 8) {
        setUsernameError("Invalid username or password");
        showError("username");
        setPasswordError("Invalid username or password");
        showError("password");
        return false;
      }
      return true;
    },
  };

  const changeHandler = {
    username: (event) => {
      setEnteredUsername(event.target.value);
    },
    password: (event) => {
      setEnteredPassword(event.target.value);
    },
  };

  //function to fetch the login api
  const fetchLoginApi = async (loginData) => {
    // console.log("fetchApi");
    try {
      // call login api
      const res = await api.post("/login", loginData, {
        withCredentials: true,
      });
      //if login success redirect to landing page
      if (res.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      // if unauthorized then show appropiate error in front
      if (error.response.status === 401) {
        setUsernameError("Invalid username or password");
        showError("username");
        setPasswordError("Invalid username or password");
        showError("password");
        setAuthError(true);
        startAnimation("username");
        startAnimation("password");
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (authError) {
      startAnimation("username");
      startAnimation("password");
      return;
    }
    //empty check first
    if (
      enteredUsername.trim().length === 0 &&
      enteredPassword.trim().length === 0
    ) {
      setUsernameError("Username Is Empty");
      showError("username");
      setPasswordError("Password is empty");
      showError("password");
      startAnimation("username");
      startAnimation("password");
      return;
    }
    if (enteredUsername.trim().length === 0) {
      setUsernameError("Username Is Empty");
      showError("username");
      startAnimation("username");
      return;
    }
    if (enteredPassword.trim().length === 0) {
      setPasswordError("Password is empty");
      showError("password");
      startAnimation("password");
      return;
    }
    //other validation
    const usrValid = validator.username();
    const passValid = validator.password();
    if (usrValid && passValid) {
      const loginData = {
        username: enteredUsername,
        password: enteredPassword,
      };
      await fetchLoginApi(loginData);
    } else {
      startAnimation("username");
      startAnimation("password");
    }
  };

  return (
    <Grid
      container
      sx={{
        height: "100%",
        boxShadow: "0px 10px 15px 3px rgba(226, 226, 226, 0.25)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Grid
        item
        xs={8}
        sx={{
          backgroundImage: "url(/images/gapura.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={4} sx={{ ...ContentMiddle, backgroundColor: lightColor }}>
        <Box
          component="form"
          sx={{ width: "360px" }}
          display="flex"
          flexDirection="column"
          onSubmit={handleFormSubmit}
        >
          <Box sx={{ ...ContentMiddle }}>
            <Box
              sx={{
                width: "155px",
                height: "120px",
                backgroundImage: "url(/logos/nusawita_logo_circle.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Box>
          <Typography
            variant="h4"
            component="h4"
            sx={{ pb: 2, textAlign: "center" }}
          >
            Login
          </Typography>
          {/* <Icon icon="ic:round-person" width="27" /> */}
          <ErrorVibrateAnimation
            showAnimation={errorAnimation.username}
            onAnimationComplete={handleAnimationComplete.username}
          >
            <CustomTextField
              type="text"
              fullWidth
              autoFocus
              sx={{ mb: 2 }}
              // color={errorShow.username && "error"}
              onChange={changeHandler.username}
              error={errorShow.username}
              label="Username"
              variant="outlined"
              onFocus={focusHandler.username}
              onBlur={blurHandler.username}
              value={enteredUsername}
              helperText={errorShow.username && usernameError}
              focused={usernameFocused}
              leftIcon={
                <Icon icon="ic:round-person" color="black" width="27" />
              }
              rightIcon={
                errorShow.username && (
                  <Icon
                    icon="ep:warning-filled"
                    color={dangerMain}
                    width="27"
                  />
                )
              }
            />
          </ErrorVibrateAnimation>
          <ErrorVibrateAnimation
            showAnimation={errorAnimation.password}
            onAnimationComplete={handleAnimationComplete.password}
          >
            <CustomTextField
              inputRef={passwordRef}
              type={passwordVisibility ? "text" : "password"}
              fullWidth
              sx={{ mb: 2 }}
              color={errorShow.password && "error"}
              onChange={changeHandler.password}
              error={errorShow.password}
              label="Password"
              variant="outlined"
              onFocus={focusHandler.password}
              onBlur={blurHandler.password}
              value={enteredPassword}
              helperText={errorShow.password && passwordError}
              focused={passwordFocused}
              leftIcon={
                <Icon icon="material-symbols:lock" color="black" width="27" />
              }
              rightIcon={
                <>
                  {passwordVisibility ? (
                    <Icon
                      onClick={handleVisibility.setHidden}
                      style={{ cursor: "pointer" }}
                      icon="mdi:eye"
                      color="black"
                      width="27"
                    />
                  ) : (
                    <Icon
                      onClick={handleVisibility.setVisible}
                      style={{ cursor: "pointer" }}
                      icon="mdi:hide"
                      color="black"
                      width="27"
                    />
                  )}
                  {errorShow.password && (
                    <Icon
                      icon="ep:warning-filled"
                      color={dangerMain}
                      width="27"
                    />
                  )}
                </>
              }
            />
          </ErrorVibrateAnimation>
          <Box sx={{ width: "100%", ...ContentEnd, mb: 5 }}>
            <Typography
              variant="subtitle1"
              component="a"
              href="/"
              sx={{ color: primaryMain, fontWeight: "500" }}
            >
              Forgot Password?
            </Typography>
          </Box>
          <Box sx={{ ...ContentMiddle }}>
            <Button type="submit" variant="primary" size="large">
              Login
            </Button>
            <Typography variant="subtitle1" sx={{ fontWeight: "500", mt: 2 }}>
              Dont have an account?
              <Typography
                component="a"
                sx={{ color: "#1273EB", fontWeight: "500", pl: 1 }}
                href="/register"
              >
                Sign up
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default React.memo(LoginForm);
