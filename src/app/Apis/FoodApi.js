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
      query: () => ({
        url: "v1/vouchers/",
        method: "GET",
      }),
      providesTags: ["Voucher"],
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
