import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Avatar,
} from "@mui/material";
import {
  useGetConvertRateQuery,
  useGetCryptocurrenciesQuery,
} from "../../services/cryptocurrencyApi";
const Converter = () => {
  const [fromCoin, setFromCoin] = useState("BTC");
  const [toCoin, setToCoin] = useState("ETH");
  const [amount, setAmount] = useState("0");

  const { data, isFetching } = useGetConvertRateQuery({
    from: fromCoin,
    to: toCoin,
  });
  console.log("data", data);
  const { data: cryptosList } = useGetCryptocurrenciesQuery({
    rowsPerPage: 100,
    pageNumber: 0,
    sparkLine: false,
  });
  console.log("cryptosList", cryptosList);
  return isFetching ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        backgroundColor: "#F5FAFD",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        borderWidth: "4px",
        borderColor: "rgba(255,255,255,1)",
        width: "100%",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "3rem",
        backdropFilter: "blur(50px)",
        borderRadius: "1.5rem",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.125rem",
          lineHeight: "21.6px",
          textAlign: "left",
          marginTop: "1rem",
          color: "#6D6A7C",
        }}
      >
        Cryptocurrency Converter Calculator
      </Typography>
      <Box
        className="Hero__Flex-sc-1f9rvhr-11"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "1.75rem",
          marginBottom: "1.75rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            boxAlign: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            component="div"
            sx={{
              position: "relative !important",
              width: "100%",
            }}
          >
            <input
              type="text"
              placeholder="0"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              style={{
                width: "100%",
                borderTopLeftRadius: "0.5rem",
                borderBottomLeftRadius: "0.5rem",
                padding: "1.25rem",
                borderWidth: "1px",
                borderStyle: "none",
                borderColor: "rgba(255,255,255,.5)",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
                lineHeight: "22px",
                color: "rgb(151, 160, 181)",
                borderLeftwidth: "1px",
                borderVolor: "rgb(229, 235, 240)",
                paddingLeft: "1.5rem",
                paddingRight: "0.75rem",
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                textTransform: "uppercase",
              }}
            >
              {fromCoin}
            </span>
          </Box>
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              width: "50%",
            }}
          >
            <Select
              value={fromCoin.toLowerCase() || ""}
              sx={{
                display: "inline-flex",
                fontSize: "0.875rem",
                lineHeight: "21px",
                backgroundColor: " rgba(255,255,255,1)",
                boxAlign: "center",
                alignItems: "center",
                borderTopRightRadius: " 0.5rem",
                borderBottomRightRadius: " 0.5rem",
                boxPack: "center",
                justifyContent: "center",
                textTransform: "uppercase",
                borderColor: "rgba(255,255,255,.5)",
                width: "100%",
                padding: ".35rem",
              }}
              label="Convert from coin"
              onChange={(event) => setFromCoin(event.target.value)}
            >
              {cryptosList?.map((coin) => (
                <MenuItem
                  key={coin?.name}
                  value={coin?.symbol}
                  style={{ display: "flex" }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Avatar
                      height="1.5rem"
                      width="1.5rem"
                      sx={{
                        height: "1.5rem",
                        width: "1.5rem",
                        marginRight: ".5rem",
                      }}
                      alt={`${coin?.name} icon`}
                      src={coin?.image}
                    />
                    <span style={{ textTransform: "uppercase" }}>
                      {coin?.symbol}
                    </span>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box
          className="Hero__Flex-sc-1f9rvhr-11"
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1.75rem",
            marginBottom: "1.75rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              boxAlign: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              className="Hero___StyledDiv-sc-1f9rvhr-26 kgSMKp"
              style={{
                position: "relative",
                width: " 100%",
              }}
            >
              <input
                type="text"
                placeholder="0"
                disabled={true}
                value={amount * data?.[toCoin.toUpperCase()] || 0}
                style={{
                  width: "100%",
                  borderTopLeftRadius: "0.5rem",
                  borderBottomLeftRadius: "0.5rem",
                  padding: "1.25rem",
                  borderWidth: "1px",
                  borderStyle: "none",
                  borderColor: "rgba(255,255,255,.5)",
                }}
              />
              <span
                style={{
                  fontSize: "1rem",
                  lineHeight: "22px",
                  color: "rgb(151, 160, 181)",
                  borderLeftwidth: "1px",
                  borderVolor: "rgb(229, 235, 240)",
                  paddingLeft: "1.5rem",
                  paddingRight: "0.75rem",
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  textTransform: "uppercase",
                }}
              >
                {toCoin}
              </span>
            </Box>
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                width: "50%",
              }}
            >
              <Select
                value={toCoin.toLowerCase() || ""}
                sx={{
                  display: "inline-flex",
                  fontSize: "0.875rem",
                  lineHeight: "21px",
                  backgroundColor: " rgba(255,255,255,1)",
                  boxAlign: "center",
                  alignItems: "center",
                  borderTopRightRadius: " 0.5rem",
                  borderBottomRightRadius: " 0.5rem",
                  boxPack: "center",
                  justifyContent: "center",
                  textTransform: "uppercase",
                  borderColor: "rgba(255,255,255,.5)",
                  width: "100%",
                  padding: ".35rem",
                }}
                label="convert to coin"
                onChange={(event) => setToCoin(event.target.value)}
              >
                {cryptosList?.map((coin) => (
                  <MenuItem key={coin?.name} value={coin?.symbol}>
                    <Box sx={{ display: "flex" }}>
                      <Avatar
                        height="1.5rem"
                        width="1.5rem"
                        sx={{
                          height: " 1.5rem",
                          width: " 1.5rem",
                          marginRight: ".5rem",
                        }}
                        alt={`${coin?.name} icon`}
                        src={coin?.image}
                      />
                      <Typography
                        variant="body2"
                        sx={{ textTransform: "uppercase" }}
                      >
                        {coin?.symbol}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "auto",
              marginRight: "auto",
              minWidth: "min-content",
              textAlign: "center",
              padding: "1rem 0",
            }}
          >
            <Typography
              className="TextBody-egwvvu-0 Hero___StyledTextBody3-sc-1f9rvhr-49 cmOKit dNnLnF"
              sx={{
                lineHeight: " 1.25rem",
                fontWeight: 600,
                display: "block",
              }}
            >
              Convert Result:
            </Typography>
            <p
              className="TextBody-egwvvu-0 Hero___StyledTextBody4-sc-1f9rvhr-50 cCBmWh eobqda"
              sx={{
                color: "rgba(12,97,247,1)",
                lineHeight: "1.25rem",
                fonWeight: 600,
                textTransform: "uppercase",
                display: "block",
              }}
            >
              <span>{amount}</span>
              {fromCoin.toUpperCase()} ={" "}
              <span>{amount * data?.[toCoin.toUpperCase()]} </span> {toCoin}
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Converter;
