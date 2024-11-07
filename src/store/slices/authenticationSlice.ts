import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWT } from "../../config/types/userTypes";

const initialState: JWT = {
  uuid: "",
  token: "",
  name: "",
  expiry: new Date(),
  isSupplier: false,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loadToken: (state, action: PayloadAction<JWT>) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.expiry = action.payload.expiry;
      state.isSupplier = action.payload.isSupplier;
      state.isAdmin = action.payload.isAdmin;
      state.uuid = action.payload.uuid;
    },
    resetToken: () => {
      localStorage.removeItem("expiry");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isSupplier");
      localStorage.removeItem("name");
      localStorage.removeItem("uuid");
      localStorage.removeItem("token");
      return initialState;
    },
  },
});

export const { loadToken, resetToken } = authSlice.actions;

export default authSlice.reducer;
