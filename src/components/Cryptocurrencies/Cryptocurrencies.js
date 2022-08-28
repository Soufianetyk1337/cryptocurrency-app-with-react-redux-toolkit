import React, { useState, useEffect } from "react";
import millify from "millify";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useGetCryptocurrenciesQuery } from "../../services/cryptocurrencyApi";
const Cryptocurrencies = ({ limit }) => {
  const [page] = useState(1);
  const { data: cryptosList, isFetching } = useGetCryptocurrenciesQuery(
    limit ? 30 : 100,
    page
  );
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

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
    <>
      {!limit && (
        <Box className="filter__data">
          <TextField
            fullWidth
            sx={{ margin: "2rem 0 1rem" }}
            label="Search Cryptocurrency"
            id="cryptos-textfield"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      )}
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
      >
        {cryptos?.map((currency) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            xl={4}
            lg={4}
            spacing={2}
            key={currency.id}
          >
            <article>
              <Link
                to={`/cryptocurrency/${currency.id}`}
                style={{ width: "100%" }}
              >
                <Card sx={{ display: "flex", justifyContent: "space-evenly" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{}}>
                      <Typography
                        component="h6"
                        variant="h6"
                        sx={{ fontSize: "17px", lineHeight: 1 }}
                      >
                        {currency.rank}. {currency.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {millify(currency.price)}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 48,
                      height: 48,
                      objectFit: "cover",
                      margin: "16px",
                    }}
                    image={currency.iconUrl}
                    alt={`${currency.name} cryptocurrency icon`}
                  />
                </Card>
              </Link>
            </article>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Cryptocurrencies;
