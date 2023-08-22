import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const headers = {
//   "x-rapidapi-host": process.env.REACT_APP_X_RAPIDAPI_HOST,
//   "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY,
// };

const headers = {
  "x-bingapis-sdk": process.env.REACT_APP_X_BINGAPIS_SDK,
  "x-rapidapi-host": process.env.REACT_APP_X_RAPID_HOST,
  "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY,
};
const baseUrl = "https://bing-news-search1.p.rapidapi.com";
const makeRequest = (url) => ({ url, headers });

export const cryptocurrencyNewsApi = createApi({
  reducerPath: "cryptocurrencyNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl, mode: "cors" }),
  endpoints: (builder) => ({
    getCryptocurrenciesNews: builder.query({
      query: ({ newsCategory, limit }) =>
        makeRequest(
          `/news/search?q=${
            newsCategory.length === 0 ? "Cryptocurrency" : newsCategory
          }&safeSearch=Off&textFormat=Raw&freshness=Day&count=${limit}`
        ),
    }),
  }),
});

export const { useGetCryptocurrenciesNewsQuery } = cryptocurrencyNewsApi;
