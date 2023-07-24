import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { ContentMiddle } from "../../../styles/shared-styles";
import { Icon } from "@iconify/react";

const SecondSection = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const colorPalette = {
    primary: theme.palette.primary,
    danger: theme.palette.danger,
  };

  const styles = {
    outerWrapper: {
      ...ContentMiddle,
      width: "100%",
      mt: 10,
    },
    subtext: {
      textAlign: "center",
      px: 5,
      mt: 3,
    },
  };
  return (
    <>
      <Box sx={styles.outerWrapper}>
        {/* title */}
        <Icon
          icon="subway:location-3"
          width="80"
          color={colorPalette.primary.main}
        />
        <Typography variant="h3" component="h3">
          Indonesia
        </Typography>
        {/* content */}
        <Typography
          variant="h5"
          component="h5"
          sx={{ textAlign: "center", px: 5, mt: 3 }}
        >
          Lorem ipsum dolor sit amet consectetur. Enim quis massa arcu in ac
          orci ut nibh. Mattis tellus eu lectus pretium interdum in suspendisse
          turpis risus. Nunc est velit molestie tellus velit orci ligula
          adipiscing. Ut luctus feugiat nunc nec. Eget lacinia habitant habitant
          morbi quis nec dignissim. Etiam urna justo lectus potenti semper. Orci
          gravida praesent ut dolor amet.
        </Typography>
        <Box sx={styles.subtext}>
          <Typography
            variant={smallScreen ? "h4" : "h3"}
            component={smallScreen ? "h4" : "h3"}
            style={{ color: "#FF544D", textAlign: "center" }}
          >
            Scroll To Explore More
          </Typography>
          <Box
            sx={{
              backgroundImage: "url(/assets/line_1.jpg)",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "8rem",
              mt: 2,
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default SecondSection;
