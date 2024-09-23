import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PopupState } from "../../config/types/popupTypes";

const initialState: PopupState = {
  component: null,
  theme: "light",
};

export const counterSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state, action: PayloadAction<PopupState>) => {
      state.component = action.payload.component;
      state.theme = action.payload.theme;
    },
    closePopup: () => initialState,
  },
});

export const { openPopup, closePopup } = counterSlice.actions;

export default counterSlice.reducer;
