import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../network/query";

const BASE_URL = "http://13.235.77.237:4000/";

export const RegisterRestaurantApi = createApi({
  reducerPath: "RegisterApi", // Unique identifier for the API slice
  baseQuery: axiosBaseQuery({ baseURL: BASE_URL }), // Base query function using Axios
  tagTypes: ["Hotel", "GetOwner"],
  endpoints: (builder) => ({
    postHotel: builder.mutation({
      query: (data) => ({
        url: "v1/hotels/",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Hotel", "GetOwner"],
    }),
    getByOwner: builder.query({
      query: (owner_id) => ({
        url: "v1/hotels/",
        params: {
          owner_id: owner_id,
        },
      }),
      providesTags: ["OwnerHotel"],
    }),
  }),
});

// Export the mutation hook for posting hotel data
// export const { usePostHotelMutation } = RegisterRestaurantApi;
export const { usePostHotelMutation, useGetByOwnerQuery } =
  RegisterRestaurantApi;
