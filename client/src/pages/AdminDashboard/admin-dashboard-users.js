import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AdminSidebar from "../../components/UI/Appbar/admin-sidebar";
import UserDataTable from "../../components/UI/Tables/user-data-table";
import { useTheme } from "@emotion/react";
import { DashboardCard } from "../../components/UI/custom-UI";
import api from "../../axios-instance";

export const AdminDashboardUsers = () => {
  const theme = useTheme();
  const colorPalette = theme.palette;
  const [userData, setUserData] = useState([]);
  const [banReasons, setBanReasons] = useState([]);
  const [serverTimestamp, setServerTimestamp] = useState(0);

  const [loading, setLoading] = useState(true);

  const handleDataChange = (newValue) => {
    setUserData(newValue);
  };

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
        overflow: "auto",
        width: "auto",
      }}
    >
      <Box sx={{}}>
        <AdminSidebar activeLink="users" />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 5,

          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{}}>
            <Typography variant="h4" component="h4" sx={{ fontWeight: "400" }}>
              Users Data
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ fontWeight: "400" }}
            >
              Home / Users
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* Dashboard Cards */}
            <DashboardCard
              loading={loading}
              sx={{ mt: 2, mr: 5 }}
              bodyColor="#62C91E"
              number={
                userData.filter((user) => {
                  return (user.ban - serverTimestamp) / 86400000 <= 0;
                }).length
              }
              object="Active User"
              footerColor={colorPalette.success.dark}
            />
            <DashboardCard
              loading={loading}
              sx={{ mt: 2, mr: 5 }}
              bodyColor={colorPalette.danger.main}
              number={
                userData.filter((user) => {
                  return (user.ban - serverTimestamp) / 86400000 > 0;
                }).length
              }
              object="Banned User"
              footerColor="#773601"
            />
            <DashboardCard
              loading={loading}
              sx={{ mt: 2 }}
              bodyColor={colorPalette.info.light}
              number={userData.length}
              object="Total Users"
              footerColor={colorPalette.info.dark}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <UserDataTable
              onDataChange={handleDataChange}
              includeActions
              userData={userData}
              loading={loading}
              banReasons={banReasons ? banReasons : ""}
              serverTimestamp={serverTimestamp}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
