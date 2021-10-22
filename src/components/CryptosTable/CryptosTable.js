/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetCryptocurrenciesQuery } from "../../services/cryptocurrencyApi";
import TableChart from "../TableChart/TableChart";
import moneyFormatter from "money-formatter";
import { UilArrowDown, UilArrowUp } from "@iconscout/react-unicons";
import millify from "millify";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import LastPageIcon from "@mui/icons-material/LastPage";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { cryptocurrencyApi } from "../../services/cryptocurrencyApi";
import { isPositive } from "../../helpers/isPositive";
// Table Pagination Actions
const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange, setPageNumber } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

const CryptosTable = ({ limit }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [cryptos, setCryptos] = useState([]);
  const {
    data: cryptosList,
    isFetching,
    refetch,
  } = useGetCryptocurrenciesQuery({ rowsPerPage, pageNumber });
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

  if (isFetching) return <h1>Loading</h1>;
  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  return (
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
        <a
          href="/cryptos"
          style={{
            fontSize: "1.125rem",
            lineHeight: "1.25rem",
            textDecoration: "underline",
            textOpacity: 1,
          }}
        >
          View All Cryptocurrencies
        </a>
      </div>
      <div className="filter__data">
        <TextField
          fullWidth
          label="Search Cryptocurrency By Name"
          id="fullWidth"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={500}
        rowsPerPage={rowsPerPage}
        page={pageNumber}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />

      <h1>{pageNumber}</h1>
      <h1>{rowsPerPage}</h1>
    </section>
  );
};

export default CryptosTable;
