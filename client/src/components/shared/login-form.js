// THIS IS FILE TO TEST THE CUSTOM UI COMPONENTS
import React, { useEffect, useReducer, useState } from "react";
import { Grid, Box, Typography, useTheme, Button } from "@mui/material";
import { ContentMiddle, ContentEnd } from "../../styles/shared-styles";
import { TextFieldOutlined } from "../UI/custom-UI";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { ErrorBlinkingAnimation } from "../animation/custom-animation";
import axios from "axios";

export const LoginForm = () => {
  //call theme component
  const theme = useTheme();
  // call the colors
  const lightColor = theme.palette.light.main;
  const dangerMain = theme.palette.danger.main;
  const primaryMain = theme.palette.primary.main;
  const errorColor = theme.palette.error.main;

  const [errorAnimation, setErrorAnimation] = useState({
    username: false,
    password:false
  })

  const endAnimation = (field) => {
    setErrorAnimation((prev) => ({
      ...prev,
      [field]: false,
    }));
  };
  const startAnimation = (field) => {
    setErrorAnimation((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  //using reducer to handle input fields
  const inputReducer = (state, action) => {
    //this is called when there is an input change on the field
    if (action.type === "INPUT_CHANGE") {
      return {
        value: action.value,
        errorMsg: state.errorMsg,
        inputVisibility: state.inputVisibility,
        focus: state.focus,
      };
    }

    //this function is to set the error message
    if (action.type === "HANDLE_ERROR") {
      return {
        value: state.value,
        errorMsg: action.errorMsg,
        inputVisibility: state.inputVisibility,
        focus: state.focus,
      };
    }
    //this function is to set the focus state when user click on a text field
    if (action.type === "HANDLE_FOCUS") {
      return {
        value: state.value,
        errorMsg: state.errorMsg,
        inputVisibility: state.inputVisibility,
        focus: action.focus,
      };
    }
    //function to set visibility of the inputted value of the field
    if (action.type === "SET_VISIBILITY") {
      return {
        value: state.value,
        errorMsg: state.errorMsg,
        inputVisibility: action.inputVisibility,
        focus: state.focus,
      };
    }
  };

  //This is the username state reducer
  const [usernameState, dispatchUsername] = useReducer(inputReducer, {
    value: "",
    errorMsg: "",
    inputVisibility: true,
    focus: false,
  });

  // This is the password state reducer
  const [passwordState, dispatchPassword] = useReducer(inputReducer, {
    value: "",
    errorMsg: "",
    inputVisibility: false,
    focus: false,
  });

  //Handle the username change
  const handleUsernameChange = (event) => {
    //reset error on new input
    dispatchUsername({
      type: "HANDLE_ERROR",
      errorMsg: "",
    }); //remove error when field is focused
    dispatchUsername({ type: "INPUT_CHANGE", value: event.target.value });
  };
  //handle usernmae blur
  const handleUsernameBlur = () => {
    if (usernameState.value.trim().length === 0) {
      dispatchUsername({
        type: "HANDLE_ERROR",
        errorMsg: "Username is empty",
      }); //if user have clicked the field and left it empty an error shows
    }
    dispatchUsername({ type: "HANDLE_FOCUS", focus: false }); //set focused to false
  };
  // Handle the password change
  const handlePasswordChange = (event) => {
    dispatchPassword({
      type: "HANDLE_ERROR",
      errorMsg: "",
    });
    dispatchPassword({ type: "INPUT_CHANGE", value: event.target.value });
  };

  const handlePasswordBlur = () => {
    if (passwordState.value.trim().length === 0) {
      dispatchPassword({
        type: "HANDLE_ERROR",
        errorMsg: "Password is empty",
      });
    }
    dispatchPassword({ type: "HANDLE_FOCUS", focus: false });
  };
  // Function to set password to visible
  const handleSetPassVisible = () => {
    dispatchPassword({ type: "SET_VISIBILITY", inputVisibility: true });
  };
  //Function to hide the password
  const handleSetPassInvisible = () => {
    dispatchPassword({ type: "SET_VISIBILITY", inputVisibility: false });
  };

  //function to fetch the login api
  const fetchLoginApi = async (loginData) => {
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
        dispatchUsername({
          type: "HANDLE_ERROR",
          errorMsg: error.response.data.message,
        });
        dispatchPassword({
          type: "HANDLE_ERROR",
          errorMsg: error.response.data.message,
        });
      }
    }
  };

  const usernameIsEmpty = () => {
    //empty check
    if (usernameState.value.trim().length === 0) {
      dispatchUsername({
        type: "HANDLE_ERROR",
        errorMsg: "Username is empty",
      });
      return true;
    }
    return false;
  };

  const passwordIsEmpty = () => {
    if (passwordState.value.trim().length === 0) {
      dispatchPassword({
        type: "HANDLE_ERROR",
        errorMsg: "Password is empty",
      });
      return true;
    }
    return false;
  };

  const onAnimationComplete = {
    username: ()=>{
      endAnimation('username')
    },
    password: ()=>{
      endAnimation('password')
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const usernameEmpty = usernameIsEmpty();
    const passEmpty = passwordIsEmpty();
    //if one field is empty do not continue
    if (usernameEmpty || passEmpty) {
      if(usernameEmpty && passEmpty){
        startAnimation('username')
        startAnimation('password')
      }else if (passEmpty){
        startAnimation('password')
      }else{
        startAnimation('username')
      }
      return;
    }
    // if less than 8 dont bother fetch api
    if (
      passwordState.value.trim().length < 8 ||
      usernameState.value.trim().length < 8
    ) {
      dispatchUsername({
        type: "HANDLE_ERROR",
        errorMsg: "Invalid Username or Password",
      });
      dispatchPassword({
        type: "HANDLE_ERROR",
        errorMsg: "Invalid Username or Password",
      });
      startAnimation('username')
      startAnimation('password')
    }
    //get the login data
    const loginData = {
      username: usernameState.value,
      password: passwordState.value,
    };
    fetchLoginApi(loginData);
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
          onSubmit={handleFormSubmit}
          sx={{ width: "360px" }}
          display="flex"
          flexDirection="column"
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
          <ErrorBlinkingAnimation
            showAnimation={errorAnimation.username}
            onAnimationComplete={onAnimationComplete.username}
          >
            <TextFieldOutlined
              message={
                usernameState.errorMsg && (
                  <Typography
                    variant="caption"
                    component="span"
                    sx={{ color: errorColor }}
                  >
                    {usernameState.errorMsg}
                  </Typography>
                )
              }
              display={usernameState.errorMsg && "error"}
              onChange={handleUsernameChange}
              value={usernameState.value}
              label="Username"
              onBlur={handleUsernameBlur}
              iconLeft={<Icon icon="ic:round-person" width="32" />}
              iconRight={
                usernameState.errorMsg && (
                  <Icon
                    icon="ep:warning-filled"
                    color={dangerMain}
                    width="32"
                  />
                )
              }
              sx={{ mb: 2 }}
            />
          </ErrorBlinkingAnimation>
          <ErrorBlinkingAnimation
            showAnimation={errorAnimation.password}
            onAnimationComplete={onAnimationComplete.password}
          >
            <TextFieldOutlined
              type={`${passwordState.inputVisibility ? "text" : "password"}`}
              value={passwordState.value}
              label="Password"
              onChange={handlePasswordChange}
              display={passwordState.errorMsg && "error"}
              message={
                passwordState.errorMsg && (
                  <Typography
                    variant="caption"
                    component="span"
                    sx={{ color: errorColor }}
                  >
                    {passwordState.errorMsg}
                  </Typography>
                )
              }
              onBlur={handlePasswordBlur}
              iconLeft={<Icon icon="material-symbols:lock" width="32" />}
              iconRight={
                <>
                  {!passwordState.inputVisibility ? (
                    <Icon
                      onClick={handleSetPassVisible}
                      style={{ cursor: "pointer" }}
                      icon="mdi:hide"
                      width="32"
                    />
                  ) : (
                    <Icon
                      onClick={handleSetPassInvisible}
                      style={{ cursor: "pointer" }}
                      icon="mdi:eye"
                      width="32"
                    />
                  )}
                  {passwordState.errorMsg && (
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
          </ErrorBlinkingAnimation>
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
