import axiosBaseQuery from "../network/query";
import { BASE_URL } from "./RegisterApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const SettingsApi = createApi({
  baseQuery: axiosBaseQuery({ baseURL: BASE_URL }),
  keepUnusedDataFor: 0,
  tagTypes: ["BankDetails"],
  endpoints: (builder) => ({
    postBankDetails: builder.mutation({
      query: (data) => ({
        url: "v1/bankaccountdetails",
        method: "POST",
        data,
      }),
      invalidatesTags: [{ type: "BankDetails" }],
    }),
    getBankDetails: builder.query({
      query: (hotelId) => ({
        url: `v1/bankaccountdetails/relatedid/${hotelId}`,
        method: "GET",
      }),
      providesTags: [{ type: "BankDetails" }],
    }),
    updateBankDetails: builder.mutation({
      query: ({ bankId, data }) => ({
        url: `v1/bankaccountdetails/${bankId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [{ type: "BankDetails" }],
    }),
  }),
});

export const {
  usePostBankDetailsMutation,
  useGetBankDetailsQuery,
  useUpdateBankDetailsMutation,
} = SettingsApi;
