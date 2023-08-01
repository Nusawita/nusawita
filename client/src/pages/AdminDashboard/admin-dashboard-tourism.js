import { Box, Typography } from "@mui/material";
import React, {useState, useEffect} from "react";
import AdminSidebar from "../../components/UI/Appbar/admin-sidebar";
import TourismTable from "../../components/UI/Tables/tourism-table";
import api from "../../axios-instance";

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
      name: "Pantai Kalimantan",
      rating: 4.5,
      location: "Jl. Pantai Pandawa, Kutuh, Kec. Kuta Sel, Kalimantan",
      image: null,
    },
    {
      id: 3,
      name: "Pantai Jawa",
      rating: 4.5,
      location: "Jl. Pantai Pandawa, Kutuh, Kec. Kuta Sel, Jawa",
      image: null,
    },
    {
      id: 4,
      name: "Gunung Bromo",
      rating: 4.5,
      location: "Jl. Pantai Pandawa, Kutuh, Kec. Kuta Sel, Jawa",
      image: null,
    },
  ];

  const [tourismData, setTourismData] = useState([])
    //Get All User Data
    useEffect(() => {
      const abortController = new AbortController();
      const id = setTimeout(async () => {
        try {
          // call login api
          const res = await api.get(
            "/location",
            {
              withCredentials: true,
            },
            { signal: abortController.signal }
          );
          console.log(res.data)
          setTourismData(res.data.data);
        } catch (error) {
          // if unauthorized then show appropiate error in front
          console.log(error);
        }
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
          <TourismTable columns={tableColumns} data={tourismData} />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboardTourism;
