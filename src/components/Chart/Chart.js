import React from "react";
import { Line } from "react-chartjs-2";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const Chart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }
  console.log(coinHistory?.data?.history);
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#4C65FB",
        borderColor: "#4C65FB",
      },
    ],
    borderWidth: 1,
  };

  const options = {
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
      <Grid layout={"row"} className="chart-header">
        <Typography level={2}>{coinName} Price Chart </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px 15px",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 2,
              borderRadius: 1,
              p: 2,
              minWidth: 250,
            }}
          >
            <Box sx={{ color: "text.secondary" }}>Change</Box>
            <Box
              sx={{ color: "text.primary", fontSize: 30, fontWeight: "medium" }}
            >
              {coinHistory?.data?.change}%
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 2,
              borderRadius: 1,
              p: 2,
              minWidth: 250,
            }}
          >
            <Box sx={{ color: "text.secondary" }}>Current {coinName} Price</Box>
            <Box
              sx={{ color: "text.primary", fontSize: 30, fontWeight: "medium" }}
            >
              ${currentPrice}
            </Box>
          </Box>
        </Box>
      </Grid>
      <Line data={data} options={options} />
    </>
  );
};

export default Chart;
