// THIS IS FILE TO TEST THE CUSTOM UI COMPONENTS
import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, useTheme, Button } from "@mui/material";
import { ContentMiddle, ContentEnd } from "../../styles/shared-styles";
import { TextFieldOutlined } from "../UI/custom-UI";
import { Icon } from "@iconify/react";
import { ErrorVibrateAnimation } from "../animation/custom-animation";
import axios from "axios";

const LoginForm = () => {
  console.log('rerenders')
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

  const [passwordError, setPasswordError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [authError, setAuthError] = useState(false);

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
    },
    setHidden: () => {
      setPasswordVisibility(false);
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
    const timeout = setTimeout(() => {
      setUsernameError("");
      hideError("username");
      setPasswordError('')
      hideError('password')
      setAuthError(false);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [enteredUsername]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPasswordError("");
      hideError("password");
      setPasswordError('')
      hideError('username')
      setAuthError(false);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
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
    console.log("fetchApi");
    try {
      // call login api
      const res = await axios.post(
        "http://localhost:5000/api/login",
        loginData,
        { withCredentials: true }
      );
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
        startAnimation('username')
        startAnimation('password')
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
      startAnimation('username')
      startAnimation('password')
      return;
    }
    if (enteredUsername.trim().length === 0) {
      setUsernameError("Username Is Empty");
      showError("username");
      startAnimation('username')
      return;
    }
    if (enteredPassword.trim().length === 0) {
      setPasswordError("Password is empty");
      showError("password");
      startAnimation('password')
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
      startAnimation('username')
      startAnimation('password')
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
          <ErrorVibrateAnimation
            showAnimation={errorAnimation.username}
            onAnimationComplete={handleAnimationComplete.username}
          >
            <TextFieldOutlined
              label="Username"
              labelDisplay={errorShow.username && "error"}
              display={errorShow.username && "error"}
              value={enteredUsername}
              onChange={changeHandler.username}
              sx={{ mb: 2 }}
              message={
                errorShow.username && (
                  <Typography
                    variant="caption"
                    component="p"
                    color={errorColor}
                  >
                    {usernameError}
                  </Typography>
                )
              }
              iconLeft={<Icon icon="ic:round-person" width="32" />}
              iconRight={
                errorShow.username && (
                  <Icon
                    icon="ep:warning-filled"
                    color={dangerMain}
                    width="32"
                  />
                )
              }
            />
          </ErrorVibrateAnimation>
          <ErrorVibrateAnimation
          showAnimation = {errorAnimation.password}
          onAnimationComplete = {handleAnimationComplete.password}
          >
            <TextFieldOutlined
              label="Password"
              type={!passwordVisibility ? "password" : "text"}
              labelDisplay={errorShow.password && "error"}
              display={errorShow.password && "error"}
              value={enteredPassword}
              onChange={changeHandler.password}
              message={
                errorShow.password && (
                  <Typography
                    variant="caption"
                    component="p"
                    color={errorColor}
                  >
                    {passwordError}
                  </Typography>
                )
              }
              iconLeft={<Icon icon="material-symbols:lock" width="32" />}
              iconRight={
                <>
                  {" "}
                  {!passwordVisibility ? (
                    <Icon
                      onClick={handleVisibility.setVisible}
                      style={{ cursor: "pointer" }}
                      icon="mdi:hide"
                      width="32"
                    />
                  ) : (
                    <Icon
                      onClick={handleVisibility.setHidden}
                      style={{ cursor: "pointer" }}
                      icon="mdi:eye"
                      width="32"
                    />
                  )}
                  {errorShow.password && (
                    <Icon
                      icon="ep:warning-filled"
                      color={dangerMain}
                      width="32"
                    />
                  )}
                </>
              }
              sx={{ mb: 2 }}
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
