import React, { useEffect, useState } from "react";
import Chart from "../Chart/Chart";
import { Link, useParams } from "react-router-dom";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import millify from "millify";
import OneKPlusIcon from "@mui/icons-material/OneKPlus";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  useGetCryptocurrencyDetailsQuery,
  useGetCryptocurrencyHistoryQuery,
} from "../../services/cryptocurrencyApi";
import {
  Paper,
  Box,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
  TableCell,
  Container,
  useMediaQuery,
} from "@mui/material";
import HTMLReactParser from "html-react-parser";
import { humanize } from "../../helpers/humanize";
import { useTheme } from "@mui/system";
import CardData from "../../helpers/CardData";

const calculatePeriod = (period) => {
  const date = new Date();
  const currentDate = date.getTime();
  const newDate = date.setDate(date.getDate() - parseInt(period));
  const currentDateMinusPeriod = new Date(newDate).getTime();
  return [
    Math.trunc(currentDateMinusPeriod / 1000),
    Math.trunc(currentDate / 1000),
  ];
};

const CryptocurrencyDetail = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { coinId } = useParams();
  const [period, setPeriod] = useState("7");
  const currentDate = new Date();
  let previousDate = currentDate.setDate(currentDate.getDate() - 1);
  previousDate = Math.trunc(previousDate / 1000);
  const [fromDate, setFromDate] = useState(previousDate);
  const [toDate, setToDate] = useState(Math.trunc(new Date().getTime() / 1000));
  const { data, isFetching } = useGetCryptocurrencyDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptocurrencyHistoryQuery({
    coinId,
    fromDate,
    toDate,
  });
  useEffect(() => {
    const [fromDate, toDate] = calculatePeriod(period);
    setFromDate(fromDate);
    setToDate(toDate);
  }, [period, coinId]);

  const time = [
    {
      value: "24h",
      period: "1",
    },
    {
      value: "7d",
      period: "7",
    },
    {
      value: "30d",
      period: "30",
    },

    {
      value: "3m",
      period: "90",
    },
    {
      value: "6m",
      period: "180",
    },
    {
      value: "9m",
      period: "270",
    },
    {
      value: "1y",
      period: "365",
    },

    {
      value: "3y",
      period: "1095",
    },
    {
      value: "5y",
      period: "1825",
    },
  ];
  const stats = [
    {
      index: 0,
      title: "Price to USD",
      value: `$ ${
        data?.market_data?.current_price?.usd &&
        millify(data?.market_data?.current_price?.usd)
      }`,
      icon: <AttachMoneyOutlinedIcon />,
    },
    {
      index: 1,
      title: "Rank",
      value: data?.market_cap_rank,
      icon: <OneKPlusIcon />,
    },
    {
      index: 2,
      title: "Total Volume",
      value: `$ ${
        data?.market_data?.total_volume.usd &&
        millify(data?.market_data?.total_volume.usd)
      }`,
      icon: <BoltOutlinedIcon />,
    },
    {
      index: 3,
      title: "Market Cap",
      value: `$ ${
        data?.market_data?.market_cap.usd &&
        millify(data?.market_data?.market_cap.usd)
      }`,
      icon: <AttachMoneyOutlinedIcon />,
    },
    {
      index: 4,
      title: "Highest (daily avg.)",
      value: `$ ${
        data?.market_data?.ath?.usd ? millify(data?.market_data?.ath?.usd) : 0
      }`,
      icon: <CardGiftcardIcon />,
    },
  ];
  const genericStats = [
    {
      title: "Circulating Supply",
      value: data?.market_data?.circulating_supply
        ? data?.market_data?.circulating_supply
        : 0,
      icon: <PriorityHighOutlinedIcon />,
    },
    {
      title: "Max Supply",
      value: data?.market_data?.max_supply ? data?.market_data?.max_supply : 0,
      icon: <MoneyOutlinedIcon />,
    },

    {
      title: "Total Supply",
      value: `$ ${
        data?.market_data?.total_supply
          ? millify(data?.market_data?.total_supply)
          : 0
      }`,
      icon: <PriorityHighOutlinedIcon />,
    },
  ];
  const filteredLinks = [
    "homepage",
    "blockchain_site",
    "official_forum_url",
    "subreddit_url",
  ];
  return isFetching ? (
    <div>Fetching</div>
  ) : (
    <Container maxWidth={matches ? "lg" : "sm"}>
      <Box sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Typography
          sx={{ fontWeight: 900, fontSize: "1.5rem", color: "#12203F" }}
        >
          {data?.name} ({data?.symbol}) Price{" "}
        </Typography>
        <Typography variant="body2" sx={{ p: 1 }}>
          {data?.name} live price in US Dollar (USD). View value statistics,
          market cap and supply.{" "}
        </Typography>
      </Box>
      <Box sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <FormControl sx={{ m: 1, minWidth: 100, maxWidth: 450 }}>
          <Select
            labelId="time-chart-input"
            id="time-select"
            value={"7d"}
            label="period"
            name="time-chart-input"
            onChange={(event) => setPeriod(event.target.value)}
          >
            {time.map((timeObject, index) => {
              return (
                <MenuItem value={timeObject.value} key={timeObject.period}>
                  {timeObject.period} ({timeObject.value})
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Chart
          coinHistory={coinHistory}
          currentPrice={
            data?.market_data?.current_price?.usd
              ? millify(data?.market_data?.current_price?.usd)
              : 0
          }
          coinName={data?.name}
        />
      </Box>
      <Box
        sx={{ marginTop: "2rem", marginBottom: "2rem" }}
        id="HERE"
        className="stats-container"
      >
        <Box
          className="coin-value-statistics-heading"
          sx={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <Typography
            className="coin-details-heading"
            sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
          >
            {data?.name} Statistics
          </Typography>
          <Typography
            variant="body2"
            sx={{
              margin: "15px 10px",
            }}
          >
            An overview showing the statistics of {data?.name}, such as the base
            and quote currency, the rank, and trading volume.
          </Typography>
          {CardData(stats)}
        </Box>

        <Box
          className="other-stats-info"
          sx={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <Typography
            className="coin-details-heading"
            sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
          >
            Other Stats Info
          </Typography>
          <Typography
            variant="body2"
            sx={{
              margin: "15px 10px",
            }}
          >
            An overview showing the statistics of {data?.name}, such as the max
            and total supply of the coin.
          </Typography>

          {CardData(genericStats, "rgba(252,161,71,1)")}
        </Box>
        <Box sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            What is {data?.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              margin: "15px 10px",
            }}
          >
            {HTMLReactParser(data?.description?.en)}
          </Typography>
        </Box>
        <Box sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {data?.name} Links
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              margin: "15px 10px",
            }}
          >
            <Table sx={{ minWidth: "100%" }}>
              <TableBody sx={{ minWidth: "100%" }}>
                {Object.keys(data?.links).map((key) => {
                  if (filteredLinks.includes(key)) {
                    return (
                      <TableRow sx={{ minWidth: "100%" }} key={key}>
                        <TableCell sx={{ fontSize: 16, mt: 1 }}>
                          {humanize(key)}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#4C65FB",
                            fontSize: 22,
                          }}
                        >
                          {Array.isArray(data?.links[key]) ? (
                            data?.links[key].map(
                              (value) =>
                                value && (
                                  <>
                                    <Link
                                      to={{
                                        pathname: value,
                                      }}
                                      style={{
                                        fontWeight: "bold",
                                        color: "#4C65FB",
                                        fontSize: 16,
                                      }}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {value}
                                    </Link>
                                    <br />
                                  </>
                                )
                            )
                          ) : (
                            <Link
                              to={{
                                pathname: data?.links[key],
                              }}
                              style={{
                                fontWeight: "bold",
                                color: "#4C65FB",
                                fontSize: 16,
                              }}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {data?.links[key] || "Unknown"}
                            </Link>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return false;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default CryptocurrencyDetail;
