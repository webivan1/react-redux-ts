import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import reducer from "./rootReducer";
import { middleware } from "./middleware";

export const store = configureStore({
  reducer,
  middleware
});

export type RootState = ReturnType<typeof reducer>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>