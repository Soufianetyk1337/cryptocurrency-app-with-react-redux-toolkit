/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useGetCryptocurrenciesNewsQuery } from "../../services/cryptocurrencyNewsApi";

import {
  CircularProgress,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Grid,
  Link,
  TextField,
  Autocomplete,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Container,
} from "@mui/material";
import moment from "moment";
import { useGetCryptocurrenciesQuery } from "../../services/cryptocurrencyApi";

const News = ({ limit }) => {
  const [newsCategory, setNewsCategory] = useState("");
  const { data: cryptocurrenciesNews, isFetching } =
    useGetCryptocurrenciesNewsQuery({
      newsCategory,
      limit: limit ? 6 : 12,
    });
  const { data: cryptosList } = useGetCryptocurrenciesQuery({
    rowsPerPage: 100,
    pageNumber: 0,
    sparkLine: false,
  });
  const altImage =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftotalcrypto.io%2Fwp-content%2Fuploads%2F2020%2F03%2Fshutterstock_703031944-740x492.jpg&f=1&nofb=1";

  const section = {
    height: "100%",
    paddingTop: 2,
  };
  const summary = {
    marginTop: 15,
    marginBottom: 15,
    border: "1px solid black",
    backgroundColor: "#d4d4d4",
  };
  console.log(cryptocurrenciesNews);
  return isFetching ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    <section className="section news" id="news">
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
          Cryptocurrecy News
        </h5>
        {limit && (
          <RouterLink
            to="/news"
            style={{
              fontSize: "1.125rem",
              lineHeight: "1.25rem",
              textDecoration: "underline",
              textOpacity: 1,
            }}
          >
            View All News
          </RouterLink>
        )}
      </div>
      <Box
        className="news__conatainer container grid"
        sx={{
          padding: "15px",
        }}
      >
        {!limit && (
          <FormControl fullWidth>
            <InputLabel id="coin-name-select-label">Coin</InputLabel>
            <Select
              labelId="coin-name-select-label"
              id="coin-name-select"
              value={newsCategory}
              label="Coin"
              onChange={(event) => setNewsCategory(event.target.value)}
            >
              {cryptosList?.map((coin) => (
                <MenuItem value={coin.name} key={coin.name}>
                  {coin.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Grid container spacing={2}>
          {cryptocurrenciesNews.value.map((news, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4} xl={4}>
              <article
                key={index}
                className="post__card"
                style={{
                  display: "flex",
                  height: "100%",
                  flexDirection: "column",
                  wordWrap: "break-word",
                  position: "relative",
                  width: "100%",
                }}
              >
                <div
                  className="image__container"
                  style={{
                    height: "200px",
                    width: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      (news?.image?.thumbnail?.contentUrl &&
                        `${news?.image?.thumbnail?.contentUrl}
                  &w=${news?.image?.thumbnail?.width}
                   &h=${news?.image?.thumbnail?.height}`) ||
                      altImage
                    }
                    alt={news?.name}
                    style={{
                      objectFit: "cover",
                      verticalAlign: "center",
                      maxWidth: "100%",
                      width: "100%",
                      height: "100%",
                      imageRendering: "crisp-edges",
                    }}
                  />
                </div>
                <Link
                  href={news.url}
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    ":hover": {
                      border: "3px solid #8B84FE",
                    },
                  }}
                ></Link>
                <div
                  className="post__body"
                  style={{
                    padding: "1.1em",
                    display: "flex",
                    flexDirection: "column",
                    flex: "1 1 auto",
                    wordBreak: "break-all",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h5"
                    sx={{
                      fontSize: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {`${news?.name?.substring(0, 60)}...`}
                  </Typography>
                  <div
                    className="post__card__content"
                    style={{
                      flex: "1 1 auto",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="p"
                      component="p"
                      sx={{
                        fontSize: "0.875rem",
                        lineHeight: "21px",
                        color: "rgb(151, 160, 181)",
                      }}
                    >
                      {`${news?.description?.substring(0, 100)}...`}
                    </Typography>
                  </div>
                  <div
                    className="post__card__footer"
                    style={{
                      flex: "1 1 auto",
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <CardActions
                        sx={{
                          display: "flex",
                          my: "10px",
                          mx: 0,
                          justifyContent: "space-between",
                          padding: "5px",
                        }}
                      >
                        <Avatar
                          src={news.provider[0]?.image?.thumbnail?.contentUrl}
                          sx={{ maxWidth: 48, maxHeight: 48 }}
                          aria-label={`News Provided By${news.provider[0]?.name}`}
                        ></Avatar>
                        <Box sx={{ ml: 2 }}>
                          <Typography
                            gutterBottom
                            variant="subtitle2"
                            component="p"
                          >
                            {news.provider[0]?.name}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="subtitle2"
                            component="p"
                            color="textSecondary"
                          >
                            {moment(news?.datePublished)
                              .startOf("ss")
                              .fromNow()}
                          </Typography>
                        </Box>
                      </CardActions>
                    </Box>
                  </div>
                </div>
              </article>
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
};

export default News;
