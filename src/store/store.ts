import { configureStore } from "@reduxjs/toolkit";
import popupSlice from "./slices/popupSlice";
import authSlice from "./slices/authenticationSlice";
import promptSlice from "./slices/promptSlice";
import filtersSlice from "./slices/filtersSlice";

export const store = configureStore({
  reducer: {
    popup: popupSlice,
    auth: authSlice,
    prompt: promptSlice,
    search: filtersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
