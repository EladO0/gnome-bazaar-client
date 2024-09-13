import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchType } from "../../config/types/commonTypes";

const initialState: SearchType = {
  searchTerm: "",
};

export const filtersSlice = createSlice({
  name: "filteres",
  initialState,
  reducers: {
    updateSearchValue: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    resetSearch: () => initialState,
  },
});

export const { updateSearchValue, resetSearch } = filtersSlice.actions;

export default filtersSlice.reducer;
