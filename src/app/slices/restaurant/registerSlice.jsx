/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  photo: "",
  address: {
    lat: "jofj",
    long: "weow",
    street: "",
    door_no: "", 
    pincode: "",
    city: "",
    state: "",
  },
  opens_at: "",
  closes_at: "",
  is_veg: false,
};

const RegisterRestaurant = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setRegisterData } = RegisterRestaurant.actions;
export default RegisterRestaurant.reducer;
