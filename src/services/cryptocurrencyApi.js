import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  accept: "application/json",
  "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
  "x-cors-api-key": process.env.REACT_APP_CORS_API_KEY,
  "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
  "Access-Control-Allow-Origin": "*",
};
const baseUrl = "https://coingecko.p.rapidapi.com/";
const makeRequest = (url) => ({ url, headers });
export const cryptocurrencyApi = createApi({
  reducerPath: "cryptocurrencyApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getCryptocurrencies: build.query({
      query: ({ rowsPerPage, pageNumber, sparkLine }) =>
        sparkLine
          ? makeRequest(
              `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rowsPerPage}&page=${
                pageNumber + 1
              }&sparkline=${sparkLine}&price_change_percentage=24h%2C7d`
            )
          : makeRequest(`/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rowsPerPage}&page=${
              pageNumber + 1
            }&sparkline=${sparkLine}
        `),
    }),
    getCryptocurrencyDetails: build.query({
      query: (coinId = "bitcoin") => makeRequest(`/coins/${coinId}`),
    }),
    getCryptocurrencyHistory: build.query({
      query: ({ coinId, fromDate, toDate }) =>
        makeRequest(
          `coins/${coinId}/market_chart/range?vs_currency=usd&from=${fromDate}&to=${toDate}`
        ),
    }),

    getExchanges: build.query({
      query: ({ perPage = 10, pageNumber }) =>
        makeRequest(`/exchanges?per_page=${perPage}&page=${pageNumber + 1}`),
    }),
    getConvertRate: build.query({
      query: ({ from = "BTC", to = "ETH" }) =>
        makeRequest(
          `https://proxy.cors.sh/https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}&api_key=${process.env.REACT_APP_CRYPTOCOMPARE_API_KEY}`
        ),
    }),
  }),
});

export const {
  useGetCryptocurrenciesQuery,
  useGetCryptocurrencyDetailsQuery,
  useGetCryptocurrencyHistoryQuery,
  useGetExchangesQuery,
  useGetConvertRateQuery,
} = cryptocurrencyApi;
