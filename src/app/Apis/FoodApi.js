import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../network/query";

const BASE_URL = "http://13.235.77.237:4000/";

export const FoodApi = createApi({
  reducerPath: "FoodApi",
  tagTypes: ["FoodItem", "FoodItemById", "Order"],
  baseQuery: axiosBaseQuery({ baseURL: BASE_URL }),
  endpoints: (builder) => ({
    getFoodItems: builder.query({
      query: () => ({
        url: "v1/fooditems/",
      }),
      providesTags: ["FoodItem"],
    }),
    postDish: builder.mutation({
      query: (data) => ({
        url: "v1/fooditems/",
        method: "POST",
        data,
      }),
      invalidatesTags: ["FoodItem"],
    }),
    getOrders: builder.query({
      query: ({ orderStatus, hotelId }) => {
        const params = {
          order_status: orderStatus,
          hotel_id: hotelId,
        };

        return {
          url: "/v1/orders/",
          method: "GET",
          params,
        };
      },
      providesTags: ["Order"],
      keepUnusedDataFor: 0,
      refetchOnFocus: true, // Refetch on window focus
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, orderStatus }) => ({
        url: `/v1/orders/${orderId}`,
        method: "PATCH", // or PATCH based on the API requirement
        data: { order_status: orderStatus },
      }),
      invalidatesTags: ["Order"], // This ensures the orders list is updated
    }),
  }),
});

export const {
  useGetFoodItemsQuery,
  usePostDishMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} = FoodApi;
