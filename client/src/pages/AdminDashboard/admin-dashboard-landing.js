import React, { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import AdminSidebar from "../../components/UI/Appbar/admin-sidebar";
import UserDataTable from "../../components/UI/Tables/user-data-table";
import { useTheme } from "@emotion/react";
import { DashboardCard } from "../../components/UI/custom-UI";
import api from "../../axios-instance";
import { Icon } from "@iconify/react";

export const AdminDashboardLanding = () => {
  const theme = useTheme();
  const colorPalette = theme.palette;

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [banReasons, setBanReasons] = useState([]);
  const [serverTimestamp, setServerTimestamp] = useState(0);

  //Get All User Data
  useEffect(() => {
    const abortController = new AbortController();
    const id = setTimeout(async () => {
      try {
        // call login api
        const res = await api.get(
          "admin/users",
          {
            withCredentials: true,
          },
          { signal: abortController.signal }
        );
        // console.log(res.data.data);
        setUserData(res.data.data);
        setBanReasons(res.data.ban);
        setServerTimestamp(res.data.time);
      } catch (error) {
        // if unauthorized then show appropiate error in front
        console.log(error);
      }
      setLoading(false);
    }, 300);
    return () => {
      abortController.abort();
      clearTimeout(id);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#F4F6F8",
        justifyContent: "flex-start",
      }}
    >
      <Box>
        <AdminSidebar activeLink="home" />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          my: 5,
          px: 7,
          width: "100%",
        }}
      >
        <Box>
          <Typography variant="h4" component="h4" sx={{ fontWeight: "400" }}>
            Dashboard
          </Typography>
          <Typography variant="body1" component="p" sx={{ fontWeight: "400" }}>
            Home / Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            display="flex"
            flexDirection="column"
            width="20rem"
            sx={{ mr: 2 }}
          >
            {/* Dashboard Cards */}
            <DashboardCard
              loading={loading}
              onClick={() => {
                window.location.href = "/admin/dashboard/users";
              }}
              sx={{ cursor: "pointer" }}
              bodyColor={colorPalette.info.light}
              number={loading ? "Loading..." : userData.length}
              object="User"
              footerColor={colorPalette.info.dark}
              footerText="More Info"
              footerIcon={
                <Icon icon="akar-icons:arrow-right" color="white" width={20} />
              }
            />
            <DashboardCard
              loading={loading}
              sx={{ mt: 2 }}
              bodyColor="#62C91E"
              number="30"
              object="Tourism"
              footerColor={colorPalette.success.dark}
              footerText="More Info"
              footerIcon={
                <Icon icon="akar-icons:arrow-right" color="white" width={20} />
              }
            />
          </Box>

          {/* ActivityHistoryComponent */}
          <Paper elevation={1} sx={{ width: "60%", p: 3, flexGrow:1 }}>
            <Typography variant="h4" component="h4" sx={{ fontWeight: "400" }}>
              Activity History
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ fontWeight: "400" }}
            >
              2023
            </Typography>
          </Paper>
        </Box>
        <Box sx={{ width: "100%", mt: 5 }}>
          <UserDataTable
            banReasons={banReasons}
            userData={userData}
            loading={loading}
            serverTimestamp={serverTimestamp}
          />
        </Box>
      </Box>
    </Box>
  );
};
