import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

export const StatusFeedbacks = (props) => {
  const tokenStatus = props.tokenStatus;
  const passwordChanged = props.passwordChanged;

  return (
    <>
      {tokenStatus === "loading" && (
        <Box sx={{ my: 5, display:'flex', flexDirection:'column', alignItems:'center' }}>
          <Typography sx={{ textAlign: "center" }} component="h1" variant="h1">
            Verifying change password request...
          </Typography>
          <CircularProgress sx = {{ mt:2 }} size={100}/>
        </Box>
      )}
      {tokenStatus === "invalid" && (
        <Box sx={{ my: 5 }}>
          <Typography sx={{ textAlign: "center" }} component="h1" variant="h1">
            Sorry link is invalid or expired
          </Typography>
        </Box>
      )}
      {passwordChanged && (
        <Box sx={{ my: 5, display:'flex', flexDirection:'column', alignItems:'center' }}>
          <Typography sx={{ textAlign: "center" }} component="h1" variant="h1">
            Password successfully changed, reredirecting to profile page...
          </Typography>
          <CircularProgress sx = {{ mt:2 }} size={100}/>
        </Box>
      )}
    </>
  );
};
