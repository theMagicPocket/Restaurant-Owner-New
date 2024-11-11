import authReducer from "./slices/authentication/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import Foodcategory from "./slices/restaurant/Foodcategory";
import { FoodApi } from "./Apis/FoodApi";
import PostDishdata from "./slices/restaurant/Postdish";
// import RegisterRestaurant from "./slices/restaurant/registerSlice";
import { RegisterRestaurantApi } from "./Apis/RegisterApi";
import RegisterRestaurantReducer from "./slices/restaurant/registerSlice";
import { SettingsApi } from "./Apis/SettingsApi";
import { HelpApi } from "./Apis/HelpAPi";
import { DashboardApi } from "./Apis/DashboardApi";

export const middlewares = [
  FoodApi.middleware,
  RegisterRestaurantApi.middleware,
  SettingsApi.middleware,
  HelpApi.middleware,
  DashboardApi.middleware,
];

export const rootReducer = combineReducers({
  auth: authReducer,
  register: RegisterRestaurantReducer,

  [RegisterRestaurantApi.reducerPath]: RegisterRestaurantApi.reducer,

  Foodcategory: Foodcategory.reducer, // ---> Food categorey slice
  [FoodApi.reducerPath]: FoodApi.reducer,
  [SettingsApi.reducerPath]: SettingsApi.reducer,
  [HelpApi.reducerPath]: HelpApi.reducer,
  [DashboardApi.reducerPath]: DashboardApi.reducer,
  PostDishdata: PostDishdata,
});
