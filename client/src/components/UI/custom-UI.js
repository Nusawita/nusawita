import { React, useState } from "react";
import { Box, TextField, Typography, useTheme } from "@mui/material";

export const TextFieldFilled = (props) => {
  const theme = useTheme();
  const errorColor = theme.palette.error.dark;
  const successColor = theme.palette.primary.main;

  const [isFocused, setIsFocused] = useState(false);
  const [wasFocused, setWasFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
    setWasFocused(true);
  };

  ////ALL PROPS EXPLANATION
  //iconLeft = icon component from iconify to show at the start of the field
  //iconRight = icon component from iconify to show at the end of the field
  //iconError = icon component that appears on the end of the field when an error happens (invalid inputs)
  //type = type of the field, eg: "password", "text", etc
  //onChange = function that handles when the inputted value inside the field changed
  //value = value of the field
  //label = label of the text_field
  //showError = state to decide whether to shoe errorMsg or not
  //errorMsg = the error message when error happens

  return (
    <Box sx={{ ...props.sx }}>
      <Box
        borderBottom={2}
        onFocus={handleFocus} // this props receive a function that runs when the form is being focused
        sx={{
          px: 1,
          display: "flex",
          alignItems: "center",
          backgroundColor: `${
            props.showError && wasFocused ? "#FFEDEA" : "#E9F2F4" //if already interacted and input is not valid background
          }`,
          height: "56px",
          borderColor: `${isFocused && successColor}`, //border change to green on textfield focus
          "&:hover": {
            backgroundColor: `${
              props.showError && wasFocused ? "#FFEDEA" : "#DBE4E6" //if already interacted and input is error hover is red
            }`,
          },
        }}
      >
        {props.iconLeft}
        <TextField
          type={props.type} //type of the input
          onBlur={handleBlur} //function to run when the field is no longer focused
          onChange={props.onChange} //function to run when the value inside the field changed
          value={props.value} //the field value
          label={
            <Typography
              variant={isFocused || props.value ? "caption" : "body1"}
            >
              {props.label}
            </Typography>
          } 
          variant="standard"
          InputLabelProps={{
            style: {
              //label move to top on focused and when input value is present
              transform: `${
                isFocused || props.value
                  ? "translateY(-20%)"
                  : "translateY(60%)"
              }`, 
            },
          }}
          sx={{
            width: "100%",
            ml: 1,
          }}
        />
        {/* If input is not valid and textfield was focused before, show the error icon, otherwise show the right icon  */}
        {props.showError && wasFocused ? props.iconError : props.iconRight}
      </Box>
      {props.showError && wasFocused && (
        //if input is not valid and textfield was focused before, show the error message
        <Typography variant="caption" sx={{ color: errorColor }}>
          {props.errorMsg}
        </Typography>
      )}
    </Box>
  );
};
