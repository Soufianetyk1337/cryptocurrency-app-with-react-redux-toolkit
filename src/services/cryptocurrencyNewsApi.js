import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "9d2aa4765cmshf38a665472aa89ap110770jsn37b43fe63019",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";
const makeRequest = (url) => ({ url, headers });

export const cryptocurrencyNewsApi = createApi({
  reducerPath: "cryptocurrencyNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
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
