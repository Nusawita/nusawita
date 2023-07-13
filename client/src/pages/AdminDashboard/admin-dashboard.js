import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AuthContext from "../../context/auth-context";
import api from "../../axios-instance";

export const AdminDashboard = () => {
  const ctxAuth = useContext(AuthContext);
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    const id = setTimeout(async () => {
      try {
        // call login api
        const res = await api.get("admin/users", {
          withCredentials: true,
        });
        // console.log(res.data.data);
        setAllUser(res.data.data);
      } catch (error) {
        // if unauthorized then show appropiate error in front
        console.log(error);
      }
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <>
      <h1>Admin Page</h1>
      {allUser &&
        allUser.map((user) => {
          return (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5">{user.username}</Typography>
              <Typography variant="h5">{user.email}</Typography>
            </Box>
          );
        })}
      <Button onClick={ctxAuth.logoutUser} variant="primary">
        LOGOUT
      </Button>
    </>
  );
};
