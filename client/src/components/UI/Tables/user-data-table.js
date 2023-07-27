import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { Icon } from "@iconify/react";
import {
  AdminUserActions,
  BanDialog,
  BannedText,
  CustomTextField,
  VerifyDialog,
} from "../custom-UI";
import { ContentMiddle } from "../../../styles/shared-styles";
import api from "../../../axios-instance";

const UserDataTable = (props) => {
  const theme = useTheme();
  const colorPalette = theme.palette;

  //All props for this table component
  const userData = props.userData; //The data to show on the table
  const banReasons = props.banReasons;
  const changeData = props.onDataChange; //The function to run when data change
  const loading = props.loading; //The loading state of the table
  const includeActions = props.includeActions; //Include actions column or not
  const serverTimestamp = props.serverTimestamp;
  const columns = [
    "Username",
    "Email",
    "Birth Date",
    "Phone",
    "Status",
  ];

  //Data to show on the table
  const [shownData, setShownData] = useState([]);

  //State to store the username of the user being banned or deleted
  const [processedUser, setProcessedUser] = useState({});

  //Search functionality variables
  const [search, setSearch] = useState(""); //The value inside the search field
  const [searchFocused, setSearchFocused] = useState(false); //The focus state of the search field
  const [filterValue, setFilterValue] = useState(0);

  //Function to run on onChange of search field
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  //After finished typing get the search result to searchResult array
  useEffect(() => {
    const id = setTimeout(() => {
      //If user entered spaces
      if (search.trim().length === 0) {
        if (filterValue === 0) {
          setShownData(userData);
          return;
        }
        if (filterValue === 1) {
          setShownData(
            userData.filter((user) => {
              return (user.ban - serverTimestamp) / 86400000 > 0;
            })
          );
        } else {
          setShownData(
            userData.filter((user) => {
              return (user.ban - serverTimestamp) / 86400000 <= 0;
            })
          );
        }
        return;
      }
      //Filter from the initial data (userData)
      const result = userData.filter((user) => {
        return (
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.noTelp.includes(search)
        );
      });

      //Set table page back to 0 because now show search result instead of all data
      setPage(0);
      //Feed the search result to the searchResult state
      if (filterValue === 0) {
        setShownData(result);
        return;
      }
      if (filterValue === 1) {
        setShownData(
          result.filter((user) => {
            return (user.ban - serverTimestamp) / 86400000 > 0;
          })
        );
      } else {
        setShownData(
          result.filter((user) => {
            return (user.ban - serverTimestamp) / 86400000 <= 0;
          })
        );
      }
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [search, filterValue, userData, serverTimestamp]);

  //Ban user functionality variables
  const [banDuration, setBanDuration] = useState(1);
  const [loadingBan, setLoadingBan] = useState(false);
  const [openBanDialog, setOpenBanDialog] = useState(false);
  const [openUnbanDialog, setOpenUnbanDialog] = useState(false);
  const [loadingUnban, setLoadingUnban] = useState(false);
  const [banReason, setBanReason] = useState(1);
  //Function to run on onChange of ban field in the dialog
  const handleBanDurationChange = (event) => {
    setBanDuration(event.target.value);
  };
  const handleBanReasonChange = (data) => {
    setBanReason(data);
  };

  const handleUnban = () => {
    setLoadingUnban(true);
    setTimeout(() => {
      fetchBanApi(processedUser.id, 0, null);
    }, 1000);
  };
  //Function that calls the ban api
  const fetchBanApi = async (userId, banDuration, banReasonId) => {
    try {
      const res = await api.put(
        `/admin/user/${userId}/ban`,
        { ban: banDuration, banReasonId: banReasonId },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        //Make new state to replace existing for real time change
        const newState = userData.map((obj) => {
          if (obj.id === userId) {
            return {
              ...obj,
              ban: serverTimestamp + 86400000 * banDuration,
              ban_detail: { banReasonId: banReasonId },
            };
          }
          return obj;
        });

        //feed the new data so the table refreshes
        changeData(newState);
      }
    } catch (error) {
      console.log(error);
    }
    //When finished set loading ban to false
    setLoadingBan(false);
    setLoadingUnban(false);
  };
  //Function to handle banning user
  const handleBan = () => {
    //Set loading ban to true
    setOpenBanDialog(false);
    setLoadingBan(true);
    setTimeout(() => {
      fetchBanApi(processedUser.id, banDuration, banReason);
    }, 1000);
  };

  //Variables for delete user functionality
  const [loadingDelete, setLoadingDelete] = useState(false); //The loading state when deleting user
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // Function to call the delete user api
  const fetchDeleteApi = async (userId) => {
    try {
      const res = await api.delete(`/admin/user/${userId}`, {
        withCredentials: true,
      });
      //if success, refresh the userData with the new data (without the deleted user) for real time table change
      if (res.status === 200) {
        changeData(userData.filter((user) => user.id !== userId));
      }
    } catch (error) {
      // if unauthorized then show appropiate error in front
      console.log(error);
    }
    //When finished set the loading state to false
    setLoadingDelete(false);
  };
  //Function to handle deleting user
  const handleDelete = () => {
    //Start loading for delete process
    const userId = processedUser.id;
    setLoadingDelete(true);
    //Call the fetch delete user api function
    setTimeout(() => {
      fetchDeleteApi(userId);
    }, 1000);
  };

  const [page, setPage] = useState(0); //State to store the current page of the table
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowsPerPage = 10; //Max rows of data shown per page
  //Calculate empty rows when data in table not reach 10
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - shownData.length);

  return (
    <>
      {/* The Ban Dialog */}
      <BanDialog
        banDuration={banDuration}
        banReason={banReason}
        handleBanReasonChange={handleBanReasonChange}
        banReasons={props.banReasons}
        handleBanDurationChange={handleBanDurationChange}
        handleBan={handleBan}
        open={openBanDialog}
        user={processedUser.username}
        onClose={() => {
          setOpenBanDialog(false);
        }}
      />
      {/* The delete confirmation */}
      <VerifyDialog
        title={`Are you sure you want to delete user ${processedUser.username}?`}
        actions={
          <>
            <Button
              onClick={() => {
                setDeleteDialogOpen(false);
              }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                setDeleteDialogOpen(false);
                handleDelete();
              }}
            >
              Yes
            </Button>
          </>
        }
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
        }}
      />
      {/* Show loading */}
      <VerifyDialog
        title={`Deleting User ${processedUser.username}`}
        content={<CircularProgress />}
        open={loadingDelete}
      />
      <VerifyDialog
        title={`Banning User ${processedUser.username} for ${banDuration} days...`}
        content={<CircularProgress />}
        open={loadingBan}
      />
      <VerifyDialog
        title={`Unbanning User ${processedUser.username} `}
        content={<CircularProgress />}
        open={loadingUnban}
      />
      <VerifyDialog
        title={`Are you sure you want to stop banning user ${processedUser.username}?`}
        actions={
          <>
            <Button
              onClick={() => {
                setOpenUnbanDialog(false);
              }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                setOpenUnbanDialog(false);
                handleUnban();
              }}
            >
              Yes
            </Button>
          </>
        }
        open={openUnbanDialog}
        onClose={() => {
          setOpenUnbanDialog(false);
        }}
      />

      <Box
        sx={{
          width: "100%",
          borderRadius: "4px",
          backgroundColor: "white",
        }}
      >
        <Typography
          sx={{
            backgroundColor: colorPalette.primary.main,
            px: 3,
            py: 1,
            color: "white",
            borderRadius: "4px 4px 0px 0px",
          }}
          variant="h6"
          component="h6"
        >
          User Data Table
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ pl: 5, py: 2,  flexGrow:1 }}>
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
              sx={{ width:'25s%' }}
            />
            <Box component="span" sx={{ pl: 5 }}>
              <FormControl sx={{ width:'20%' }}>
                <InputLabel>Filter</InputLabel>
                <Select
                  label="filter"
                  value={filterValue}
                  onChange={handleFilterValueChange}
                  size="small"
                  sx={{ width:'100%' }}
                >
                  <MenuItem value={0}>All</MenuItem>
                  <MenuItem value={1}>Banned</MenuItem>
                  <MenuItem value={2}>Active</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ mt: 1.5 }}>
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
              <Typography variant="buttonText" component="span" sx={{ px: 2 }}>
                EXPORT
              </Typography>
            </Button>
          </Box>
        </Box>

        <Table sx={{ pt: 2 }}>
          <TableHead>
            {/* If loading show circular progress */}
            {loading ? (
              <TableRow>
                <TableCell>
                  <Typography
                    sx={{ textAlign: "center", mx: 60, mt: 5 }}
                    variant="h3"
                  >
                    <CircularProgress />
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              // Else show the data to the table
              <>
                <TableRow>
                  {columns.map((column, i) => {
                    return (
                      <TableCell key={i} align="left">
                        {column}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </>
            )}
          </TableHead>
          <TableBody>
            {shownData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.username}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.dob}</TableCell>
                    <TableCell align="left">{row.noTelp}</TableCell>
                    <TableCell align="left">
                      {(row.ban - serverTimestamp) / 86400000 <= 0 ? (
                        <Typography
                          color={colorPalette.primary.light}
                          variant="body2"
                          component="p"
                          fontWeight="400"
                        >
                          Active
                        </Typography>
                      ) : (
                        <BannedText
                          banReason={
                            row.ban_detail &&
                            banReasons[row.ban_detail.banReasonId - 1].reason
                          }
                          banDuration={(row.ban - serverTimestamp) / 86400000}
                          username={row.username}
                        />
                      )}
                    </TableCell>
                    {includeActions && (
                      <TableCell sx={{ ...ContentMiddle }}>
                        <AdminUserActions
                          isBanned={
                            (row.ban - serverTimestamp) / 86400000 > 0 && true
                          }
                          onBanClick={() => {
                            setProcessedUser({
                              id: row.id,
                              username: row.username,
                            });
                            setOpenBanDialog(true);
                          }}
                          onUnbanClick={() => {
                            setProcessedUser({
                              id: row.id,
                              username: row.username,
                            });
                            setOpenUnbanDialog(true);
                          }}
                          onDeleteClick={() => {
                            setProcessedUser({
                              id: row.id,
                              username: row.username,
                            });
                            setDeleteDialogOpen(true);
                          }}
                          user={row.username}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[0]}
                // onRowsPerPageChange={(event) => {
                //   setRowsPerPage(parseInt(event.target.value, 10));
                //   setPage(0);
                // }}
                count={shownData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => {
                  setPage(newPage);
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Box>
    </>
  );
};

export default UserDataTable;
