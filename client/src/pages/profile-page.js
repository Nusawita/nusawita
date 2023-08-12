import React, { useEffect, useState } from "react";
import CustomAppbar from "../components/UI/Appbar/custom-appbar";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { ContentMiddle } from "../styles/shared-styles";
import { useTheme } from "@emotion/react";
import { CustomTextField } from "../components/UI/custom-UI";
import api from "../axios-instance";

const ProfilePage = () => {
  const theme = useTheme();
  const colorPalette = theme.palette;
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewOnly, setViewOnly] = useState(true);
  const dobRegex = /T00:00:00\.000Z\s*$/;

  const getUserProfile = async () => {
    try {
      const res = await api.get("/profile", { withCredentials: true });
      if (res.status === 200) {
        setUserData(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      alert("Server Error");
    }
  };
  useEffect(() => {
    if (userData.username) {
      console.log(userData);
      return;
    }
    getUserProfile();
  }, [userData]);

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <>
        <CustomAppbar position="static" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            mt: 5,
          }}
        >
          {/* My Profile Section */}
          <Paper elevation={1} sx={{ width: "90%" }}>
            <Box sx={{ px: 4, py: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Paper
                  elevation={2}
                  component="span"
                  sx={{ mr: 2, py: 1, px: 2 }}
                >
                  <Icon icon="icon-park-solid:back" width={24} />
                </Paper>
                <Typography variant="h4" component="h4" fontWeight={400}>
                  My Profile
                </Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography>Home / Profile</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Account Data Section */}
          <Box sx={{ width: "90%", mt: 4 }}>
            <Grid container>
              <Grid item xs={2}>
                <Box sx={{ ...ContentMiddle, height: "60%", width: "100%" }}>
                  <Paper elevation={1} sx={{ height: "80%", width: "80%" }}>
                    <Box
                      sx={{
                        backgroundImage: "url(/images/gapura.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "100%",
                        // height: "11rem",
                        // width: "11rem",
                      }}
                    />
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={10}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "50%",
                  }}
                >
                  <Typography variant="h5" component="h5" fontWeight={400}>
                    Account Data
                  </Typography>
                  <CustomTextField
                    sx={{ mt: 3 }}
                    disabled={viewOnly}
                    size="small"
                    label="Username"
                    value={userData.username}
                    variant="outlined"
                  />
                  <CustomTextField
                    disabled={viewOnly}
                    size="small"
                    sx={{ mt: 3 }}
                    label="Email"
                    value={userData.email}
                    variant="outlined"
                  />
                  <CustomTextField
                    disabled={viewOnly}
                    sx={{ mt: 3 }}
                    size="small"
                    label="Phone Number"
                    value={
                      userData.noTelp === ""
                        ? "No Phone Number"
                        : userData.noTelp
                    }
                    variant="outlined"
                  />
                  <CustomTextField
                    disabled={viewOnly}
                    size="small"
                    sx={{ mt: 3 }}
                    label="Date of Birth"
                    value={userData.dob.replace(dobRegex, "")}
                    variant="outlined"
                  />
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="primary"
                      size="medium"
                      sx={{ width: "auto", px: 6 }}
                    >
                      Edit Password
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
};

export default ProfilePage;
