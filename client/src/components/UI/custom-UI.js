import { React, Children, useState } from "react";
import {
  Box,
  useTheme,
  TextField,
  InputAdornment,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ContentMiddle } from "../../styles/shared-styles";
import { Icon } from "@iconify/react";
import { wrap } from "framer-motion";

export const CustomTextField = (props) => {
  return (
    <TextField
      autoFocus={props.autoFocus}
      inputRef={props.inputRef}
      type={props.type}
      fullWidth={props.fullWidth}
      sx={props.sx}
      color={props.color ? props.color : ""}
      onChange={props.onChange}
      error={props.error}
      label={props.label}
      variant={props.variant}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      value={props.value}
      helperText={props.helperText}
      InputLabelProps={
        props.leftIcon && !props.focused && !props.value
          ? {
              shrink: false,
              style: { marginLeft: 35 },
            }
          : {}
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

export const LabelSelector = (props) => {
  const theme = useTheme();
  const colorPalette = theme.palette;
  return (
    <Box
      tabIndex="0"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        width: "14rem",
        cursor: "pointer",
        ":hover": {
          borderBottom: `2px solid ${colorPalette.primary.main}`,
        },
        ":focus": {
          borderBottom: `2px solid ${colorPalette.primary.main}`,
          alignItems: "flex-start",
          alignItems: "flex-start",
          pt: 2,
        },
      }}
    >
      <Typography
        sx={{ textAlign: "center" }}
        variant="tableHeader"
        component="p"
      >
        {props.text}
      </Typography>
    </Box>
  );
};

export const CustomCard = (props) => {
  // To select random
  const theme = useTheme();
  const colorPalette = theme.palette;
  const tags = props.tags;
  return (
    <Card
      elevation={2}
      sx={{
        ...props.sx,
        maxWidth: "280px",
        cursor: "pointer",
        ":hover": { transform: "scale(1.05)" },
      }}
    >
      <CardContent>
        <Box component="span" sx={{ ...ContentMiddle }}>
          <Box
            sx={{
              width: "100%",
              minWidth: "256px",
              minHeight: "200px",
              backgroundImage: "url(/images/cardimage.jpg)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </Box>
        {/* First Section */}
        <Box
          component="div"
          sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
        >
          {/* Title  */}
          <Typography variant="subtitle1" component="p">
            {props.title}
          </Typography>
          {/* Stars and Rating */}
          <Box
            component="span"
            sx={{ display: "flex", alignItems: "flex-start" }}
          >
            <Icon icon="ant-design:star-filled" width="25" color="#F6B001" />
            <Typography variant="subtitle1" component="p">
              {props.rating}
            </Typography>
          </Box>
        </Box>
        {/* Second Section */}
        <Box component="div" maxWidth="19rem">
          <Typography
            component="p"
            variant="caption"
            textAlign="justify"
            color="#6F797A"
          >
            {props.description}
          </Typography>
        </Box>
        {/* Last Section */}
        <Box
          component="div"
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {tags &&
            tags.map((element) => {
              const tagColor = [
                colorPalette.primary.main,
                colorPalette.info.light,
                colorPalette.danger.light,
              ];
              function randomNoRepeats(array) {
                var copy = array.slice(0);
                return function () {
                  if (copy.length < 1) {
                    copy = array.slice(0);
                  }
                  var index = Math.floor(Math.random() * copy.length);
                  var item = copy[index];
                  copy.splice(index, 1);
                  return item;
                };
              }
              return (
                <Typography
                  key={tags.indexOf(element)}
                  color="white"
                  sx={{
                    my: 0.5,
                    mr: 0.4,
                    backgroundColor: randomNoRepeats(tagColor),
                    px: 1.2,
                    py: 0.5,
                    borderRadius: "100px",
                  }}
                  variant="caption"
                  component="p"
                >
                  {element}
                </Typography>
              );
            })}
        </Box>
      </CardContent>
    </Card>
  );
};

export const CustomCardSm = (props) => {
  return (
    <Card
      tabIndex="0"
      elevation={2}
      sx={{
        ...props.sx,
        maxWidth: "280px",
        cursor: "pointer",
        ":hover": { transform: "scale(1.05)" },
        ":focus": { transform: "scale(1.05)" },

      }}
    >
      <CardContent>
        <Box component="span" sx={{ ...ContentMiddle }}>
          <Box
            component="div"
            sx={{
              width: "100%",
              minWidth: "256px",
              minHeight: "200px",
              backgroundImage: "url(/images/cardimage.jpg)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </Box>
        {/* First Section */}
        <Box
          component="div"
          sx={{ display: "flex", justifyContent: "center", mt: 1 }}
        >
          {/* Title  */}
          <Typography variant="h5" component="h5">
            {props.title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};