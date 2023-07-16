import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import CustomAppbar from "../../components/UI/Appbar/custom-appbar";
import FirstSection from "./Sections/first-section";
import SecondSection from "./Sections/second-section";
import ThirdSection from "./Sections/third-section";
import FourthSection from "./Sections/fourth-section";
import Footer from "./Sections/footer";

export const LandingPage = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {smallScreen ? (
        <CustomAppbar position="static" />
      ) : (
        <CustomAppbar position="absolute" />
      )}
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </>
  );
};
