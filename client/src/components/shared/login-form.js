// THIS IS FILE TO TEST THE CUSTOM UI COMPONENTS
import React, { useEffect, useReducer } from "react";
import { Grid, Box, Typography, useTheme, Button } from "@mui/material";
import { ContentMiddle, ContentEnd } from "../../styles/shared-styles";
import { TextFieldOutlined, TextFieldFilled } from "../UI/custom-UI";
import { Icon } from "@iconify/react";
import axios from "axios";

export const LoginForm = () => {
  //call theme component
  const theme = useTheme();
  // call the colors
  const lightColor = theme.palette.light.main;
  const dangerMain = theme.palette.danger.main;
  const primaryMain = theme.palette.primary.main;

  //using reducer to handle input fields
  const inputReducer = (state, action) => {
    //this is called when there is an input change on the field
    if (action.type === "INPUT_CHANGE") {
      return {
        value: action.value,
        isValid: false,
        showError: false,
        errorMsg: "",
        inputVisibility: state.inputVisibility,
        focus: state.focus,
      };
    }
    // this is called when we want to set error message and also decide whether to show the error or not
    if (action.type === "HANDLE_ERROR") {
      return {
        value: state.value,
        isValid: state.isValid,
        showError: action.showError, //variable to get the showError (true/false) from dispatch
        errorMsg: action.errorMsg, //variable to get the errorMsg from dispatch
        inputVisibility: state.inputVisibility,
        focus: state.focus,
      };
    }
    //this function is to set the validity of the data inputted (true/false)
    if (action.type === "HANDLE_VALIDITY") {
      return {
        value: state.value,
        isValid: action.isValid, //variable to get the isValid(true/false) from dispatch
        showError: state.showError,
        errorMsg: state.errorMsg,
        inputVisibility: state.inputVisibility,
        focus: state.focus,
      };
    }
    //this function is to set the focus state when user click on a text field
    if (action.type === "HANDLE_FOCUS") {
      return {
        value: state.value,
        isValid: state.isValid,
        showError: state.showError,
        errorMsg: state.errorMsg,
        inputVisibility: state.inputVisibility,
        focus: action.focus,
      };
    }
    //function to set visibility of the inputted value of the field
    if (action.type === "SET_VISIBILITY") {
      return {
        value: state.value,
        isValid: state.isValid,
        showError: state.showError,
        errorMsg: state.errorMsg,
        inputVisibility: action.inputVisibility,
        focus: state.focus,
      };
    }
  };

  //This is the username state reducer
  const [usernameState, dispatchUsername] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    showError: false,
    errorMsg: "",
    inputVisibility: true,
    focus: false,
  });

  // This is the password state reducer
  const [passwordState, dispatchPassword] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    showError: false,
    errorMsg: "",
    inputVisibility: false,
    focus: false,
  });

  //Handle the username change
  const handleUsernameChange = (event) => {
    dispatchUsername({ type: "INPUT_CHANGE", value: event.target.value });
  };
  //handle username focus
  const handleUsernameFocus = () => {
    dispatchUsername({ type: "HANDLE_FOCUS", focus: true }); //set focus is true
    dispatchUsername({ type: "HANDLE_ERROR", showError: false }); //remove error when field is focused
  };
  //handle usernmae blur
  const handleUsernameBlur = () => {
    if (usernameState.value.trim().length === 0) {
      dispatchUsername({
        type: "HANDLE_ERROR",
        showError: true,
        errorMsg: "Username cannot be empty",
      }); //if user have clicked the field and left it empty an error shows
    }
    dispatchUsername({ type: "HANDLE_FOCUS", focus: false }); //set focused to false
  };
  // Handle the password change
  const handlePasswordChange = (event) => {
    dispatchPassword({ type: "INPUT_CHANGE", value: event.target.value });
  };
  const handlePasswordFocus = () => {
    dispatchPassword({ type: "HANDLE_FOCUS", focus: true });
    dispatchPassword({ type: "HANDLE_ERROR", showError: false });
  };
  const handlePasswordBlur = () => {
    if (passwordState.value.trim().length === 0) {
      dispatchPassword({
        type: "HANDLE_ERROR",
        showError: true,
        errorMsg: "Password cannot be empty",
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

  //Check the validity of the password input
  useEffect(() => {
    //Use timeout so function only runs after user finished typing
    const timeout = setTimeout(() => {
      //If no value is inputted print error "password cannot be empty"
      if (passwordState.value.trim().length === 0) {
        dispatchPassword({
          type: "HANDLE_ERROR",
          showError: false,
          errorMsg: "Password cannot be empty",
        });
      } else {
        dispatchPassword({ type: "HANDLE_VALIDITY", isValid: true });
      }
    });
    //Reset the timeout
    return () => {
      clearTimeout(timeout);
    };
  }, [passwordState.value]);

  //Check validity of the username input
  useEffect(() => {
    // Use timeout so check only runs after user finished typing
    const timeout = setTimeout(() => {
      //Username must be 5 or more characters long
      if (usernameState.value.trim().length < 8) {
        //Username cannot be empty
        if (usernameState.value.trim().length === 0) {
          dispatchUsername({
            type: "HANDLE_ERROR",
            showError: false,
            errorMsg: "Username cannot be empty",
          });
        } else {
          dispatchUsername({
            type: "HANDLE_ERROR",
            showError: true,
            errorMsg: "Username must be 8 or more characters",
          });
        }
      } else {
        //If all checks passed username is valid (requirements wise)
        dispatchUsername({ type: "HANDLE_VALIDITY", isValid: true });
      }
    }, 450);
    // Reset timeout
    return () => {
      clearTimeout(timeout);
    };
  }, [usernameState.value]);

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
          showError: true,
          errorMsg: error.response.data.message,
        });
        dispatchPassword({
          type: "HANDLE_ERROR",
          showError: true,
          errorMsg: error.response.data.message,
        });
      }
    }
  };

  //handle the form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    //get the login data
    const loginData = {
      username: usernameState.value,
      password: passwordState.value,
    };
    //if username or password s not valid show error to fill form correctly
    if (!usernameState.isValid || !passwordState.isValid) {
      dispatchUsername({
        type: "HANDLE_ERROR",
        showError: true,
        errorMsg: "Please fill form correctly before submitting",
      });

      dispatchPassword({
        type: "HANDLE_ERROR",
        showError: true,
        errorMsg: "Please fill form correctly before submitting",
      });
      return;
    }
    //if username and password valid fetch login api
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
            Admin Login
          </Typography>
          <TextFieldOutlined
            showError={usernameState.showError}
            errorMsg={usernameState.errorMsg}
            onChange={handleUsernameChange}
            value={usernameState.value}
            label="Username"
            onFocus={handleUsernameFocus}
            onBlur={handleUsernameBlur}
            iconLeft={<Icon icon="ic:round-person" width="32" />}
            iconRight={
              usernameState.showError && (
                <Icon icon="ep:warning-filled" color={dangerMain} width="32" />
              )
            }
            sx={{ mb: 2 }}
          />
          <TextFieldOutlined
            type={`${passwordState.inputVisibility ? "text" : "password"}`}
            value={passwordState.value}
            label="Password"
            onChange={handlePasswordChange}
            showError={passwordState.showError}
            errorMsg={passwordState.errorMsg}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            iconLeft={<Icon icon="material-symbols:lock" width="32" />}
            iconError={
              <Icon icon="ep:warning-filled" color={dangerMain} width="32" />
            }
            iconRight={
              passwordState.showError ? (
                <Icon icon="ep:warning-filled" color={dangerMain} width="32" />
              ) : !passwordState.inputVisibility ? (
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
              )
            }
            sx={{ mb: 2 }}
          />
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
