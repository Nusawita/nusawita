import { Box, Typography } from "@mui/material";
import React from "react";
import AdminSidebar from "../../components/UI/Appbar/admin-sidebar";
import TourismTable from "../../components/UI/Tables/tourism-table";

const AdminDashboardTourism = () => {
  const tableColumns = ["Name", "Rating", "Address", "Image", " "];
  const dummyData = [
    {
      id: 1,
      name: "Pantai Pandawa",
      rating: 4.5,
      location: "Jl. Pantai Pandawa, Kutuh, Kec. Kuta Sel, Bali",
      image: null,
    },
    {
      id: 2,
      name: "Pantai Pandawa",
      rating: 4.5,
      location: "Jl. Pantai Pandawa, Kutuh, Kec. Kuta Sel, Bali",
      image: null,
    },
    {
      id: 3,
      name: "Pantai Pandawa",
      rating: 4.5,
      location: "Jl. Pantai Pandawa, Kutuh, Kec. Kuta Sel, Bali",
      image: null,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "#F4F6F8",
        height:'100vh',
        overflow:'auto'
      }}
    >
      <Box>
        <AdminSidebar activeLink="tourism" />
      </Box>
      <Box
        sx={{
          display: "flex",
          px: 7,
          my: 5,
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box>
          <Typography variant="h4" component="h4" sx={{ fontWeight: "400" }}>
            Tourism Data
          </Typography>
          <Typography variant="body1" component="p" sx={{ fontWeight: "400" }}>
            Home / Tourism
          </Typography>
        </Box>

        <Box sx={{ py: 3, width: "100%" }}>
          <TourismTable columns={tableColumns} data={dummyData} />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboardTourism;
