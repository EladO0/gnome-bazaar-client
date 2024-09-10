import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersType } from "../../config/types/commonTypes";
import { Category } from "../../config/types/marketTypes";

const initialState: FiltersType = {
  searchTerm: "",
  category: undefined
};

export const filtersSlice = createSlice({
  name: "filteres",
  initialState,
  reducers: {
    updateSearchValue: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    updateSearchCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload === state.category ?
        initialState.category :
        action.payload;
    },
    resetSearch: () => initialState,
  },
});

export const { updateSearchValue, updateSearchCategory, resetSearch } = filtersSlice.actions;

export default filtersSlice.reducer;
