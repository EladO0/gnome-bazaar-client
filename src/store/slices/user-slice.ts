import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWT } from "../../config/types/userTypes";


const initialState: JWT = {
  hash: null,
  name: "",
  expiry: null,
  isSupplier: false,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<JWT>) => {
      state.hash = action.payload.hash;
      state.name = action.payload.name;
      state.expiry = action.payload.expiry;
      state.isSupplier = action.payload.isSupplier;
      state.isAdmin = action.payload.isAdmin;
    },
    reset: () => initialState,
  },
});

export const { loadUser: loudJWT, reset } = userSlice.actions;

export default userSlice.reducer;
