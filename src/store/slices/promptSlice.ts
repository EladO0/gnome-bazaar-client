import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PromptState } from "../../config/types/promptTypes";

const initialState: PromptState = {
  message: "",
  type: null,
};

export const promptSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    promptMessage: (state, action: PayloadAction<PromptState>) => {
      state.message = new String(action.payload.message);
      state.type = action.payload.type;
    },
    closePrompt: () => initialState,
  },
});

export const { promptMessage, closePrompt } = promptSlice.actions;

export default promptSlice.reducer;
