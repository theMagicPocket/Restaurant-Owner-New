import { createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./RegisterApi";
import axiosBaseQuery from "../network/query";

export const DashboardApi = createApi({
  reducerPath: "DashboardApi",
  baseQuery: axiosBaseQuery({ baseURL: BASE_URL }),
  endpoints: (builder) => ({
    getStats: builder.query({
      query: (hotelId) => ({
        url: `v1/stats/hotel/${hotelId}`,
        method: "GET",
      }),
      providesTags: [{ type: "DashboardDetails" }],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetStatsQuery } = DashboardApi;
