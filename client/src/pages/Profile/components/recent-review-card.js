import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { ContentMiddle } from "../../../styles/shared-styles";
import { useTheme } from "@emotion/react";
import { Icon } from "@iconify/react";
const RecentReviewCard = (props) => {
  const reviewData = props.reviewData;
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const styles = {
    card: {
      maxWidth: smallScreen ? "90%" : "28%",
      my:smallScreen && 2,
      cursor: "pointer",
      ":hover": { transform: "scale(1.004)" },
    },
    cardImage: {
      aspectRatio: 4 / 3,
      width: "100%",
      backgroundImage: "url(/images/cardimage.jpg)",
      backgroundPosition: "center",
      backgroundSize: "cover",
      borderRadius: "5px",
    },
  };
  return (
    <>
      <Card elevation={2} sx={styles.card}>
        <CardContent>
          <Box component="span" sx={{ ...ContentMiddle }}>
            <Box sx={styles.cardImage} />
          </Box>
          <Typography variant="subtitle1" fontWeight={400} mt={1}>
            {reviewData.name}
          </Typography>
          <Box
            component="span"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              my: 1,
            }}
          >
            <Typography>Your Rating:</Typography>
            <Box sx={{ display: "flex" }}>
              <Icon icon="ant-design:star-filled" width="20" color="#F6B001" />
              <Typography variant="subtitle1">{reviewData.rating}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              my: 1,
            }}
          >
            <Typography>Reviewed On:</Typography>
            <Typography variant="caption">22/07/2021</Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet consectetur. Tincidunt orci adipiscing
              tempor lacus sed at mauris auctor. Viverra lectus morbi nibh nibh
              adipiscing libero volutpat imperdiet facilisis. Tincidunt
              adipiscing turpis ornare tincidunt odio amet. A purus aliquam
              dignissim justo ut. Eget quam integer lectus eget tempus. Cursus.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default RecentReviewCard;
