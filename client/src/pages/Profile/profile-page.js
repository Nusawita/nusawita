import React from "react";
import CustomAppbar from "../../components/UI/Appbar/custom-appbar";
import { Box } from "@mui/material";

import RecentReviews from "./components/recent-reviews";
import AccountData from "./components/account-data";

const ProfilePage = () => {
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
        <AccountData />
        <RecentReviews />
      </Box>
    </>
  );
};

export default ProfilePage;
