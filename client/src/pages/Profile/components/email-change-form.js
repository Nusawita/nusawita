import React, { useEffect, useState } from "react";
import { CustomTextField } from "../../../components/UI/custom-UI";
import { Icon } from "@iconify/react";

const EmailChangeForm = (props) => {
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const oldEmail = props.oldEmail;
  //New Email Verifications
  useEffect(() => {
    if (newEmail === oldEmail) {
      setError("This is your old email, please enter a new email");
      return;
    }
    setError("")
  }, [newEmail, oldEmail]);
  return (
    <CustomTextField
      fullWidth
      sx={{ mt: 1, mb: 3 }}
      label="New Email"
      value={newEmail}
      onChange={(event) => {
        setNewEmail(event.target.value);
      }}
      leftIcon={<Icon icon="ic:round-email" color="black" width="26" />}
      variant="outlined"
    />
  );
};

export default EmailChangeForm;
