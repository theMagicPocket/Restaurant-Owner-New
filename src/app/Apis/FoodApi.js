import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../network/query";

const BASE_URL = "https://storeapi.thefoodhunt.in/";

export const FoodApi = createApi({
  reducerPath: "FoodApi",
  tagTypes: ["FoodItem", "FoodItemById", "Order"],
  baseQuery: axiosBaseQuery({ baseURL: BASE_URL }),
  endpoints: (builder) => ({
    getFoodItems: builder.query({
      query: ({ hotelId }) => {
        const params = {
          hotel_id: hotelId,
        };
        return {
          url: "v1/fooditems/",
          params,
        };
      },

      providesTags: ["FoodItem"],

      keepUnusedDataFor: 0,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }),
    getFoodItemById: builder.query({
      query: (id) => ({
        url: `v1/fooditems/${id}`,
        method: "GET",
      }),
      providesTags: ["FoodItemById"],
    }),

    postDish: builder.mutation({
      query: (data) => ({
        url: "v1/fooditems/",
        method: "POST",
        data,
      }),
      invalidatesTags: ["FoodItem"],
    }),
    updateFoodItem: builder.mutation({
      query: ({ foodItemId, data }) => ({
        url: `v1/fooditems/${foodItemId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["FoodItem"], // Ensures the food items list is updated
    }),
    deleteFoodItem: builder.mutation({
      query: (itemId) => ({
        url: `v1/fooditems/${itemId}`,
        method: "DELETE",
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

    postVoucher: builder.mutation({
      query: (data) => ({
        url: "v1/vouchers",
        method: "POST",
        data,
      }),
    }),
    getAllVouchers: builder.query({
      query: (ids) => {
        const idsParam = ids.join(",");
        return {
          url: `v1/vouchers/ids/${idsParam}`,
          method: "GET",
        };
      },
      providesTags: ["Voucher"],
      keepUnusedDataFor: 0,
    }),

    // Get a single voucher by ID
    getVoucherById: builder.query({
      query: (voucherId) => ({
        url: `v1/vouchers/${voucherId}`,
        method: "GET",
      }),
      providesTags: ["Voucher"],
    }),

    // Update a voucher by ID
    updateVoucher: builder.mutation({
      query: ({ voucherId, data }) => ({
        url: `v1/vouchers/${voucherId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Voucher"],
    }),

    // Delete a voucher by ID
    deleteVoucher: builder.mutation({
      query: (voucherId) => ({
        url: `v1/vouchers/${voucherId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Voucher"],
    }),
  }),
});

export const {
  useGetFoodItemsQuery,
  useGetFoodItemByIdQuery,
  usePostDishMutation,
  useUpdateFoodItemMutation,
  useDeleteFoodItemMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  usePostVoucherMutation,
  useGetAllVouchersQuery,
  useGetVoucherByIdQuery,
  useUpdateVoucherMutation,
  useDeleteVoucherMutation,
} = FoodApi;
