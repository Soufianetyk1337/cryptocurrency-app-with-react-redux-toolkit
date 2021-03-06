import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  accept: "application/json",
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
            `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rowsPerPage}&page=${pageNumber + 1
            }&sparkline=${sparkLine}&price_change_percentage=24h%2C7d`
          )
          : makeRequest(`/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rowsPerPage}&page=${pageNumber + 1
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
      query: ({ perPage = 10, pageNumber }) =>
        makeRequest(`/exchanges?per_page=${perPage}&page=${pageNumber + 1}`),
    }),
    getConvertRate: build.query({
      query: ({ from = 'BTC', to = 'ETH' }) => makeRequest(`https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`)
    })
  }),
});

export const {
  useGetCryptocurrenciesQuery,
  useGetCryptocurrencyDetailsQuery,
  useGetCryptocurrencyHistoryQuery,
  useGetExchangesQuery,
  useGetConvertRateQuery
} = cryptocurrencyApi;
