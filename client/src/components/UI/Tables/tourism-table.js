import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CustomTextField } from "../custom-UI";
import { Icon } from "@iconify/react";
import { ContentMiddle } from "../../../styles/shared-styles";

const TourismTable = (props) => {
  const theme = useTheme();
  const colorPalette = theme.palette;

  const columns = props.columns;
  const data = props.data;
  const actions = [
    {
      actionName: "More Details",
      action: () => {
        alert("More Details");
      },
    },
    {
      actionName: "Edit",
      action: () => {
        alert("Edit");
      },
    },
    {
      actionName: "Delete",
      action: () => {
        alert("Delete");
      },
    },
  ];

  //Search Variables
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  //Filter Variables
  const [filterValue, setFilterValue] = useState(0);
  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  //Menu handlers
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const menuOpen = Boolean(anchorEl);

  return (
    <>
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
      >
        <MenuList>
          {actions.map((action, i) => {
            return (
              <MenuItem
                key={i}
                onClick={() => {
                  action.action();
                }}
              >
                <ListItemIcon>
                  <Icon icon="bxs:detail" width={15} color="black" />
                </ListItemIcon>
                <Typography>{action.actionName}</Typography>
              </MenuItem>
            );
          })}
          {/* <MenuItem>
            <ListItemIcon>
              <Icon icon="bxs:detail" width={15} color="black" />
            </ListItemIcon>
            <Typography>More Details</Typography>
          </MenuItem> */}
          {/* <MenuItem>
            <ListItemIcon>
              <Icon icon="bxs:edit" width={15} color="black" />
            </ListItemIcon>
            <Typography>Edit</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Icon icon="material-symbols:delete" width={15} color="black" />
            </ListItemIcon>
            <Typography>Delete</Typography>
          </MenuItem> */}
        </MenuList>
      </Menu>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h6"
          component="h6"
          sx={{
            backgroundColor: colorPalette.primary.main,
            color: "white",
            px: 3,
            py: 1,
            borderRadius: "4px 4px 0px 0px",
          }}
        >
          Tourism Data Table
        </Typography>
        <Box
          sx={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ p: 2 }}>
            <CustomTextField
              size="small"
              variant="outlined"
              label="Search"
              value={search}
              onFocus={() => {
                setSearchFocused(true);
              }}
              onBlur={() => {
                setSearchFocused(false);
              }}
              focused={searchFocused}
              onChange={handleSearchChange}
              leftIcon={
                <Icon icon="material-symbols:search" color="gray" width="24" />
              }
              sx={{ height: "1rem" }}
            />
            <Box component="span" sx={{ px: 2 }}>
              <FormControl>
                <InputLabel>Filter</InputLabel>
                <Select
                  label="filter"
                  value={filterValue}
                  onChange={handleFilterValueChange}
                  size="small"
                  sx={{ minWidth: "15rem" }}
                >
                  <MenuItem value={0}>All</MenuItem>
                  <MenuItem value={1}>Bali</MenuItem>
                  <MenuItem value={2}>Jawa</MenuItem>
                  <MenuItem value={3}>Kalimantan</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ p: 2 }}>
            <Button
              sx={{
                color: "#2196F3",
                width: "8rem",
                mx: 1,
                textTransform: "none",
              }}
            >
              <Icon
                icon="material-symbols:download"
                color="#2196F3"
                width="24"
              />
              <Typography variant="buttonText" component="span" sx={{ px: 1 }}>
                EXPORT
              </Typography>
            </Button>
            <Button
              sx={{
                color: "#2196F3",
                width: "13rem",
                mx: 1,
                textTransform: "none",
              }}
            >
              <Icon icon="ic:round-add" color="#2196F3" width="24" />
              <Typography variant="buttonText" component="span" sx={{ px: 1 }}>
                ADD DESTINATION
              </Typography>
            </Button>
          </Box>
        </Box>

        <Table sx={{ backgroundColor: "white" }}>
          <TableHead>
            <TableRow>
              {columns.map((column, i) => {
                return (
                  <TableCell key={i} align="left">
                    {column}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((element) => {
                return (
                  <TableRow key={element.id}>
                    <TableCell>{element.name}</TableCell>
                    <TableCell sx={{ display: "flex" }}>
                      <Icon icon="typcn:star" width={20} color="#FFB400" />
                      <Typography variant="caption">
                        {element.rating}
                      </Typography>
                    </TableCell>
                    <TableCell>{element.location}</TableCell>
                    <TableCell>{element.image}</TableCell>
                    <TableCell>
                      <Button
                        onClick={handleMenuOpen}
                        sx={{
                          maxWidth: "0.5rem",
                          ...ContentMiddle,
                          "&:hover": {
                            backgroundColor: "#0086761A",
                          },
                        }}
                      >
                        <Icon icon="tabler:dots" width={20} color="#00000099" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default TourismTable;
