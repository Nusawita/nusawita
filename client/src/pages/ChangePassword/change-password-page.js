import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  putNewPassword,
  verifyChangePasswordToken,
} from "./utils/api-calls-change-password";
import { CustomTextField } from "../../components/UI/custom-UI";
import { Icon } from "@iconify/react";
import { StatusFeedbacks } from "./component/status-feedbacks";
import { validatePassword } from "./utils/change-password-validation";
import { ErrorVibrateAnimation } from "../../components/animation/custom-animation";
import { useTheme } from "@emotion/react";
const ChangePasswordPage = () => {
  const theme = useTheme();
  const colorPalette = theme.palette;
  const [tokenStatus, setTokenStatus] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [errorAnimationRun, setErrorAnimationRun] = useState({
    password: false,
    confirmPassword: false,
  });
  const handleErrorAnimation = (field, value) => {
    setErrorAnimationRun((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (passwordChanged) {
      const timeOutId = setTimeout(() => {
        window.location.href = "profile";
      }, 5000);
      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [passwordChanged]);
  const [formData, setFormData] = useState({
    password: {
      value: "",
      visible: false,
      error: "",
    },
    confirmPassword: {
      value: "",
      visible: false,
      error: "",
    },
  });
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const token = queryParams.get("token");
  const encryptedEmail = queryParams.get("email");

  const changeValue = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], value: value },
    }));
  };
  const setVisible = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], visible: value },
    }));
  };
  const changeError = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], error: value },
    }));
  };

  const validateToken = async (token) => {
    try {
      const res = await verifyChangePasswordToken(token);
      if (res.status === 200) {
        setTokenStatus("valid");
      }
    } catch (error) {
      if (error.response.status === 404) {
        setTokenStatus("invalid");
      }
    }
  };
  useEffect(() => {
    setTokenStatus("loading");
    validateToken(token);
  }, [token]);

  const submitNewPassword = async (event) => {
    event.preventDefault();
    const errors = {
      password: formData.password.error,
      confirmPassword: formData.confirmPassword.error,
    };
    const fieldError = Object.keys(errors).filter(
      (field) => errors[field] !== ""
    );
    if (fieldError.length > 0) {
      fieldError.forEach((field) => {
        handleErrorAnimation(field, true);
        console.log(errorAnimationRun);
      });
      return;
    }

    try {
      const res = await putNewPassword(encryptedEmail, formData.password.value);
      if (res.status === 200) {
        setPasswordChanged(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        changeError("password", error.response.data.message);
        handleErrorAnimation("password", true);
      }
    }
  };

  //Form validation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const error = validatePassword(formData.password.value);
      changeError("password", error);
      if (error) {
        if (formData.confirmPassword.value.length > 0) {
          changeError(
            "confirmPassword",
            "Please correctly fill password first"
          );
        }
        return;
      }
      if (formData.confirmPassword.value !== formData.password.value) {
        changeError("confirmPassword", "Confirm password does not match");
        return;
      }
      changeError("confirmPassword", "");
    }, 600);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [formData.password.value, formData.confirmPassword.value]);

  return (
    <>
      <StatusFeedbacks
        tokenStatus={tokenStatus}
        passwordChanged={passwordChanged}
      />
      {tokenStatus === "valid" && !passwordChanged && (
        <Box sx={{ my: 6, display: "flex", justifyContent: "center" }}>
          <Paper
            elevation={2}
            sx={{
              width: "35%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "155px",
                height: "120px",
                backgroundImage: "url(/logos/nusawita_logo_circle.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                mt: 10,
              }}
            />
            <Typography textAlign="center" variant="h4" component="h4">
              Edit Password
            </Typography>
            <Box
              component="form"
              onSubmit={submitNewPassword}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: 3,
                width: "70%",
              }}
            >
              <ErrorVibrateAnimation
                showAnimation={errorAnimationRun.password}
                onAnimationComplete={() => {
                  handleErrorAnimation("password", false);
                }}
              >
                <CustomTextField
                  fullWidth
                  value={formData.password.value}
                  onChange={(event) => {
                    changeValue("password", event.target.value);
                  }}
                  type={formData.password.visible ? "text" : "password"}
                  sx={{ my: 1 }}
                  variant="outlined"
                  label="New Password"
                  color={
                    formData.password.error &&
                    formData.password.error !== "empty" &&
                    "error"
                  }
                  error={
                    formData.password.error &&
                    formData.password.error !== "empty"
                      ? true
                      : false
                  }
                  helperText={
                    formData.password.error &&
                    formData.password.error !== "empty"
                      ? formData.password.error
                      : ""
                  }
                  leftIcon={
                    <Icon
                      icon="material-symbols:lock"
                      color="black"
                      width="28"
                    />
                  }
                  rightIcon={
                    <>
                      {formData.password.visible ? (
                        <Icon
                          onClick={() => {
                            setVisible("password", false);
                          }}
                          style={{ cursor: "pointer" }}
                          icon="mdi:eye"
                          color="black"
                          width="28"
                        />
                      ) : (
                        <Icon
                          onClick={() => {
                            setVisible("password", true);
                          }}
                          style={{ cursor: "pointer" }}
                          icon="mdi:hide"
                          color="black"
                          width="28"
                        />
                      )}
                      {formData.password.error !== "empty" &&
                        formData.password.error && (
                          <Icon
                            icon="ep:warning-filled"
                            color={colorPalette.danger.main}
                            width="27"
                          />
                        )}
                    </>
                  }
                />
              </ErrorVibrateAnimation>

              <ErrorVibrateAnimation
                showAnimation={errorAnimationRun.confirmPassword}
                onAnimationComplete={() => {
                  handleErrorAnimation("confirmPassword", false);
                }}
              >
                <CustomTextField
                  fullWidth
                  type={formData.confirmPassword.visible ? "text" : "password"}
                  sx={{ my: 1 }}
                  value={formData.confirmPassword.value}
                  onChange={(event) => {
                    changeValue("confirmPassword", event.target.value);
                  }}
                  variant="outlined"
                  label="Confirm Password"
                  color={
                    formData.confirmPassword.error &&
                    formData.confirmPassword.error !== "empty" &&
                    "error"
                  }
                  error={
                    formData.confirmPassword.error &&
                    formData.confirmPassword.error !== "empty"
                      ? true
                      : false
                  }
                  helperText={
                    formData.confirmPassword.error &&
                    formData.confirmPassword.error !== "empty"
                      ? formData.confirmPassword.error
                      : ""
                  }
                  leftIcon={
                    <Icon
                      icon="material-symbols:lock"
                      color="black"
                      width="28"
                    />
                  }
                  rightIcon={
                    <>
                      {formData.confirmPassword.visible ? (
                        <Icon
                          onClick={() => {
                            setVisible("confirmPassword", false);
                          }}
                          style={{ cursor: "pointer" }}
                          icon="mdi:eye"
                          color="black"
                          width="28"
                        />
                      ) : (
                        <Icon
                          onClick={() => {
                            setVisible("confirmPassword", true);
                          }}
                          style={{ cursor: "pointer" }}
                          icon="mdi:hide"
                          color="black"
                          width="28"
                        />
                      )}
                      {formData.confirmPassword.error !== "empty" &&
                        formData.confirmPassword.error && (
                          <Icon
                            icon="ep:warning-filled"
                            color={colorPalette.danger.main}
                            width="27"
                          />
                        )}
                    </>
                  }
                />
              </ErrorVibrateAnimation>
              <Button
                type="submit"
                sx={{ mt: 3, mb: 15 }}
                size="large"
                variant="primary"
              >
                Change Password
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default ChangePasswordPage;
