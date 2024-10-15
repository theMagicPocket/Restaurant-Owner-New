import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item_name: "",
  description: "",
  hotel_id: "hotel_id",
  price: "",
  addons: [],
  photo: "http://ojfw.com/image.png",
  is_veg: false,
  is_addon: true,
  is_active: true,
  category: [],
};

const PostDishdata = createSlice({
  name: "PostDishdata",
  initialState,
  reducers: {
    setdishData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setdishData } = PostDishdata.actions;
export default PostDishdata.reducer;
