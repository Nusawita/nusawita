import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, useTheme, Button } from "@mui/material";
import { ContentMiddle, ContentEnd } from "../../styles/shared-styles";
import { TextFieldOutlined, TextFieldFilled } from "../UI/custom-UI";

import { Icon } from "@iconify/react";

const RegisterForm = () => {
  const theme = useTheme();
  // call the colors
  const lightColor = theme.palette.light.main;
  const dangerMain = theme.palette.danger.main;

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [date, setDate] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = {
    username: (event) => {
      setUsername(event.target.value);
    },
  };

  const validator = {
    checkEmpty: {
      username: () => {
        if (username.trim().length === 0) {
          setUsernameError("Username cannot be empty");
        }
      },
    },
    checkValid:{
      username: () =>{
        if(username.trim().length<8){
          setUsernameError("Username must be 8 or more characters long")
        }
      }
    }
  };

  useEffect(()=>{
    validator.checkValid.username()
  },[username])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
    };
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
      <Grid
        item
        xs={4}
        sx={{
          ...ContentMiddle,
          backgroundColor: lightColor,
          height: "100%",
          mt: 5,
          mb: 5,
        }}
      >
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{ width: "360px" }}
          display="60px"
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
            Create an Account
          </Typography>

          <TextFieldOutlined
            label="Username"
            iconLeft={<Icon icon="ic:round-person" width="32" />}
            sx={{ mb: 2 }}
            value={username}
            onChange={handleChange.username}
            errorMsg = {usernameError}
          />
          <TextFieldOutlined
            label="Date of Birth"
            iconRight={<Icon icon="ic:baseline-date-range" width="32" />}
            sx={{ mb: 2 }}
            type="date"
          />
          <TextFieldOutlined
            label="Phone"
            iconLeft={<Icon icon="solar:phone-bold" width="32" />}
            sx={{ mb: 2 }}
          />
          <TextFieldOutlined
            label="Email"
            iconLeft={<Icon icon="ic:round-person" width="32" />}
            sx={{ mb: 2 }}
          />
          <TextFieldOutlined
            label="Password"
            iconLeft={<Icon icon="material-symbols:lock" width="32" />}
            iconError={
              <Icon icon="ep:warning-filled" color={dangerMain} width="32" />
            }
            sx={{ mb: 2 }}
            type="password"
          />
          <TextFieldOutlined
            label="Confirm Password"
            iconLeft={<Icon icon="material-symbols:lock" width="32" />}
            iconError={
              <Icon icon="ep:warning-filled" color={dangerMain} width="32" />
            }
            sx={{ mb: 2 }}
            type="password"
          />
          <Box sx={{ ...ContentMiddle }}>
            <Button type="submit" variant="primary" size="large">
              SIGN IN
            </Button>
            <Typography variant="subtitle1" sx={{ fontWeight: "500", mt: 2 }}>
              Already Have An Account?
              <Typography
                component="a"
                sx={{ color: "#1273EB", fontWeight: "500", pl: 1 }}
              >
                Login
              </Typography>
            </Typography>
          </Box>
          <Typography sx={{ ...ContentMiddle }}>
            By continuing, you agree to NusaWita Company's
          </Typography>
          <Typography align="center">
            <Typography
              component="span"
              sx={{ color: "#1273EB", fontWeight: "500", pl: 1 }}
            >
              Terms of Use
            </Typography>{" "}
            and
            <Typography
              component="span"
              sx={{ color: "#1273EB", fontWeight: "500", pl: 1 }}
            >
              Privacy Policy
            </Typography>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
