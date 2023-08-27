import { Icon } from "@iconify/react";
import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ProfileContext from "./context/profile-context";

const AccountDataAlerts = (props) => {
  const profileCtx = useContext(ProfileContext)
  const closeCountdown = props.closeCountdown;
  const editProfileActions = profileCtx.editProfileActions
  const alertType = props.alertType;

  const [countdown, setCountdown] = useState(closeCountdown);

  useEffect(() => {
    if (alertType === "success") {
      //Count down the countdown variable
      const intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      //Close success message when 10 seconds have passed
      const timeoutId = setTimeout(() => {
        editProfileActions.endEditProfile()
      }, 10000);
      //Clean up timeout and interval
      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
    }
  }, [editProfileActions, alertType]);

  if (alertType === "success") {
    return (
      <Alert
        severity="success"
        action={
          <Button
            sx={{ width: "auto", my: 3 }}
            onClick={editProfileActions.endEditProfile}
          >
            <Icon icon="carbon:close-outline" width={32} />
          </Button>
        }
      >
        <AlertTitle>Update Complete</AlertTitle>
        Congratulations, you have successfully updated your profile data
        <Typography component="p" variant="caption" sx={{ mt: 1 }}>
          Auto closing in {countdown} seconds
        </Typography>
      </Alert>
    );
  }
};

export default AccountDataAlerts;
