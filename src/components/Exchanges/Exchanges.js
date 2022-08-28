import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  Box,
  TablePagination,
  TextField,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Skeleton,
} from "@mui/material";
import moneyFormatter from "money-formatter";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useGetExchangesQuery } from "../../services/cryptocurrencyApi";
import { circularProgressColor } from "../../helpers/circularProgressColor";
import CryptosTablePaginationActions from "../CryptosTable/CryptosTablePaginationActions";

const TableCellStyles = {
  flex: "1 1 0%",
  fontWeight: "700",
  borderTopWidth: "1px",
  borderBottomWidth: "1px",
  borderColor: "rgb(229, 235, 240)",
  color: "rgb(18, 32, 63)",
};
const TableDataStyles = {
  whiteSpace: "nowrap",
  verticalAlign: "middle",
};

const Exchanges = ({ limit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: exchangesData, isFetching } = useGetExchangesQuery({
    perPage: limit ? 5 : rowsPerPage,
    pageNumber,
  });
  const [exchanges, setExchanges] = useState(exchangesData);
  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };
  useEffect(() => {
    const filteredData = exchangesData?.filter((exchange) =>
      exchange?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setExchanges(filteredData);
  }, [searchTerm, exchangesData]);
  return (
    <section className="section cryptos" id="cryptos">
      <Box
        sx={{
          display: "flex",
          boxPack: "justify",
          justifyContent: "space-between",
          boxAlign: "center",
          alignItems: "center",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        <Typography
          variant="h5"
          component="h5"
          sx={{
            color: "rgba(18,32,63)",
            fontWeight: "700",
            fontSize: "1.25rem",
            lineHeight: "24px",
          }}
        >
          Top Cryptocurrency Exchanges
        </Typography>
        {limit && (
          <Link
            to="/exchanges"
            style={{
              fontSize: "1.125rem",
              lineHeight: "1.25rem",
              textDecoration: "underline",
              textOpacity: 1,
            }}
          >
            View All Exchanges
          </Link>
        )}
      </Box>

      {!limit && (
        <Box className="filter__data" sx={{ marginBottom: "2rem" }}>
          <TextField
            sx={{ margin: "2rem 0 1rem" }}
            fullWidth
            label="Search Exchanges By Name"
            id="exchange-textfield"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      )}
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          overflow: "auto",
          overflowY: "hidden",
          marginTop: "2rem",
        }}
      >
        <Table
          sx={{
            minWidth: "700px",
          }}
          aria-label="cryptos table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" style={TableCellStyles}>
                #
              </TableCell>
              <TableCell align="left" style={TableCellStyles}>
                Exchange
              </TableCell>
              <TableCell align="left" style={TableCellStyles}>
                Trust Score
              </TableCell>
              <TableCell align="left" style={TableCellStyles}>
                24h Volume
              </TableCell>
              <TableCell align="left" style={TableCellStyles}>
                Country
              </TableCell>
              <TableCell align="left" style={TableCellStyles}>
                Year Established
              </TableCell>
              <TableCell align="left" style={TableCellStyles}>
                Trading Incentive
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching &&
              [...Array(10)].map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))}
            {exchanges &&
              exchanges?.map((exchange) => (
                <TableRow
                  key={exchange.trust_score_rank}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={TableDataStyles} component="th" scope="row">
                    {exchange.trust_score_rank}
                  </TableCell>
                  <TableCell style={TableDataStyles} align="left">
                    <Box
                      sx={{
                        boxAlign: "center",
                        alignItems: "center",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "inline-block",
                          maxWidth: "100%",
                          overflow: "hidden",
                          position: "relative",
                          boxSizing: "border-box",
                          margin: "0px",
                        }}
                      >
                        <Box
                          sx={{
                            boxSizing: "border-box",
                            display: "block",
                            maxWidth: "100%",
                          }}
                        >
                          <Avatar
                            height="1.625rem"
                            width="1.625rem"
                            sx={{
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
                            alt={`${exchange?.name} logo`}
                            src={exchange?.image}
                          />
                        </Box>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: "1.25rem",
                          color: "rgb(18, 32, 63)",
                          fontWeight: "700",
                          marginLeft: ".5rem",
                        }}
                      >
                        {exchange?.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ width: "2rem", height: "2rem" }}
                  >
                    <CircularProgressbar
                      styles={buildStyles({
                        strokeLinecap: "butt",
                        textSize: "2.2rem",
                        textAlign: "center",
                        pathColor: `${circularProgressColor(
                          exchange.trust_score
                        )}`,
                        textcolor: "rgb(18, 32, 63)",
                        fontWeight: "600",
                      })}
                      strokeWidth={10}
                      maxValue={10}
                      value={exchange.trust_score}
                      text={`${exchange.trust_score}`}
                    />
                  </TableCell>
                  <TableCell
                    style={{
                      lineHeight: "1.25rem",
                      color: "rgb(18, 32, 63)",
                      fontWeight: "700",
                    }}
                  >
                    {moneyFormatter.format(
                      "USD",
                      exchange.trade_volume_24h_btc
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      lineHeight: "1.25rem",
                      color: "rgb(18, 32, 63)",
                      fontWeight: "700",
                    }}
                  >
                    {exchange.country || "Unknown"}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      lineHeight: "1.25rem",
                      color: "rgb(18, 32, 63)",
                      fontWeight: "700",
                    }}
                  >
                    {exchange.year_established || "Unknown"}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      lineHeight: "1.25rem",
                      color: "rgb(18, 32, 63)",
                      fontWeight: "700",
                    }}
                  >
                    {exchange.has_trading_incentive === true ? "Yes" : "No"}
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
          count={250}
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

export default Exchanges;
