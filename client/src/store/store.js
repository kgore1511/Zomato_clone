import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import restaurantSlice from "./restaurantSlice";
import searchSlice from "./searchSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    restaurant: restaurantSlice,
    search: searchSlice
  }
});