/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Chart from "../Chart/Chart";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import millify from "millify";
import OneKPlusIcon from "@mui/icons-material/OneKPlus";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  useGetCryptocurrencyDetailsQuery,
  useGetCryptocurrenciesQuery,
  useGetCryptocurrencyHistoryQuery,
} from "../../services/cryptocurrencyApi";
import {
  Paper,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
  TableCell,
} from "@mui/material";
const CryptocurrencyDetail = () => {
  const { coinId } = useParams();
  const [period, setPeriod] = useState("7d");
  const { data, isFetching } = useGetCryptocurrencyDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptocurrencyHistoryQuery({
    coinId,
    period,
  });
  const cryptocurrencyDetails = data?.data?.coin;
  if (isFetching)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const stats = [
    {
      index: 0,
      title: "Price to USD",
      value: `$ ${data?.data?.coin?.price && millify(data?.data?.coin?.price)}`,
      icon: <AttachMoneyOutlinedIcon />,
    },
    {
      index: 1,
      title: "Rank",
      value: data?.data?.coin?.rank,
      icon: <OneKPlusIcon />,
    },
    {
      index: 2,
      title: "24h Volume",
      value: `$ ${
        data?.data?.coin?.volume && millify(data?.data?.coin?.volume)
      }`,
      icon: <BoltOutlinedIcon />,
    },
    {
      index: 3,
      title: "Market Cap",
      value: `$ ${
        data?.data?.coin?.marketCap && millify(data?.data?.coin?.marketCap)
      }`,
      icon: <AttachMoneyOutlinedIcon />,
    },
    {
      index: 4,
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(data?.data?.coin?.allTimeHigh?.price)}`,
      icon: <CardGiftcardIcon />,
    },
  ];
  const genericStats = [
    {
      title: "Number Of Markets",
      value: data?.data?.coin?.numberOfMarkets,
      icon: <AccountBalanceOutlinedIcon />,
    },
    {
      title: "Number Of Exchanges",
      value: data?.data?.coin?.numberOfExchanges,
      icon: <MoneyOutlinedIcon />,
    },
    {
      title: "Aprroved Supply",
      value: data?.data?.coin?.approvedSupply ? (
        <CheckOutlinedIcon />
      ) : (
        <PanToolOutlinedIcon />
      ),
      icon: <PriorityHighOutlinedIcon />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(data?.data?.coin?.totalSupply)}`,
      icon: <PriorityHighOutlinedIcon />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(data?.data?.coin?.circulatingSupply)}`,
      icon: <PriorityHighOutlinedIcon />,
    },
  ];

  return (
    <Grid className="coin-detail-container">
      <Grid item className="coin-heading-container">
        <Typography className="coin-name">
          {data?.data?.coin?.name} ({data?.data?.coin?.slug}) Price
        </Typography>
        <p>
          {data?.data?.coin?.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Grid>
      <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 450 }}>
        <Select
          labelId="time-chart-input"
          id="time-select"
          value={"7d"}
          label="period"
          onChange={(event) => setPeriod(event.target.value)}
        >
          {time.map((value, index) => (
            <MenuItem value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Chart
        coinHistory={coinHistory}
        currentPrice={millify(data?.data?.coin?.price)}
        coinName={data?.data?.coin?.name}
      />

      <Grid
        className="stats-container"
        sx={{ display: "grid", gap: 3, gridTemplateColumns: "repeat(2, 1fr)" }}
      >
        <Box className="coin-value-statistics">
          <Grid className="coin-value-statistics-heading">
            <Typography
              className="coin-details-heading"
              sx={{ fontSize: 27, fontWeight: "bold" }}
            >
              {data?.data?.coin?.name} Value Statistics
            </Typography>
            <p sx={{ margin: "15px 10px", padding: 5 }}>
              An overview showing the statistics of {data?.data?.coin?.name},
              such as the base and quote currency, the rank, and trading volume.
            </p>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }}>
              <TableBody>
                {stats.map(({ icon, title, value, index }) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontSize: 16, mt: 1 }}>{title}</TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#4C65FB",
                        fontSize: 22,
                      }}
                    >
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box className="other-stats-info">
          <Grid className="coin-value-statistics-heading">
            <Typography
              className="coin-details-heading"
              sx={{ fontSize: 27, fontWeight: "bold" }}
            >
              Other Stats Info
            </Typography>
            <p sx={{ margin: "15px 10px", padding: 5 }}>
              An overview showing the statistics of {data?.data?.coin?.name},
              such as the base and quote currency, the rank, and trading volume.
            </p>
          </Grid>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }}>
              <TableBody sx={{ minWidth: "100%" }}>
                {genericStats.map(({ icon, title, value, index }) => (
                  <TableRow sx={{ minWidth: "100%" }} key={index}>
                    <TableCell sx={{ fontSize: 16, mt: 1 }}>{title}</TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#4C65FB",
                        fontSize: 22,
                      }}
                    >
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CryptocurrencyDetail;
