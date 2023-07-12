import React, { useState, useEffect, useRef } from "react";
import { Grid, Box, Typography, useTheme, Button } from "@mui/material";
import { ContentMiddle } from "../../../styles/shared-styles";
import { CustomDatePicker, CustomTextField } from "../custom-UI";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ErrorVibrateAnimation } from "../../animation/custom-animation";
import api from "../../../axios-instance";
import axios from "axios";

import { Icon } from "@iconify/react";

const RegisterForm = () => {
  // console.log('rerendeers')
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const theme = useTheme();
  // call the colors
  const lightColor = theme.palette.light.main;
  const dangerMain = theme.palette.danger.main;

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);

  const [date, setDate] = useState(dayjs("2011-09-28").utc());
  const [dateError, setDateError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  let passwordRef = useRef();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  let passConfirmRef = useRef()

  //TO START ERROR ANIMATION
  const [errorAnimation, setErrorAnimation] = useState({
    username: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [focused, setFocused] = useState({
    username: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
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

  const handleFocus = (field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: true,
    }));
  };
  const handleBlur = (field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const focusHandler = {
    username: () => {
      handleFocus("username");
    },
    phone: () => {
      handleFocus("phone");
    },
    email: () => {
      handleFocus("email");
    },
    password: () => {
      handleFocus("password");
    },
    confirmPassword: () => {
      handleFocus("confirmPassword");
    },
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
        passwordRef.current.focus();
        setPasswordVisible(true);
      },
      setHidden: () => {
        passwordRef.current.focus();
        setPasswordVisible(false);
      },
    },
    confirmPassword: {
      setVisible: () => {
        passConfirmRef.current.focus()
        setConfirmPasswordVisible(true);
      },
      setHidden: () => {
        passConfirmRef.current.focus()
        setConfirmPasswordVisible(false);
      },
    },
  };

  const blurHandler = {
    // Show empty error on blur
    username: async () => {
      handleBlur("username");
      if (usernameError) {
        showError("username");
      }
    },
    phone: () => {
      handleBlur("phone");
      if (errorShow.phone) {
        startAnimation("phone");
      }
    },
    email: async () => {
      handleBlur("email");
      if (emailError) {
        showError("email");
      }
    },
    password: () => {
      handleBlur("password");
      if (passwordError) {
        showError("password");
      }
    },
    confirmPassword: () => {
      handleBlur("confirmPassword");
      if (confirmPasswordError) {
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
    const abortController = new AbortController();
    const timeout = setTimeout(async () => {
      if (username.trim().length === 0) {
        setInvalid("username");
        setUsernameError("Username cannot be empty");
        return;
      }
      const spaceRegex = /^[^ ]+$/;
      if (!spaceRegex.test(username)) {
        setInvalid("username");
        setUsernameError("Username must not contain space");
        showError("username");
        return;
      }

      if (username.trim().length < 8) {
        setInvalid("username");
        setUsernameError("Username must be 8 or more characters long");
        showError("username");
        return;
      }
      // check username realtime api currently error
      setCheckingUsername(true);
      try {
        const res = await api.post(
          "check-username",
          { username },
          {
            signal: abortController.signal,
          }
        );
        if (res.status === 200) {
          setCheckingUsername(false);
          setValid("username");
          setUsernameError("");
          hideError("username");
          return;
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        if (error.response.status === 401) {
          setCheckingUsername(false);
          setInvalid("username");
          setUsernameError("Username exists please use another username");
          showError("username");
          startAnimation("username");
          return;
        }
      }
    }, 400);
    return () => {
      abortController.abort();
      setCheckingUsername(false);
      clearTimeout(timeout);
    };
  }, [username]);

  useEffect(() => {
    if (checkingUsername) {
      hideError("username");
      setUsernameError("Checking username avaibility...");
      return;
    }
  }, [checkingUsername]);
  useEffect(() => {
    if (checkingEmail) {
      hideError("email");
      setEmailError("Checking email avaibility...");
      return;
    }
  }, [checkingEmail]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const parsed = dayjs(date);
        if (parsed.isValid()) {
          setValid("date");
          setDateError("");
        }
      } catch (error) {
        setInvalid("date");
        setDateError("Please provide a valid date");
      }
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [date]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!phone) {
        setValid("phone");
        setPhoneError("");
        hideError("phone");
        return;
      }

      if (phone.trim().length < 11 || phone.trim().length > 12) {
        setInvalid("phone");
        setPhoneError("Phone must be 11 or 12 characters or leave this empty");
        showError("phone");
        return;
      }

      setValid("phone");
      setPhoneError("");
      hideError("phone");
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [phone]);

  useEffect(() => {
    const abortController = new AbortController();
    const timeout = setTimeout(async () => {
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
        return;
      }
      setCheckingEmail(true);
      try {
        const res = await api.post(
          "check-email",
          { signal: abortController.signal },
          { email }
        );
        if (res.status === 200) {
          setCheckingEmail(false);
          setValid("email");
          setEmailError("");
          hideError("email");
          return;
        }
      } catch (error) {
        setCheckingEmail(false);
        if (error.response.status === 401) {
          setInvalid("email");
          setEmailError("Email exists please use another email");
          showError("email");
          startAnimation("email");
          return;
        }
      }
    }, 400);
    return () => {
      abortController.abort();
      clearTimeout(timeout);
    };
  }, [email]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (password.trim().length === 0) {
        if (confirmPassword) {
          setInvalid("confirmPassword");
          setConfirmPasswordError("Please correctly fill password first");
          showError("confirmPassword");
        }
        setInvalid("password");
        setPasswordError("Password cannot be empty");
        return;
      }
      const spaceRegex = /^[^ ]+$/;
      if (!spaceRegex.test(password)) {
        if (confirmPassword) {
          setInvalid("confirmPassword");
          setConfirmPasswordError("Please correctly fill password first");
          showError("confirmPassword");
        }
        setInvalid("password");
        setPasswordError("Password must not contain spaces");
        showError("password");
        return;
      }
      if (password.trim().length < 8) {
        if (confirmPassword) {
          setInvalid("confirmPassword");
          setConfirmPasswordError("Please correctly fill password first");
          showError("confirmPassword");
        }
        setInvalid("password");
        setPasswordError("Password must be 8 or more characters");
        showError("password");
        return;
      }
      const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;
      if (!passwordRegex.test(password)) {
        if (confirmPassword) {
          setInvalid("confirmPassword");
          setConfirmPasswordError("Please correctly fill password first");
          showError("confirmPassword");
        }
        setInvalid("password");
        setPasswordError(
          "Password must contain an uppercase character, a lowercase characters, and a number"
        );
        showError("password");
        return;
      }
      setValid("password");
      setPasswordError("");
      hideError("password");
      if (!confirmPassword) {
        return;
      }
      if (password !== confirmPassword) {
        setInvalid("confirmPassword");
        setConfirmPasswordError("Confirm password doesn't match");
        showError("confirmPassword");
        return;
      }
      setValid("confirmPassword");
      setConfirmPasswordError("");
      hideError("confirmPassword");
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [password, confirmPassword]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (confirmPassword.trim().length === 0) {
        setInvalid("confirmPassword");
        setConfirmPasswordError("Confirm Password cannot be empty");
        hideError("confirmPassword");
      }
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [confirmPassword]);

  const fetchRegisterAPI = async (registerData) => {
    try {
      // call login api
      const res = await api.post("register", registerData);
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
      // console.log(error);
      if (error.response.status === 401) {
        if (error.response.data.message.username) {
          setInvalid("username");
          setUsernameError("Username already taken");
          showError("username");
          startAnimation("username");
        }
        if (error.response.data.message.email) {
          setInvalid("email");
          setEmailError("Email already taken");
          showError("email");
          startAnimation("email");
        }
      }
    }
  };

  const fetchLoginApi = async (loginData) => {
    try {
      // call login api
      const res = await api.post("/login", loginData, {
        withCredentials: true,
      });
      //if login success redirect to landing page
      if (res.status === 200) {
        localStorage.setItem("loginCredentials", JSON.stringify(res.data.data));
        window.location.href = "/";
      }
    } catch (error) {
      // if unauthorized then show appropiate error in front
      alert("server error");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValid = Object.values(formValidity).every((valid) => valid);
    //IF ALL VALID
    if (isFormValid) {
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
        }}
      >
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{ width: "70%" }}
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

          <ErrorVibrateAnimation
            showAnimation={errorAnimation.username}
            onAnimationComplete={handleAnimationComplete.username}
          >
            <CustomTextField
              type="text"
              fullWidth
              color={errorShow.username && "error"}
              onChange={changeHandler.username}
              error={errorShow.username}
              label="Username"
              variant="outlined"
              onFocus={focusHandler.username}
              onBlur={blurHandler.username}
              value={username}
              helperText={
                (errorShow.username && usernameError) ||
                (checkingUsername && usernameError)
              }
              focused={focused.username}
              leftIcon={
                <Icon icon="ic:round-person" color="black" width="28" />
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
              sx={{ mb: 2 }}
            />
          </ErrorVibrateAnimation>
          <ErrorVibrateAnimation
            showAnimation={errorAnimation.date}
            onAnimationComplete={handleAnimationComplete.date}
          >
            <CustomDatePicker
              sx={{ mb: 2 }}
              label="Birth Date"
              labelDisplay={dateError && "error"}
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
          </ErrorVibrateAnimation>
          <ErrorVibrateAnimation
            showAnimation={errorAnimation.phone}
            onAnimationComplete={handleAnimationComplete.phone}
          >
            <CustomTextField
              fullWidth
              label="Phone (optional)"
              value={phone}
              onChange={changeHandler.phone}
              error={errorShow.phone}
              color={errorShow.phone && "error"}
              variant="outlined"
              focused={focused.phone}
              onFocus={focusHandler.phone}
              onBlur={blurHandler.phone}
              helperText={errorShow.phone && phoneError}
              leftIcon={
                <Icon icon="solar:phone-bold" color="black" width="28" />
              }
              rightIcon={
                errorShow.phone && (
                  <Icon
                    icon="ep:warning-filled"
                    color={dangerMain}
                    width="27"
                  />
                )
              }
              sx={{ mb: 2 }}
            />
          </ErrorVibrateAnimation>
          <ErrorVibrateAnimation
            showAnimation={errorAnimation.email}
            onAnimationComplete={handleAnimationComplete.email}
          >
            <CustomTextField
              fullWidth
              label="Email"
              value={email}
              onChange={changeHandler.email}
              error={errorShow.email}
              color={errorShow.email && "error"}
              variant="outlined"
              focused={focused.email}
              onFocus={focusHandler.email}
              onBlur={blurHandler.email}
              helperText={
                (errorShow.email && emailError) || (checkingEmail && emailError)
              }
              leftIcon={<Icon icon="ic:round-email" color="black" width="28" />}
              rightIcon={
                errorShow.email && (
                  <Icon
                    icon="ep:warning-filled"
                    color={dangerMain}
                    width="27"
                  />
                )
              }
              sx={{ mb: 2 }}
            />
          </ErrorVibrateAnimation>
          <ErrorVibrateAnimation
            showAnimation={errorAnimation.password}
            onAnimationComplete={handleAnimationComplete.password}
          >
            <CustomTextField
              type={passwordVisible ? "text" : "password"}
              fullWidth
              inputRef={passwordRef}
              label="Password"
              value={password}
              onChange={changeHandler.password}
              error={errorShow.password}
              color={errorShow.password && "error"}
              variant="outlined"
              focused={focused.password}
              onFocus={focusHandler.password}
              onBlur={blurHandler.password}
              helperText={errorShow.password && passwordError}
              leftIcon={
                <Icon icon="material-symbols:lock" color="black" width="28" />
              }
              rightIcon={
                <>
                  {passwordVisible ? (
                    <Icon
                      onClick={visibilityHandler.password.setHidden}
                      style={{ cursor: "pointer" }}
                      icon="mdi:eye"
                      color="black"
                      width="28"
                    />
                  ) : (
                    <Icon
                      onClick={visibilityHandler.password.setVisible}
                      style={{ cursor: "pointer" }}
                      icon="mdi:hide"
                      color="black"
                      width="28"
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
              sx={{ mb: 2 }}
            />
          </ErrorVibrateAnimation>
          <ErrorVibrateAnimation
            showAnimation={errorAnimation.confirmPassword}
            onAnimationComplete={handleAnimationComplete.confirmPassword}
          >
            <CustomTextField
              type={confirmPasswordVisible ? "text" : "password"}
              fullWidth
              inputRef = {passConfirmRef}
              label="Confirm Password"
              value={confirmPassword}
              onChange={changeHandler.confirmPassword}
              error={errorShow.confirmPassword}
              color={errorShow.confirmPassword && "error"}
              variant="outlined"
              focused={focused.confirmPassword}
              onFocus={focusHandler.confirmPassword}
              onBlur={blurHandler.confirmPassword}
              helperText={errorShow.confirmPassword && confirmPasswordError}
              leftIcon={
                <Icon icon="material-symbols:lock" color="black" width="28" />
              }
              rightIcon={
                <>
                  {confirmPasswordVisible ? (
                    <Icon
                      onClick={visibilityHandler.confirmPassword.setHidden}
                      style={{ cursor: "pointer" }}
                      icon="mdi:eye"
                      color="black"
                      width="28"
                    />
                  ) : (
                    <Icon
                      onClick={visibilityHandler.confirmPassword.setVisible}
                      style={{ cursor: "pointer" }}
                      icon="mdi:hide"
                      color="black"
                      width="28"
                    />
                  )}
                  {errorShow.confirmPassword && (
                    <Icon
                      icon="ep:warning-filled"
                      color={dangerMain}
                      width="27"
                    />
                  )}
                </>
              }
              sx={{ mb: 2 }}
            />
          </ErrorVibrateAnimation>
          <Box sx={{ ...ContentMiddle }}>
            <Button type="submit" variant="primary" size="large">
              Sign Up
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
              sx={{ color: "#1273EB", fontWeight: "500", pl: 1, pr: 1 }}
            >
              Terms of Use
            </Typography>
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

export default React.memo(RegisterForm);
