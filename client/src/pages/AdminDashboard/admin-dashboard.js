import React from "react";
import {
  Box,
} from "@mui/material";
import AdminSidebar from "../../components/UI/Navbar/admin-sidebar";
import UserDataTable from "../../components/UI/Tables/user-data-table";

export const AdminDashboard = () => {


  return (
    <Box sx={{ display: "flex", backgroundColor: "#F4F6F8"}}>
      <AdminSidebar />
      <UserDataTable />

    </Box>
  );
};
