import React from "react";
import { Line } from "react-chartjs-2";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const Chart = ({ coinHistory, currentPrice, coinName, id }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  for (let i = 0; i < coinHistory?.prices?.length; i += 1) {
    coinPrice.push(coinHistory?.prices[i][1]);
  }
  for (let i = 0; i < coinHistory?.prices?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.prices[i][0]).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#9595ff",
        borderColor: "#9595ff",
      },
    ],
    borderWidth: 1,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Box>
        <Typography
          level={2}
          sx={{ fontWeight: 600, fontSize: "1.1rem", color: "#12203F" }}
        >
          {coinName} Price Chart{" "}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px 15px",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 2,
              borderRadius: 1,
              p: 2,
              fontSize: ".875rem",
            }}
          >
            <Box sx={{ color: "text.secondary" }}>Change</Box>
            <Box
              sx={{
                color: "text.primary",
                fontSize: "1.2rem",
                fontWeight: "medium",
              }}
            >
              {coinHistory?.data?.change || 0}%
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 2,
              borderRadius: 1,
              p: 2,
              minWidth: 160,
              fontSize: ".875rem",
            }}
          >
            <Box sx={{ color: "text.secondary" }}>{coinName} Price</Box>
            <Box
              sx={{
                color: "text.primary",
                fontSize: "1.2rem",
                fontWeight: "medium",
              }}
            >
              ${currentPrice}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="canvasWrapper">
        <Line data={data} options={options} id={id} />
      </Box>
    </>
  );
};

export default Chart;
