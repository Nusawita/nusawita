// THIS IS FILE TO TEST THE CUSTOM UI COMPONENTS
import React, { useEffect, useReducer } from "react";
import { Grid, Box, Typography, useTheme, Button } from "@mui/material";
import { ContentMiddle, ContentEnd } from "../../styles/shared-styles";
import { TextFieldFilled } from "../UI/custom-UI";
import { Icon } from "@iconify/react";

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
      };
    }
    // this is called when we want to set error message and also decide whether to show the error or not
    if (action.type === "HANDLE_ERROR") {
      return {
        value: state.value,
        isValid: false,
        showError: action.showError, //variable to get the showError (true/false) from dispatch
        errorMsg: action.errorMsg, //variable to get the errorMsg from dispatch
        inputVisibility: state.inputVisibility,
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
      };
    }
    //this function remembers when user have focused on a field using the hadBeenFocused variable (true/false)
    if (action.type === "HANDLE_FOCUSED") {
      return {
        value: state.value,
        isValid: state.isValid,
        showError: state.showError,
        errorMsg: state.errorMsg,
        inputVisibility: state.inputVisibility,
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
      };
    }
  };
  const [usernameState, dispatchUsername] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    showError: false,
    errorMsg: "",
  });

  const [passwordState, dispatchPassword] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    showError: false,
    errorMsg: "",
    inputVisibility: false,
  });

  const handleUsernameChange = (event) => {
    dispatchUsername({ type: "INPUT_CHANGE", value: event.target.value });
  };
  const handlePasswordChange = (event) => {
    dispatchPassword({ type: "INPUT_CHANGE", value: event.target.value });
  };

  const handleSetVisible = () => {
    dispatchPassword({ type: "SET_VISIBILITY", inputVisibility: true });
  };
  const handleSetInvisible = () => {
    dispatchPassword({ type: "SET_VISIBILITY", inputVisibility: false });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (passwordState.value.trim().length === 0) {
        dispatchPassword({
          type: "HANDLE_ERROR",
          showError: true,
          errorMsg: "Password cannot be empty",
        });
      }
    });
    return () => {
      clearTimeout(timeout);
    };
  }, [passwordState.value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (usernameState.value.trim().length < 5) {
        if (usernameState.value.trim().length === 0) {
          dispatchUsername({
            type: "HANDLE_ERROR",
            showError: true,
            errorMsg: "Username cannot be empty",
          });
        } else {
          dispatchUsername({
            type: "HANDLE_ERROR",
            showError: true,
            errorMsg: "Username must be 5 or more characters",
          });
        }
      } else {
        dispatchUsername({ type: "HANDLE_VALIDITY", isValid: true });
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [usernameState.value]);

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
        <Grid
          item
          xs={6}
          sx={{ ...ContentMiddle, backgroundColor: lightColor }}
        >
          <Box sx={{ width: "360px" }} display="flex" flexDirection="column">
            <Box sx={{ ...ContentMiddle }}>
              <Box
                sx={{
                  width: "155px",
                  height: "120px",
                  backgroundImage: "url(logos/nusawita_logo_circle.png)",
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
              iconLeft={<Icon icon="material-symbols:lock" width="32" />}
              iconError={
                <Icon icon="ep:warning-filled" color={dangerMain} width="32" />
              }
              iconRight={
                !passwordState.inputVisibility ? (
                  <Icon
                    onClick={handleSetVisible}
                    style={{ cursor: "pointer" }}
                    icon="mdi:hide"
                    width="32"
                  />
                ) : (
                  <Icon
                    onClick={handleSetInvisible}
                    icon="mdi:eye"
                    width="32"
                  />
                )
              }
              sx={{ mb: 2 }}
            />
            <Box sx={{ width: "100%", ...ContentEnd, mb:2 }}>
              <Typography variant="subtitle1" component="a" href="/" sx = {{ color:primaryMain, fontWeight:"500" }}>Forgot Password?</Typography>
            </Box>
          </Box>
          <Box>
            <Button variant="primary" size="large">
              Login
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            backgroundImage: "url(images/dark_mountain_bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
      </Grid>
  );
};
