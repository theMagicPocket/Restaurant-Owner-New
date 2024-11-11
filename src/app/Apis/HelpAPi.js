import { createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./RegisterApi";
import axiosBaseQuery from "../network/query";

export const HelpApi = createApi({
  reducerPath: "HelpApi",
  baseQuery: axiosBaseQuery({ baseURL: BASE_URL }),
  endpoints: (builder) => ({
    postHelp: builder.mutation({
      query: (data) => ({
        url: "v1/helprequests",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { usePostHelpMutation } = HelpApi;

// import { createApi } from "@reduxjs/toolkit/query/react";
// import axiosBaseQuery from "../network/query";

// export const BASE_URL = "https://storeapi.thefoodhunt.in/";

// export const RegisterRestaurantApi = createApi({
//   reducerPath: "RegisterApi", // Unique identifier for the API slice
//   baseQuery: axiosBaseQuery({ baseURL: BASE_URL }), // Base query function using Axios
//   tagTypes: ["Hotel", "GetOwner"],
//   endpoints: (builder) => ({
//     postHotel: builder.mutation({
//       query: (data) => ({
//         url: "v1/hotels/",
//         method: "POST",
//         data,
//       }),
//       invalidatesTags: ["Hotel"],
//     }),
//     getByOwner: builder.query({
//       query: (owner_id) => ({
//         url: "v1/hotels/",
//         method: "GET",
//         params: {
//           owner_id: owner_id,
//         },
//       }),
//       providesTags: ["Hotel"],
//     }),
//   }),
// });

// // Export the mutation hook for posting hotel data
// // export const { usePostHotelMutation } = RegisterRestaurantApi;
// export const { usePostHotelMutation, useGetByOwnerQuery } =
//   RegisterRestaurantApi;
