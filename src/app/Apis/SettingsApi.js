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
      query: (bankId) => ({
        url: `v1/bankaccountdetails/${bankId}`,
        method: "GET",
      }),
      providesTags: [{ type: "BankDetails" }],
    }),
  }),
});


export const { usePostBankDetailsMutation, useGetBankDetailsQuery } = SettingsApi
