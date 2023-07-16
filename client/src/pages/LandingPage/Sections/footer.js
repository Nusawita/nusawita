import React from "react";
import { Box, Typography, Grid, useMediaQuery } from "@mui/material";
import { Icon } from "@iconify/react";
import { useTheme } from "@emotion/react";

const Footer = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const colorPalette = {
    primary: theme.palette.primary,
    danger: theme.palette.danger,
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: colorPalette.primary.main,
          mt: 20,
        }}
      >
        <Grid container sx={{ py: 8, px: 4 }}>
          <Grid item xs={2.5}>
            <Box
              sx={{
                width: "155px",
                height: "120px",
                backgroundImage: "url(/logos/nusawita_logo_circle.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Typography variant="body1" component="p" color="white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
              sit et, volutpat velit. Id nisi porttitor lectus elit risus
              pretium amet.
            </Typography>
          </Grid>
          <Grid item sx={{ pl: 10, pt: 3 }} xs={7}>
            <Typography variant="body1" component="p" color="white">
              Contact Us
            </Typography>
            <Box component="span" sx={{ pt: 10 }}>
              <Typography
                variant="body1"
                component="p"
                color="white"
                sx={{ mt: 3 }}
              >
                <Box component="span" sx={{ mr: 1 }}>
                  <Icon icon="ic:baseline-email" width="14" color="white" />
                </Box>
                help@nusawita.com
              </Typography>
              <Typography
                variant="body1"
                component="p"
                color="white"
                sx={{ mt: 1 }}
              >
                <Box component="span" sx={{ mr: 1 }}>
                  <Icon
                    icon="akar-icons:linkedin-box-fill"
                    width="14"
                    color="white"
                  />
                </Box>
                NusaWita
              </Typography>
              <Typography
                variant="body1"
                component="p"
                color="white"
                sx={{ mt: 1 }}
              >
                <Box component="span" sx={{ mr: 1 }}>
                  <Icon
                    icon="akar-icons:twitter-fill"
                    width="14"
                    color="white"
                  />
                </Box>
                @NusaWita
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              component="p"
              color="white"
              sx={{ mt: 1 }}
            >
              Address
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="white"
              sx={{ mt: 1, maxWidth: "15rem" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                <Icon icon="fa-solid:map-marked-alt" width="18" color="white" />
              </Box>
              944 Edgewood Ave South Jacksonville FL 32205-5341
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="white"
              sx={{ maxWidth: "15rem", mt: 4 }}
            >
              Download apps at
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="white"
              sx={{ mt: 1, maxWidth: "15rem" }}
            >
              Google Play
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="white"
              sx={{ mt: 1, maxWidth: "15rem" }}
            >
              PlayStore
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
