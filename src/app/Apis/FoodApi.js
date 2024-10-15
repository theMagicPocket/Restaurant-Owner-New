import { createApi } from '@reduxjs/toolkit/query/react'; 
import axiosBaseQuery from '../network/query';

const BASE_URL = 'http://13.235.77.237:4000/';

export const FoodApi = createApi({
    reducerPath: 'FoodApi', 
    tagTypes: ['FoodItem', 'FoodItemById'],
    baseQuery: axiosBaseQuery({ baseURL: BASE_URL }), 
    endpoints: (builder) => ({
        getFoodItems: builder.query({
            query: () => ({
                url: 'v1/fooditems/', 
            }),
            providesTags: ['FoodItem'], 
        }),
        postDish: builder.mutation({
            query: (data) => ({
                url: 'v1/fooditems/', 
                method: 'POST', 
                data,
            }),
            invalidatesTags: ['FoodItem'], 
        }),
    }),
});

export const {
    useGetFoodItemsQuery, 
    usePostDishMutation,
} = FoodApi;
