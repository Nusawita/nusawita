import { Backdrop, Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { VerifyDialog } from "../../../components/UI/custom-UI";

const ProfileFeedbacks = (props) => {
  const editingStates = props.editingStates;
  const editFunctionality = props.editFunctionality
  return (
    <>
      <Backdrop
        open={editingStates === "submitting"}
        sx={{
          color: "#ffff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress />
      </Backdrop>

      <VerifyDialog
        open={editingStates === "verifyingCancel"}
        title={"Discard Change"}
        content={
          <Box sx={{ mx: 5, textAlign: "center" }}>
            <Typography variant="subtitle1" component="p" fontWeight={400}>
              Are you sure you want to discard the changes?
            </Typography>
            <Typography variant="subtitle1" component="p" fontWeight={400}>
              Any unsaved data will be lost.
            </Typography>
          </Box>
        }
        actions={
          <Box>
            <Button
              onClick={editFunctionality.enterEditMode}
              size="small"
              sx={{ width: "auto", mx: 1 }}
            >
              No
            </Button>
            <Button
              onClick={editFunctionality.revertEditChanges}
              variant="primary"
              size="small"
              sx={{ width: "auto", mx: 1 }}
            >
              Yes
            </Button>
          </Box>
        }
      />
      <VerifyDialog
        open={editingStates === "verifyingSave"}
        title={"Save Changes"}
        content={
          <Box sx={{ mx: 5, textAlign: "center" }}>
            <Typography variant="subtitle1" component="p" fontWeight={400}>
              Are you sure you want to save the changes?
            </Typography>
          </Box>
        }
        actions={
          <Box>
            <Button
              onClick={editFunctionality.enterEditMode}
              size="small"
              sx={{ width: "auto", mx: 1 }}
            >
              No
            </Button>
            <Button
              onClick={editFunctionality.submitEdit}
              variant="primary"
              size="small"
              sx={{ width: "auto", mx: 1 }}
            >
              Yes
            </Button>
          </Box>
        }
      />
    </>
  );
};

export default ProfileFeedbacks;
