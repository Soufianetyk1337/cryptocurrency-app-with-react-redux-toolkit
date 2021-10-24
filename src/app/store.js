import { configureStore } from "@reduxjs/toolkit";
import { cryptocurrencyApi } from "../services/cryptocurrencyApi";
import { cryptocurrencyNewsApi } from "../services/cryptocurrencyNewsApi";

export default configureStore({
  reducer: {
    [cryptocurrencyApi.reducerPath]: cryptocurrencyApi.reducer,
    [cryptocurrencyNewsApi.reducerPath]: cryptocurrencyNewsApi.reducer,
  },
});
