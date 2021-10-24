import React from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { Typography, Grid, Card, CircularProgress, Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useGetCryptocurrenciesQuery } from "../../services/cryptocurrencyApi";
import { Cryptocurrencies, News } from "../index";
const Homepage = () => {
  const { data, isFetching } = useGetCryptocurrenciesQuery(10);
  const statsData = data?.data?.stats;

  return isFetching ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    <>
      <Typography sx={{ fontSize: 27, fontWeight: "bold", margin: "20px 0" }}>
        Global Cryptocurrencies Stats
      </Typography>
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ minWidth: 75 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 17 }}
                color="text.secondary"
                gutterBottom
              >
                Total Cryptocurrencies
              </Typography>
              <Typography
                sx={{ fontSize: 27, fontWeight: "bold" }}
                color="text.primary"
              >
                {millify(statsData.total)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ minWidth: 75 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 17 }}
                color="text.secondary"
                gutterBottom
              >
                Total Exchanges
              </Typography>
              <Typography
                sx={{ fontSize: 27, fontWeight: "bold" }}
                color="text.primary"
              >
                {millify(statsData.totalExchanges)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ minWidth: 75 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 17 }}
                color="text.secondary"
                gutterBottom
              >
                Total Market Cap
              </Typography>
              <Typography
                sx={{ fontSize: 27, fontWeight: "bold" }}
                color="text.primary"
              >
                {millify(statsData.totalMarketCap)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ minWidth: 75 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 17 }}
                color="text.secondary"
                gutterBottom
              >
                Total 24h Volume
              </Typography>
              <Typography
                sx={{ fontSize: 27, fontWeight: "bold" }}
                color="text.primary"
              >
                {millify(statsData.total24hVolume)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ minWidth: 75 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 17 }}
                color="text.secondary"
                gutterBottom
              >
                Total Markets
              </Typography>
              <Typography
                sx={{ fontSize: 27, fontWeight: "bold" }}
                color="text.primary"
              >
                {millify(statsData.totalMarkets)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div
        className="homepage__heading__container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <Typography
          sx={{
            fontSize: 27,
            fontWeight: "bold",
          }}
          color="text.primary"
          className="homepage__title"
        >
          10 Most Popular Cryptocurrencies in the world
        </Typography>
        <Typography
          sx={{ fontSize: 27, fontWeight: "bold" }}
          className="homepage__show__more"
          color="text.primary"
        >
          <Link to="/cryptocurrencies">Show more</Link>
        </Typography>
      </div>
      <Cryptocurrencies limit />
      <div
        className="homepage__heading__container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <Typography
          sx={{ fontSize: 27, fontWeight: "bold" }}
          color="text.primary"
          className="homepage__title"
        >
          Latest News in the Cryptocurrencies World
        </Typography>
        <Typography
          sx={{ fontSize: 27, fontWeight: "bold", margin: "10px 0" }}
          className="homepage__show__more"
          color="text.primary"
        >
          <Link to="/news">Show more</Link>
        </Typography>
      </div>
      <News limit />
    </>
  );
};

export default Homepage;
