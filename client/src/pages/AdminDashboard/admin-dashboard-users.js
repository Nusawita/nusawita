import React, { useState, useEffect } from "react";
import { Box,  Typography } from "@mui/material";
import AdminSidebar from "../../components/UI/Appbar/admin-sidebar";
import UserDataTable from "../../components/UI/Tables/user-data-table";
import { useTheme } from "@emotion/react";
import { DashboardCard } from "../../components/UI/custom-UI";
import api from "../../axios-instance";

export const AdminDashboardUsers = () => {
  const theme = useTheme();
  const colorPalette = theme.palette;

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false)
  const fetchDeleteApi = async(userId) =>{
    try {
      // call login api
      const res = await api.delete(`/admin/user/${userId}`,{
        withCredentials: true,
      });
      //if login success redirect to landing page
      if (res.status === 200) {
        setUserData(userData.filter((user)=>(user.id !== userId)))
        console.log(userData)
      }
    } catch (error) {
      // if unauthorized then show appropiate error in front
      console.log('error')
    }
    setLoadingDelete(false)
  }
  const handleDelete = (row) => {
    setLoadingDelete(true)
    fetchDeleteApi(row)
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
        justifyContent: "center",
      }}
    >
      <AdminSidebar activeLink = 'users' />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          py: 5,
        }}
      >
        <Box sx={{ width: " 70rem" }}>
          <Typography variant="h4" component="h4" sx={{ fontWeight: "400" }}>
            Users Data
          </Typography>
          <Typography variant="body1" component="p" sx={{ fontWeight: "400" }}>
            Home / Users
          </Typography>
        </Box>

        <Box
          sx={{
            width: " 70rem",
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
                  return user.ban === 0;
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
                return user.ban !== 0;
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

        <UserDataTable loadingDelete = {loadingDelete} includeActions userData={userData} loading={loading} handleDelete={handleDelete}/>
      </Box>
    </Box>
  );
};
