// THIS IS FILE TO TEST THE CUSTOM UI COMPONENTS
import React, { useEffect, useReducer} from "react";
import { Grid, Box, Typography, useTheme, Button } from "@mui/material";
import { ContentMiddle, ContentEnd } from "../../styles/shared-styles";
import { TextFieldFilled } from "../UI/custom-UI";
import { Icon } from "@iconify/react";
import axios from "axios";

export const AdminLoginForm = () => {
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
  const handleUsernameFocus = () => {
    dispatchUsername({ type: "HANDLE_FOCUS", focus: true });
    dispatchUsername({ type: "HANDLE_ERROR", showError: false });
  };
  const handleUsernameBlur = () => {
    if (usernameState.value.trim().length === 0) {
      dispatchUsername({
        type: "HANDLE_ERROR",
        showError: true,
        errorMsg: "Password cannot be empty",
      });
    }
    dispatchUsername({ type: "HANDLE_FOCUS", focus: false });
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

  const fetchLoginApi = async (loginData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        loginData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        window.location.href = "/admin/dashboard";
      }
    } catch (error) {
      if (error.response.status === 401) {
        dispatchUsername({
          type: "HANDLE_ERROR",
          showError: true,
          errorMsg: error.response.data.errLogin.message,
        });
        dispatchPassword({
          type: "HANDLE_ERROR",
          showError: true,
          errorMsg: error.response.data.errLogin.message,
        });
      }
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const loginData = {
      username: usernameState.value,
      password: passwordState.value,
    };
    if (!usernameState.isValid || !passwordState.isValid) {
      return;
    }
    fetchLoginApi(loginData);
  };

  return (
    <Grid
      container
      sx={{
        width: "970px",
        height: "569px",
        boxShadow: "0px 10px 15px 3px rgba(226, 226, 226, 0.25)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Grid item xs={6} sx={{ ...ContentMiddle, backgroundColor: lightColor }}>
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
          <TextFieldFilled
            showError={usernameState.showError}
            errorMsg={usernameState.errorMsg}
            onChange={handleUsernameChange}
            value={usernameState.value}
            label="Username"
            onFocus={handleUsernameFocus}
            onBlur={handleUsernameBlur}
            iconLeft={<Icon icon="ic:round-person" width="32" />}
            iconError={
              <Icon icon="ep:warning-filled" color={dangerMain} width="32" />
            }
            sx={{ mb: 2 }}
          />
          <TextFieldFilled
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
                  icon="mdi:eye"
                  width="32"
                />
              )
            }
            sx={{ mb: 2 }}
          />
          <Box sx={{ width: "100%", ...ContentEnd, mb: 2 }}>
            <Typography
              variant="subtitle1"
              component="a"
              href="/"
              sx={{ color: primaryMain, fontWeight: "500" }}
            >
              Forgot Password?
            </Typography>
          </Box>
          <Box>
            <Button type="submit" variant="primary" size="large">
              Login
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          backgroundImage: "url(/images/dark_mountain_bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>
    </Grid>
  );
};
