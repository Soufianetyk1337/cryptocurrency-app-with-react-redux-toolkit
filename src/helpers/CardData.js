import { Box, Typography } from "@mui/material";
import React from "react";

const CardData = (data, color = "rgba(149, 149, 255, 1)") => (
  <Box
    display="grid"
    gridTemplateColumns="repeat(auto-fill, minmax(10rem, 1fr))"
    sx={{ gap: "1rem", justifyItems: "center" }}
  >
    {data?.map(({ icon, title, value, index }) => {
      if (!value) return null;
      return (
        <Box
          sx={{
            height: "auto",
            width: "100%",
          }}
          key={index}
        >
          <Box
            sx={{
              borderRadius: "1rem",
              maxWidth: "100%",
              maxHeight: "100%",
              display: "flex",
              padding: "1rem",
              justtifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: color,
              color: "white",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                padding: "0.5rem",
              }}
            >
              {value}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                padding: "0.5rem",
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
      );
    })}
  </Box>
);

export default CardData;
