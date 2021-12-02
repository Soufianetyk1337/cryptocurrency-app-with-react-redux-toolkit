import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <Box
      sx={{
        display: "flex",
        margin: "1rem",
        height: "2rem",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        textAlign: "center"
      }}>
      <Typography
        variant="body2"
        sx={{
          display: "inline-block"
        }}
      >  Cryptonews {year}. All rights reserved</Typography>
    </Box>
  );
};

export default Footer;
