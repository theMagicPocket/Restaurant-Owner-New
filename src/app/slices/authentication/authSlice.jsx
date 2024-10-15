import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user_email: "",
  user_id: "",
  restaurant_id: "",
  is_verified: false,
  isLoading: false,
  is_registered: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user_email = action.payload.userEmail;
      state.token = action.payload.token;
      state.user_id = action.payload.userId;
      state.is_verified = action.payload.is_verified;
    },
    logout: (state) => {
      state.token = "";
      state.user_email = "";
      state.user_id = "";
      state.restaurant_id = "";
      state.is_verified = false;
      state.isLoading = false;
      state.is_registered = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setRestaurantId: (state, action) => {
      state.restaurant_id = action.payload; // Only updates restaurant_id
    },
    setIsRegistered: (state, action) => {
      state.is_registered = action.payload;
    },
    setIsverified: (state, action) => {
      state.is_verified = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  setLoading,
  setRestaurantId,
  setIsRegistered,
  setIsverified,
} = authSlice.actions;

export default authSlice.reducer;
