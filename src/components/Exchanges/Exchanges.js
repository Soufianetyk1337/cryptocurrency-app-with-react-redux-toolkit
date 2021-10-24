/* eslint-disable no-unused-vars */
import React from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { useGetExchangesQuery } from "../../services/cryptocurrencyApi";
import { Box, CircularProgress } from "@mui/material";

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="secondary" />
      </Box>
    );

  return (
    <>
      <Box></Box>
    </>
  );
};

export default Exchanges;
