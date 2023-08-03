import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../axios-instance";

const EmailVerificationPage = () => {
  const [token, setToken] = useState("");
  const [successVerify, setSuccessVerify] = useState(false);
  const [badRequest, setBadRequest] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;

    // Parse the query string into a URLSearchParams object
    const queryParams = new URLSearchParams(queryString);

    // Get the value of the 'token' parameter from the query string
    const token = queryParams.get("token");
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      fetchVerifyEmail(token);
    }
  }, [token]);

  useEffect(() => {
    if (successVerify) {
      const id = setTimeout(() => {
        window.location.href = '/login'
      }, 5000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [successVerify]);

  const fetchVerifyEmail = async (token) => {
    try {
      const res = await api.get(`verify-email?token=${token}`);
      console.log(res);
      if (res.status === 200) {
        setSuccessVerify(true);
      }
    } catch (error) {
      setBadRequest(true);
    }
  };
  return (
    <>
      {successVerify && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h1" sx={{ textAlign: "center", mt: 15 }}>
            Email succesfully verified
          </Typography>
          <Typography variant="h3">Redirecting to login...</Typography>
          <CircularProgress size={100} sx={{ mt: 5 }} />
        </Box>
      )}
      {badRequest && (
        <Box sx={{ mt: 10 }}>
          <Typography textAlign="center" variant="h1">
            Bad Request
          </Typography>
          <Typography textAlign="center" variant="h5">
            The Link Has Expired or Does Not Exist
          </Typography>
        </Box>
      )}
    </>
  );
};

export default EmailVerificationPage;
