import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useGetCryptocurrenciesNewsQuery } from "../../services/cryptocurrencyNewsApi";
import cryptoNewsAltImage from "../../static/images/cryptoNewsAltImage.jpg";
import {
  CircularProgress,
  Box,
  CardMedia,
  CardActions,
  Avatar,
  Typography,
  Grid,
  Link,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
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

  const section = {
    height: "100%",
    paddingTop: 2,
  };
  const newsDataSize = limit ? 6 : cryptocurrenciesNews?.results?.length;
  const cryptocurrenciesNewsShort = cryptocurrenciesNews?.results.slice(
    0,
    newsDataSize
  );
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
    <section className="section news" id="news">
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
          Cryptocurrecy News
        </Typography>
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
      </Box>
      <Box
        className="news__conatainer container grid"
        sx={{
          padding: "0 15px",
          marginTop: "2rem",
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
          {cryptocurrenciesNewsShort.map((news, index) => (
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
                <Box
                  className="image__container"
                  sx={{
                    height: "200px",
                    width: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      (news?.image_url &&
                        `${news?.image_url}
                  `) ||
                      cryptoNewsAltImage
                    }
                    alt={news?.title}
                    style={{
                      objectFit: "cover",
                      verticalAlign: "center",
                      maxWidth: "100%",
                      width: "100%",
                      height: "100%",
                      imageRendering: "crisp-edges",
                    }}
                  />
                </Box>
                <Link
                  href={news?.link}
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    ":hover": {
                      border: "1px solid #8B84FE",
                    },
                  }}
                ></Link>
                <Box
                  className="post__body"
                  sx={{
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
                    {`${news?.title?.substring(0, 60)}...`}
                  </Typography>
                  <Box
                    className="post__card__content"
                    sx={{
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
                  </Box>
                  <Box
                    className="post__card__footer"
                    sx={{
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
                          maxWidth="48"
                          maxheight="48"
                          src={cryptoNewsAltImage}
                          sx={{ maxWidth: 48, maxHeight: 48 }}
                          alt={news.source_id}
                          aria-label={`News Provided By${news?.source_id}`}
                        />

                        <Box sx={{ ml: 2 }}>
                          <Typography
                            gutterBottom
                            variant="subtitle2"
                            component="p"
                          >
                            {news.source_id}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="subtitle2"
                            component="p"
                            color="textSecondary"
                          >
                            {moment(news?.pubDate).startOf("ss").fromNow()}
                          </Typography>
                        </Box>
                      </CardActions>
                    </Box>
                  </Box>
                </Box>
              </article>
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
};

export default News;
