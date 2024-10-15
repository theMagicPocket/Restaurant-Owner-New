import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const Foodcategory = createSlice({
  name: "Foodctegory",
  initialState,
  reducers: {
    setFoodcategory: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setFoodcategory } = Foodcategory.actions;
export default Foodcategory;
