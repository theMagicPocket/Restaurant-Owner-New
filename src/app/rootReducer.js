import authReducer from "./slices/authentication/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import Foodcategory from "./slices/restaurant/Foodcategory";
import { FoodApi } from "./Apis/FoodApi";
import PostDishdata from "./slices/restaurant/Postdish";
// import RegisterRestaurant from "./slices/restaurant/registerSlice";
import { RegisterRestaurantApi } from "./Apis/RegisterApi";
import RegisterRestaurantReducer from "./slices/restaurant/registerSlice";
import { SettingsApi } from "./Apis/SettingsApi";

export const middlewares = [
  FoodApi.middleware,
  RegisterRestaurantApi.middleware,
  SettingsApi.middleware
];

export const rootReducer = combineReducers({
  auth: authReducer,
  register: RegisterRestaurantReducer,

  [RegisterRestaurantApi.reducerPath]: RegisterRestaurantApi.reducer,

  Foodcategory: Foodcategory.reducer, // ---> Food categorey slice
  [FoodApi.reducerPath]: FoodApi.reducer,
  [SettingsApi.reducerPath] : SettingsApi.reducer,
  PostDishdata: PostDishdata,
});
