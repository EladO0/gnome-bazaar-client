import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersType } from "../../config/types/commonTypes";

const initialState: FiltersType = {
  searchTerm: "",
};

export const filtersSlice = createSlice({
  name: "filteres",
  initialState,
  reducers: {
    updateSearchValue: (state, action: PayloadAction<FiltersType>) => {
      state.searchTerm = action.payload.searchTerm;
    },
    resetSearch: () => initialState,
  },
});

export const { updateSearchValue, resetSearch } = filtersSlice.actions;

export default filtersSlice.reducer;
