import React, { useState, useEffect, useRef } from "react";
import { Grid, Box, Typography, useTheme, Button } from "@mui/material";
import { ContentMiddle } from "../../../styles/shared-styles";
import { CustomDatePicker, CustomTextField, VerifyDialog } from "../custom-UI";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ErrorVibrateAnimation } from "../../animation/custom-animation";
import api from "../../../axios-instance";
import axios from "axios";
import Lottie from "lottie-react";
import checkAnimation from "../../lotties/CheckAnimation.json";

import { Icon } from "@iconify/react";

const RegisterForm = () => {
  // console.log('rerendeers')
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const theme = useTheme();
  // const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  // call the colors
  const lightColor = theme.palette.light.main;
  const dangerMain = theme.palette.danger.main;

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const checkingUsernameRef = useRef(checkingUsername);
  checkingUsernameRef.current = checkingUsername;

  const [date, setDate] = useState(dayjs("2011-09-28").utc());
  const [dateError, setDateError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);
  const checkingEmailRef = useRef(checkingEmail);
  checkingEmailRef.current = checkingEmail;

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  let passwordRef = useRef();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  let passConfirmRef = useRef();

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //TO START ERROR ANIMATION
  const [errorAnimation, setErrorAnimation] = useState({
    username: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  //Focus field state
  const [focused, setFocused] = useState({
    username: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  //FormValidity States
  const [formValidity, setFormValidity] = useState({
    username: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const formValidityRef = useRef(formValidity);
  formValidityRef.current = formValidity;

  //Show/Hide error states
  const [errorShow, setErrorShow] = useState({
    username: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  //Start the error animation
  const startAnimation = (field) => {
    setErrorAnimation((prev) => ({
      ...prev,
      [field]: true,
    }));
  };
  //End the error animation
  const endAnimation = (field) => {
    setErrorAnimation((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  //Set the form field to valid
  const setValid = (field) => {
    setFormValidity((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  //Set the form field to invalid
  const setInvalid = (field) => {
    setFormValidity((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  //Show Error message
  const showError = (field) => {
    setErrorShow((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  //Hide error message
  const hideError = (field) => {
    setErrorShow((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  //set Focus on field to true
  const handleFocus = (field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  //Set focus on field to false
  const handleBlur = (field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  //Functions to pass on onFocus
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

  //Functions to pass on onChange
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

  //SetPasswordVisible/ not visible
  const visibilityHandler = {
    password: {
      setVisible: () => {
        //Focus on the field after click eye icon
        passwordRef.current.focus();
        setPasswordVisible(true);
      },
      setHidden: () => {
        //Focus on the field after click eye icon
        passwordRef.current.focus();
        setPasswordVisible(false);
      },
    },
    confirmPassword: {
      setVisible: () => {
        //Focus on the field after click eye icon
        passConfirmRef.current.focus();
        setConfirmPasswordVisible(true);
      },
      setHidden: () => {
        //Focus on the field after click eye icon
        passConfirmRef.current.focus();
        setConfirmPasswordVisible(false);
      },
    },
  };

  //Function to pass on onBlur
  const blurHandler = {
    // Show error on blur
    username: async () => {
      handleBlur("username");
      if (checkingUsername) {
        return;
      }
      if (usernameError) {
        showError("username");
        // startAnimation('username')
      }
    },
    phone: () => {
      handleBlur("phone");
      if (errorShow.phone) {
        // startAnimation("phone");
      }
    },
    email: async () => {
      handleBlur("email");
      if (checkingEmail) {
        return;
      }
      if (emailError) {
        showError("email");
        // startAnimation('email')
      }
    },
    password: () => {
      handleBlur("password");
      if (passwordError) {
        showError("password");
        // startAnimation('password')
      }
    },
    confirmPassword: () => {
      handleBlur("confirmPassword");
      if (confirmPasswordError) {
        showError("confirmPassword");
        // startAnimation('confirmPassword')
      }
    },
  };

  //End animation functions
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
    if (submitted) {
      return;
    }
    const abortController = new AbortController();
    hideError("username");
    setInvalid("username");
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
        setUsernameError("Username must be between 8-16 characters long");
        showError("username");
        return;
      }
      if (username.trim().length > 16) {
        setInvalid("username");
        setUsernameError("Username must be between 8-16 characters long");
        showError("username");
        return;
      }
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
        setCheckingUsername(false);
        if (axios.isCancel(error)) {
          return;
        }
        if (error.response.status === 401) {
          setInvalid("username");
          setUsernameError("Username exists please use another username");
          showError("username");
          startAnimation("username");
          return;
        }
      }
    }, 600);
    return () => {
      abortController.abort();
      setCheckingUsername(false);
      clearTimeout(timeout);
    };
  }, [username, submitted]);

  useEffect(() => {
    if (submitted) {
      return;
    }
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
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [date, submitted]);

  useEffect(() => {
    if (submitted) {
      return;
    }
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
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [phone, submitted]);

  useEffect(() => {
    if (submitted) {
      return;
    }
    hideError("email");
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
          { email },
          { signal: abortController.signal }
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
        if (axios.isCancel(error)) {
          return;
        }
        if (error.response.status === 401) {
          setInvalid("email");
          setEmailError("Email exists please use another email");
          showError("email");
          startAnimation("email");
          return;
        }
      }
    }, 600);
    return () => {
      abortController.abort();
      clearTimeout(timeout);
    };
  }, [email, submitted]);

  useEffect(() => {
    if (submitted) {
      return;
    }
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
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [password, confirmPassword, submitted]);

  useEffect(() => {
    if (submitted) {
      return;
    }
    const timeout = setTimeout(() => {
      if (confirmPassword.trim().length === 0) {
        setInvalid("confirmPassword");
        setConfirmPasswordError("Confirm Password cannot be empty");
        hideError("confirmPassword");
      }
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [confirmPassword, submitted]);

  const fetchEmailVerificationSendApi = async (email) => {
    try {
      const res = await api.put("email-verification", { email });
      if (res.status === 200) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRegisterAPI = async (registerData) => {
    try {
      // call login api
      const res = await api.post("register", registerData);
      //if login success redirect to landing page
      if (res.status === 201) {
        fetchEmailVerificationSendApi(registerData.email);
        setSubmitted(true);
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
  //log user in
  const logUserIn = () => {
    const loginData = {
      username: username,
      password: password,
    };
    fetchLoginApi(loginData);
  };
  //Handle register submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let isFormValid = Object.values(formValidity).every((valid) => valid);
    //Check the value of form validity so that if all is valid no sleep is done
    if (!isFormValid) {
      //Sleep to wait if validation is still happening
      await sleep(600);
      // If checking username duplicate in database happening, sleep to wait for this to finish
      if (checkingUsernameRef.current || checkingEmailRef.current) {
        await sleep(1000);
      }
      // get the ref to get the value after all the checks complete
      isFormValid = Object.values(formValidityRef.current).every(
        (valid) => valid
      );
    }

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
      setSubmitting(false);
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
    setSubmitting(false);
  };
  return (
    <>
      <Grid
        container
        sx={{
          height: "100%",
          boxShadow: "0px 10px 15px 3px rgba(226, 226, 226, 0.25)",
        }}
      >
        <VerifyDialog
          open={submitted}
          content={
            <Box sx={{ maxWidth: "30rem" }}>
              <Box sx={{ ...ContentMiddle }}>
                <Lottie
                  loop={0}
                  animationData={checkAnimation}
                  style={{
                    width: "60%",
                    height: "60%",
                  }}
                />
              </Box>
              <Box>
                <Typography
                  textAlign="center"
                  variant="h6"
                  component="h6"
                  fontWeight="500"
                >
                  Email verification had been sent to email {email}. Please
                  check your email. if you dont receive email, please check your
                  spam folder.
                </Typography>
              </Box>
            </Box>
          }
        />
        <Grid
          item
          xs={8}
          sx={{
            backgroundImage: "url(/images/gapura.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" },
          }}
        />
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            ...ContentMiddle,
            backgroundColor: lightColor,
          }}
        >
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{ width: { xs: "90%", md: "70%" } }}
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
                color={errorShow.username && !checkingUsername && "error"}
                onChange={changeHandler.username}
                error={errorShow.username && !checkingUsername}
                label="Username"
                variant="outlined"
                onFocus={focusHandler.username}
                onBlur={blurHandler.username}
                value={username}
                helperText={
                  (checkingUsername && "Checking Username Validity...") ||
                  (errorShow.username && usernameError)
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
                error={errorShow.email && !checkingEmail}
                color={errorShow.email && !checkingEmail && "error"}
                variant="outlined"
                focused={focused.email}
                onFocus={focusHandler.email}
                onBlur={blurHandler.email}
                helperText={
                  (checkingEmail && "Checking Email Validity...") ||
                  (errorShow.email && emailError)
                }
                leftIcon={
                  <Icon icon="ic:round-email" color="black" width="28" />
                }
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
                inputRef={passConfirmRef}
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
              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={submitting || submitted ? true : false}
              >
                {submitting
                  ? "Registering..."
                  : submitted
                  ? "Registered"
                  : "Sign Up"}
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
            <Typography
              sx={{ mt: 3, color: "#6F797A" }}
              textAlign="center"
              variant="body1"
              component="p"
            >
              By continuing, you agree to NusaWita Company's{" "}
              <Typography
                component="a"
                href="/"
                sx={{ color: "#1273EB", fontWeight: "500", pr: 1 }}
              >
                Terms of Use
              </Typography>
              and
              <Typography
                component="a"
                href="/"
                sx={{ color: "#1273EB", fontWeight: "500", pl: 1 }}
              >
                Privacy Policy
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(RegisterForm);
