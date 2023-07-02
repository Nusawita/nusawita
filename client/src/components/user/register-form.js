import React, { useState, useEffect, useRef } from "react";
import { Grid, Box, Typography, useTheme, Button } from "@mui/material";
import { ContentMiddle } from "../../styles/shared-styles";
import { CustomDatePicker, TextFieldOutlined } from "../UI/custom-UI";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ErrorBlinkingAnimation } from "../animation/custom-animation";

import { Icon } from "@iconify/react";

const RegisterForm = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const theme = useTheme();
  // call the colors
  const lightColor = theme.palette.light.main;
  const dangerMain = theme.palette.danger.main;

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [date, setDate] = useState(dayjs("2011-09-24").utc());
  const [dateError, setDateError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  //TO START ERROR ANIMATION
  const [errorAnimation, setErrorAnimation] = useState({
    username: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: "false",
  });

  const [formValidity, setFormValidity] = useState({
    username: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [errorShow, setErrorShow] = useState({
    username: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
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

  const setValid = (field) => {
    setFormValidity((prev) => ({
      ...prev,
      [field]: true,
    }));
  };
  const setInvalid = (field) => {
    setFormValidity((prev) => ({
      ...prev,
      [field]: false,
    }));
  };
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
  const changeHandler = {
    username: (event) => {
      setUsername(event.target.value);
    },
    phone: (event) => {
      const input = event.target.value;
      const numericInput = input.replace(/\D/g, ""); // Remove non-numeric characters
      setPhone(numericInput);
    },
    email: (event) => {
      setEmail(event.target.value);
    },
    password: (event) => {
      setPassword(event.target.value);
    },
    confirmPassword: (event) => {
      setConfirmPassword(event.target.value);
    },
  };
  const visibilityHandler = {
    password: {
      setVisible: () => {
        setPasswordVisible(true);
      },
      setHidden: () => {
        setPasswordVisible(false);
      },
    },
    confirmPassword: {
      setVisible: () => {
        setConfirmPasswordVisible(true);
      },
      setHidden: () => {
        setConfirmPasswordVisible(false);
      },
    },
  };

  // Reset all error in focus
  const validator = {
    checkValid: {
      //Username validator
      username: () => {
        if (username.trim().length === 0) {
          setInvalid("username");
          setUsernameError("Username cannot be empty");
          return;
        }
        if (username.trim().length < 8) {
          setInvalid("username");
          setUsernameError("Username must be 8 or more characters long");
          showError("username");
        } else {
          setValid("username");
          setUsernameError("");
          hideError("username");
        }
      },
      date: () => {
        try {
          const parsed = dayjs(date);
          if (parsed.isValid()) {
            setValid("date");
            setDateError("");
            return;
          } else {
            setInvalid("date");
            throw new Error("Invalid date");
          }
        } catch (error) {
          setInvalid("date");
          setDateError("Please provide a valid date");
        }
      },
      phone: () => {
        if (!phone) {
          setValid("phone");
          setPhoneError("");
          hideError("phone");
          return;
        }
        if (phone.trim().length < 11 || phone.trim().length > 12) {
          setInvalid("phone");
          setPhoneError(
            "Phone must be 11 or 12 characters or you can leave this empty"
          );
          showError("phone");
        } else {
          setValid("phone");
          setPhoneError("");
          hideError("phone");
        }
      },
      // Email validator
      email: () => {
        if (email.trim().length === 0) {
          setInvalid("email");
          setEmailError("Email cannot be empty");
          return;
        }
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email) && email) {
          setInvalid("email");
          setEmailError("Please enter a valid email");
          showError("email");
        } else {
          setValid("email");
          setEmailError("");
          hideError("email");
        }
      },
      //Pass Validator
      password: () => {
        if (password.trim().length === 0) {
          setInvalid("password");
          setPasswordError("Password cannot be empty");
          return;
        }
        if (password.trim().length < 8) {
          setInvalid("password");
          setPasswordError("Password must be 8 or more characters");
          showError("password");
          return;
        }
        if (password !== confirmPassword && confirmPassword) {
          setInvalid("confirmPassword");
          setConfirmPasswordError("Confirm password doesn't match");
          showError("confirmPassword");
          return;
        }
        setValid("confirmPassword");
        setConfirmPasswordError("");
        hideError("confirmPassword");
        setValid("password");
        setPasswordError("");
        hideError("password");
      },
      confirmPassword: () => {
        if (!formValidity.password && confirmPassword) {
          setInvalid("confirmPassword");
          setConfirmPasswordError("Please fill password correctly first");
          showError("confirmPassword");
          return;
        }
        if (confirmPassword.trim().length === 0) {
          setInvalid("confirmPassword");
          setConfirmPasswordError("Confirm password cannot be empty");
          return;
        }
        if (password === confirmPassword) {
          setValid("confirmPassword");
          setConfirmPasswordError("");
          hideError("confirmPassword");
          return;
        }
        setInvalid("confirmPassword");
        setConfirmPasswordError("Confirm password doesn't match");
        showError("confirmPassword");
      },
    },
  };

  const blurHandler = {
    // Show empty error on blur
    username: () => {
      if (username.trim().length === 0) {
        setUsernameError("Username cannot be empty");
        showError("username");
      }
    },
    email: () => {
      if (email.trim().length === 0) {
        setEmailError("Email cannot be empty");
        showError("email");
      }
    },
    password: () => {
      if (password.trim().length === 0) {
        setPasswordError("Password cannot be empty");
        showError("password");
      }
    },
    confirmPassword: () => {
      if (confirmPassword.trim().length === 0) {
        setConfirmPasswordError("Confirm password cannot be empty");
        showError("confirmPassword");
      }
    },
  };

  const handleAnimationComplete = {
    username: () => {
      endAnimation("username");
    },
    date: () => {
      endAnimation("date");
    },
    phone: () => {
      endAnimation("phone");
    },
    email: () => {
      endAnimation("email");
    },
    password: () => {
      endAnimation("password");
    },
    confirmPassword: () => {
      endAnimation("confirmPassword");
    },
  };

  // Run check on value change with delay (wait for user typing)
  useEffect(() => {
    const timeout = setTimeout(() => {
      validator.checkValid.username();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [username]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      validator.checkValid.date();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [date]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      validator.checkValid.phone();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [phone]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      validator.checkValid.email();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [email]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      validator.checkValid.password();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [password]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      validator.checkValid.confirmPassword();
    });
    return () => {
      clearTimeout(timeout);
    };
  }, [confirmPassword]);

  const fetchRegisterAPI = async (registerData) => {
    alert("serverr fetched");
    try {
      // call login api
      const res = await axios.post(
        "http://localhost:5000/api/register",
        registerData,
        { withCredentials: true }
      );
      //if login success redirect to landing page
      if (res.status === 201) {
        alert("Succesfully registered");
        //log user in
        const loginData = {
          username: registerData.username,
          password: registerData.password,
        };
        fetchLoginApi(loginData);
      }
    } catch (error) {
      // if unauthorized then show appropiate error in front
      if (error.response.status === 409) {
        setUsernameError("Username or email taken");
        showError("username");
        setInvalid("username");
        setEmailError("Username or email taken");
        showError("email");
        setInvalid("email");
      }
    }
  };

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
      alert("server error");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    //DEBUGGING
    const validObject = {
      username: formValidity.username,
      date: formValidity.date,
      phone: formValidity.phone,
      email: formValidity.email,
      password: formValidity.password,
      confirmPassword: formValidity.confirmPassword,
    };
    // console.log(validObject);
    //END OF DEBUGGING

    //IF ALL VALID
    if (
      formValidity.username &&
      formValidity.date &&
      formValidity.phone &&
      formValidity.email &&
      formValidity.password &&
      formValidity.confirmPassword
    ) {
      const registerData = {
        username: username,
        email: email,
        password: password,
        noTelp: phone,
        dob: date.format("YYYY-MM-DD"),
        isAdmin: false,
        ban: 0,
      };
      fetchRegisterAPI(registerData);
      return;
    }
    //Else show error if not already
    else {
      if (usernameError) {
        showError("username");
        startAnimation("username");
      }
      if (phoneError) {
        showError("phone");
        startAnimation("phone");
      }
      if (dateError) {
        showError("date");
        startAnimation("date");
      }
      if (emailError) {
        showError("email");
        startAnimation("email");
      }
      if (passwordError) {
        showError("password");
        startAnimation("password");
      }
      if (confirmPasswordError) {
        showError("confirmPassword");
        startAnimation("confirmPassword");
      }
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

          <ErrorBlinkingAnimation
            showAnimation={errorAnimation.username}
            onAnimationComplete={handleAnimationComplete.username}
          >
            <TextFieldOutlined
              label="Username"
              iconLeft={<Icon icon="ic:round-person" width="32" />}
              sx={{ mb: 2 }}
              value={username}
              onChange={changeHandler.username}
              display={errorShow.username && "error"}
              message={
                errorShow.username && (
                  <Typography sx={{ color: dangerMain }} variant="caption">
                    {usernameError}
                  </Typography>
                )
              }
              onBlur={blurHandler.username}
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
          </ErrorBlinkingAnimation>
          <ErrorBlinkingAnimation
            showAnimation={errorAnimation.date}
            onAnimationComplete={handleAnimationComplete.date}
          >
            <CustomDatePicker
              sx={{ mb: 2 }}
              label="Birth Date"
              value={date}
              display={dateError && "error"}
              message={
                dateError && (
                  <Typography sx={{ color: dangerMain }} variant="caption">
                    {dateError}
                  </Typography>
                )
              }
              onChange={(newDate) => {
                setDate(dayjs(newDate).utc());
              }}
            />
          </ErrorBlinkingAnimation>
          <ErrorBlinkingAnimation
            showAnimation={errorAnimation.phone}
            onAnimationComplete={handleAnimationComplete.phone}
          >
            <TextFieldOutlined
              label="Phone (optional)"
              value={phone}
              onChange={changeHandler.phone}
              display={errorShow.phone && "error"}
              message={
                errorShow.phone && (
                  <Typography sx={{ color: dangerMain }} variant="caption">
                    {phoneError}
                  </Typography>
                )
              }
              iconLeft={<Icon icon="solar:phone-bold" width="32" />}
              iconRight={
                errorShow.phone && (
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
            showAnimation={errorAnimation.email}
            onAnimationComplete={handleAnimationComplete.email}
          >
            <TextFieldOutlined
              label="Email"
              value={email}
              onChange={changeHandler.email}
              display={errorShow.email && "error"}
              message={
                errorShow.email && (
                  <Typography sx={{ color: dangerMain }} variant="caption">
                    {emailError}
                  </Typography>
                )
              }
              onBlur={blurHandler.email}
              iconRight={
                errorShow.email && (
                  <Icon
                    icon="ep:warning-filled"
                    color={dangerMain}
                    width="32"
                  />
                )
              }
              iconLeft={<Icon icon="ic:round-person" width="32" />}
              sx={{ mb: 2 }}
            />
          </ErrorBlinkingAnimation>
          <ErrorBlinkingAnimation
            showAnimation={errorAnimation.password}
            onAnimationComplete={handleAnimationComplete.password}
          >
            <TextFieldOutlined
              label="Password"
              iconLeft={<Icon icon="material-symbols:lock" width="32" />}
              value={password}
              onChange={changeHandler.password}
              display={errorShow.password && "error"}
              message={
                errorShow.password && (
                  <Typography sx={{ color: dangerMain }} variant="caption">
                    {passwordError}
                  </Typography>
                )
              }
              onBlur={blurHandler.password}
              sx={{ mb: 2 }}
              type={passwordVisible ? "text" : "password"}
              iconRight={
                <>
                  {!passwordVisible ? (
                    <Icon
                      onClick={visibilityHandler.password.setVisible}
                      style={{ cursor: "pointer" }}
                      icon="mdi:eye"
                      width="32"
                    />
                  ) : (
                    <Icon
                      onClick={visibilityHandler.password.setHidden}
                      style={{ cursor: "pointer" }}
                      icon="mdi:hide"
                      width="32"
                    />
                  )}
                  {passwordError && errorShow.password && (
                    <Icon
                      icon="ep:warning-filled"
                      color={dangerMain}
                      width="32"
                    />
                  )}
                </>
              }
            />
          </ErrorBlinkingAnimation>
          <ErrorBlinkingAnimation
            showAnimation={errorAnimation.confirmPassword}
            onAnimationComplete={handleAnimationComplete.confirmPassword}
          >
            <TextFieldOutlined
              label="Confirm Password"
              value={confirmPassword}
              onChange={changeHandler.confirmPassword}
              onBlur={blurHandler.confirmPassword}
              display={errorShow.confirmPassword && "error"}
              message={
                errorShow.confirmPassword && (
                  <Typography sx={{ color: dangerMain }} variant="caption">
                    {confirmPasswordError}
                  </Typography>
                )
              }
              type={confirmPasswordVisible ? "text" : "password"}
              iconRight={
                <>
                  {!confirmPasswordVisible ? (
                    <Icon
                      onClick={visibilityHandler.confirmPassword.setVisible}
                      style={{ cursor: "pointer" }}
                      icon="mdi:eye"
                      width="32"
                    />
                  ) : (
                    <Icon
                      onClick={visibilityHandler.confirmPassword.setHidden}
                      style={{ cursor: "pointer" }}
                      icon="mdi:hide"
                      width="32"
                    />
                  )}
                  {confirmPasswordError && errorShow.confirmPassword && (
                    <Icon
                      icon="ep:warning-filled"
                      color={dangerMain}
                      width="32"
                    />
                  )}
                </>
              }
              iconLeft={<Icon icon="material-symbols:lock" width="32" />}
              sx={{ mb: 2 }}
            />
          </ErrorBlinkingAnimation>
          <Box sx={{ ...ContentMiddle }}>
            <Button type="submit" variant="primary" size="large">
              SIGN IN
            </Button>
            <Typography variant="subtitle1" sx={{ fontWeight: "500", mt: 2 }}>
              Already Have An Account?
              <Typography
                component="a"
                href="/login"
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
