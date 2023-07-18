import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
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
import { AdminUserActions, CustomTextField } from "../custom-UI";
import { ContentMiddle } from "../../../styles/shared-styles";

const UserDataTable = (props) => {
  const theme = useTheme();
  const colorPalette = theme.palette;
  const allUser = props.userData;
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const[searchFocused, setSearchFocused] = useState(false)


  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = props.handleDelete

  useEffect(() => {
    const id = setTimeout(() => {
      if (search.trim().length === 0) {
        setSearchResult([]);
        return;
      }
      const result = allUser.filter((user) => {
        return (
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.noTelp.includes(search)
        );
      });
      setPage(0);
      setSearchResult(result);
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [search, allUser]);

  const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);c
  const rowsPerPage = 10;
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - allUser.length);
  const searchEmptyRows = Math.max(
    0,
    (1 + page) * rowsPerPage - searchResult.length
  );

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "70rem",
          borderRadius: "4px",
          backgroundColor: "white",
        }}
      >
        <Typography
          sx={{
            backgroundColor: colorPalette.primary.main,
            p: 2,
            color: "white",
            borderRadius: "4px",
          }}
          variant="h6"
          component="h6"
        >
          User Data Table
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Box>
            <Button
              sx={{
                color: "#2196F3",
                width: "8rem",
                mx: 1,
                textTransform: "none",
              }}
            >
              <Icon icon="bi:filter" color="#2196F3" width="24" />
              <Typography variant="buttonText" component="span" sx={{ px: 1 }}>
                FILTERS
              </Typography>
            </Button>
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
          </Box>
          <Box sx={{ pr: 10 }}>
            <CustomTextField
              variant="standard"
              label="Search"
              value={search}
              onFocus = {()=>{setSearchFocused(true)}}
              onBlur = {()=>{setSearchFocused(false)}}
              focused = {searchFocused}
              onChange={handleSearchChange}
              leftIcon={
                <Icon icon="material-symbols:search" color="gray" width="24" />
              }
            />
          </Box>
        </Box>

        <Table sx={{ pt: 2 }}>
          <TableHead>
            {props.loading ? (
              <TableRow>
                <TableCell>
                  <Typography
                    sx={{ textAlign: "center", mx: 60, mt: 5 }}
                    variant="h3"
                  >
                    Loading...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <>
                <TableRow>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Birth Date</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Status</TableCell>
                  {props.includeActions && (
                    <TableCell align="center">Actions</TableCell>
                  )}
                </TableRow>
              </>
            )}
          </TableHead>
          <TableBody>
            {search
              ? searchResult
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="left">{row.username}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.dob}</TableCell>
                      <TableCell align="left">{row.noTelp}</TableCell>
                      <TableCell align="left">
                        {row.ban === 0 ? (
                          <Typography
                            color={colorPalette.primary.light}
                            variant="body2"
                            component="p"
                            fontWeight="400"
                          >
                            Active
                          </Typography>
                        ) : (
                          <Typography
                            color={colorPalette.danger.main}
                            variant="body2"
                            component="p"
                            fontWeight="400"
                          >
                            Banned
                          </Typography>
                        )}
                      </TableCell>
                      {props.includeActions && (
                        <TableCell sx={{ ...ContentMiddle }}>
                          <AdminUserActions loadingDelete = {props.loadingDelete} handleDelete={()=>{handleDelete(row.id)}} user = {row.username} />
                        </TableCell>
                      )}
                    </TableRow>
                  ))
              : allUser
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="left">{row.username}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.dob}</TableCell>
                      <TableCell align="left">{row.noTelp}</TableCell>
                      <TableCell align="left">
                        {row.ban === 0 ? (
                          <Typography
                            color={colorPalette.primary.light}
                            variant="body2"
                            component="p"
                            fontWeight="400"
                          >
                            Active
                          </Typography>
                        ) : (
                          <Typography
                            color={colorPalette.danger.main}
                            variant="body2"
                            component="p"
                            fontWeight="400"
                          >
                            Banned
                          </Typography>
                        )}
                      </TableCell>
                      {props.includeActions && (
                        <TableCell sx={{ ...ContentMiddle }}>
                          <AdminUserActions loadingDelete = {props.loadingDelete} handleDelete={()=>{handleDelete(row.id)}} user = {row.username}/>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
            {search
              ? searchEmptyRows > 0 && (
                  <TableRow style={{ height: 53 * searchEmptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )
              : emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[0]}
                // onRowsPerPageChange={(event) => {
                //   setRowsPerPage(parseInt(event.target.value, 10));
                //   setPage(0);
                // }}
                count={search ? searchResult.length : allUser.length}
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
    </Box>
  );
};

export default UserDataTable;
