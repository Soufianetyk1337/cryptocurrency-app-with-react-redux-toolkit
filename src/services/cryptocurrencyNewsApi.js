import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  "x-rapidapi-host": process.env.REACT_APP_X_RAPIDAPI_HOST,
  "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY,
};
const baseUrl = process.env.REACT_APP_NEWS_API_BASIC_URL;
const makeRequest = (url) => ({ url, headers });

export const cryptocurrencyNewsApi = createApi({
  reducerPath: "cryptocurrencyNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl, mode: "cors" }),
  endpoints: (builder) => ({
    getCryptocurrenciesNews: builder.query({
      query: ({ newsCategory, limit }) =>
        makeRequest(
          `/news?q=${
            newsCategory.length === 0 ? "cryptocurrency" : newsCategory
          }&language=en`
        ),
    }),
  }),
});

export const { useGetCryptocurrenciesNewsQuery } = cryptocurrencyNewsApi;
