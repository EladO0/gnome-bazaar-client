import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../../config/types/loaderTypes";

const initialState: LoadingState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: () => initialState,
  },
});

export const { startLoading, endLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
