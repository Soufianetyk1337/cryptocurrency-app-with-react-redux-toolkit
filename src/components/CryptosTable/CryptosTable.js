import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  TablePagination,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetCryptocurrenciesQuery } from "../../services/cryptocurrencyApi";
import TableChart from "../TableChart/TableChart";
import moneyFormatter from "money-formatter";
import { UilArrowDown, UilArrowUp } from "@iconscout/react-unicons";
import millify from "millify";
import { isPositive } from "../../helpers/isPositive";
import CryptosTablePaginationActions from "./CryptosTablePaginationActions";
const CryptosTable = ({ limit }) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [cryptos, setCryptos] = useState([]);

  const {
    data: cryptosList,
    isFetching,
    refetch,
  } = useGetCryptocurrenciesQuery({
    rowsPerPage: limit ? 10 : rowsPerPage,
    pageNumber,
    sparkLine: true,
  });
  useEffect(() => {
    const filteredData = cryptosList?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  useEffect(() => {
    refetch();
  }, [refetch, pageNumber, rowsPerPage, dispatch]);
  const TableCellStyles = {
    flex: "1 1 0%",
    fontWeight: "700",
    borderTopWidth: "1px",
    borderBottomWidth: "1px",
    padding: "1.5rem 1rem",
    borderColor: "rgb(229, 235, 240)",
    color: "rgb(18, 32, 63)",
  };
  const TableDataStyles = {
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    padding: "0.5rem 1rem",
  };

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };
  return isFetching ? (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    <section className="section cryptos" id="cryptos">
      <div
        style={{
          display: "flex",
          boxPack: "justify",
          justifyContent: "space-between",
          boxAlign: "center",
          alignItems: "center",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        <h5
          style={{
            color: "rgba(18,32,63)",
            fontWeight: "700",
            fontSize: "1.25rem",
            lineHeight: "24px",
          }}
        >
          Top 10 Cryptos
        </h5>
        {limit && (
          <Link
            to="/cryptocurrencies"
            style={{
              fontSize: "1.125rem",
              lineHeight: "1.25rem",
              textDecoration: "underline",
              textOpacity: 1,
            }}
          >
            View All Cryptocurrencies
          </Link>
        )}
      </div>

      {!limit && (
        <div className="filter__data">
          <TextField
            fullWidth
            label="Search Cryptocurrency By Name"
            id="fullWidth"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, marginTop: "2rem", overflow: "hidden" }}
          aria-label="cryptos table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" style={TableCellStyles}>
                #
              </TableCell>
              <TableCell align="left" style={TableCellStyles}>
                Name
              </TableCell>
              <TableCell align="left" style={TableCellStyles}>
                Price
              </TableCell>
              <TableCell align="left" style={TableCellStyles}>
                24h %
              </TableCell>
              <TableCell align="left" style={TableCellStyles}>
                7d %
              </TableCell>
              <TableCell align="left" style={TableCellStyles}>
                Market Cap
              </TableCell>
              <TableCell align="left" style={TableCellStyles}>
                Last Week
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptos?.map((coin) => (
              <TableRow
                key={coin.market_cap_rank}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={TableDataStyles} component="th" scope="row">
                  {coin.market_cap_rank}
                </TableCell>
                <TableCell style={TableDataStyles} align="left">
                  <div
                    style={{
                      boxAlign: "center",
                      alignItems: "center",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        maxWidth: "100%",
                        overflow: "hidden",
                        position: "relative",
                        boxSizing: "border-box",
                        margin: "0px",
                      }}
                    >
                      <div
                        style={{
                          boxSizing: "border-box",
                          display: "block",
                          maxWidth: "100%",
                        }}
                      >
                        <img
                          style={{
                            inset: "0px",
                            boxSizing: "border-box",
                            padding: "0px",
                            border: "none",
                            margin: "auto",
                            display: "block",
                            minWidth: "100%",
                            maxWidth: "100%",
                            minHeight: "100%",
                            maxHeight: "100%",
                            height: "1.625rem",
                            width: "1.625rem",
                          }}
                          alt="Bitcoin "
                          src={coin.image}
                        ></img>
                      </div>
                    </div>
                    <p
                      style={{
                        lineHeight: "1.25rem",
                        color: "rgb(18, 32, 63)",
                        fontWeight: "700",
                        marginLeft: ".5rem",
                      }}
                    >
                      {coin.name}
                    </p>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: "21px",
                        color: "rgb(151, 160, 181)",
                        textTransform: "uppercase",
                        marginLeft: ".5rem",
                      }}
                    >
                      {coin?.symbol}
                    </p>
                  </div>
                </TableCell>
                <TableCell style={TableDataStyles} align="left">
                  <p
                    style={{
                      lineHeight: "1.25rem",
                      color: "rgb(18, 32, 63)",
                      fontWeight: "700",
                    }}
                  >
                    {moneyFormatter.format("USD", coin.current_price)}
                  </p>
                </TableCell>
                <TableCell style={TableDataStyles} align="left">
                  <div
                    style={{
                      boxAlign: "center",
                      alignItems: "center",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    {isPositive(
                      coin.price_change_percentage_24h_in_currency
                    ) ? (
                      <UilArrowUp color="green" />
                    ) : (
                      <UilArrowDown color="red" />
                    )}

                    <p
                      style={{
                        lineHeight: "1.25rem",
                        fontWeight: "700",
                        color: `${
                          isPositive(
                            coin.price_change_percentage_24h_in_currency
                          )
                            ? "green"
                            : "red"
                        }`,
                      }}
                    >
                      {moneyFormatter.format(
                        "",
                        coin.price_change_percentage_24h_in_currency,
                        2,
                        true
                      )}
                    </p>
                  </div>
                </TableCell>
                <TableCell style={TableDataStyles} align="left">
                  <div
                    style={{
                      boxAlign: "center",
                      alignItems: "center",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    {isPositive(coin.price_change_percentage_7d_in_currency) ? (
                      <UilArrowUp color="green" />
                    ) : (
                      <UilArrowDown color="red" />
                    )}

                    <p
                      style={{
                        lineHeight: "1.25rem",
                        fontWeight: "700",
                        color: `${
                          isPositive(
                            coin.price_change_percentage_7d_in_currency
                          )
                            ? "green"
                            : "red"
                        }`,
                      }}
                    >
                      {moneyFormatter.format(
                        "",
                        coin.price_change_percentage_7d_in_currency,
                        2,
                        true
                      )}
                    </p>
                  </div>
                </TableCell>
                <TableCell style={TableDataStyles} align="center">
                  <p
                    style={{
                      lineHeight: "1.25rem",
                      color: "rgb(18, 32, 63)",
                      fontWeight: "700",
                    }}
                  >
                    {millify(coin.market_cap)}
                  </p>
                </TableCell>
                <TableCell style={TableDataStyles}>
                  <div style={{ width: "150px", height: "50px" }}>
                    <TableChart
                      history={coin?.sparkline_in_7d?.price}
                      color={`${
                        isPositive(coin.price_change_percentage_7d_in_currency)
                          ? "green"
                          : "red"
                      }`}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!limit && (
        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={500}
          rowsPerPage={rowsPerPage}
          page={pageNumber}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={CryptosTablePaginationActions}
        />
      )}
    </section>
  );
};

export default CryptosTable;
