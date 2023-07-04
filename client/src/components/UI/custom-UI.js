import { React, useState } from "react";
import { Box, useTheme, TextField, InputAdornment } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const CustomTextField = (props) => {
  //call theme component
  const theme = useTheme();
  // call the colors
  const lightColor = theme.palette.light.main;
  const dangerMain = theme.palette.danger.main;
  const primaryMain = theme.palette.primary.main;
  const errorColor = theme.palette.error.main;
  return (
    <TextField
      type={props.type}
      fullWidth={props.fullWidth}
      sx={props.sx}
      color={props.color}
      onChange={props.onChange}
      error={props.error}
      label={props.label}
      variant={props.variant}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      value={props.value}
      helperText={props.helperText}
      InputLabelProps={
        props.leftIcon&&
        !props.focused &&
        !props.value && {
          shrink: false,
          style: { marginLeft: 35 },
        }
      }
      InputProps={{
        startAdornment: props.leftIcon && (
          <InputAdornment position="start">{props.leftIcon}</InputAdornment>
        ),
        endAdornment: props.rightIcon && (
          <InputAdornment position="start">{props.rightIcon}</InputAdornment>
        ),
      }}
    />
  );
};

export const CustomDatePicker = (props) => {
  return (
    <Box sx={{ ...props.sx }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{
            width: "100%",
          }}
          label={props.label}
          value={props.value}
          onChange={props.onChange}
        />
        {props.message && (
          //if input is not valid and textfield was focused before, show the error message
          <Box component="span">{props.message}</Box>
        )}
      </LocalizationProvider>
    </Box>
  );
};
