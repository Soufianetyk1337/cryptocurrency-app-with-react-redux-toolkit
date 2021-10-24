import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  accept: "application/json",
  // "x-rapidapi-host": "coingecko.p.rapidapi.com",
  // "x-rapidapi-key": "9d2aa4765cmshf38a665472aa89ap110770jsn37b43fe63019",
  // "x-access-token": process.env.REACT_APP_COINRANKING_API_KEY,
};
const baseUrl = "https://api.coingecko.com/api/v3/";
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
      query: (coinId) => makeRequest(`/coin/${coinId}`),
    }),
    getCryptocurrencyHistory: build.query({
      query: ({ coinId, period }) =>
        makeRequest(`coin/${coinId}/history/${period}`),
    }),
    getExchanges: build.query({
      query: () => makeRequest(`exchanges`),
    }),
  }),
});

export const {
  useGetCryptocurrenciesQuery,
  useGetCryptocurrencyDetailsQuery,
  useGetCryptocurrencyHistoryQuery,
  useGetExchangesQuery,
} = cryptocurrencyApi;
