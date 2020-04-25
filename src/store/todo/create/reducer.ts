import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { TodoFormAddType } from "./types";

// Actions
import * as TodoAddActions from "./actions";

const initialState: TodoFormAddType = {
  loader: false,
  error: null
};

export default createReducer(initialState, {
  [TodoAddActions.setLoader.type]: (state: TodoFormAddType, action: PayloadAction<boolean>) => {
    state.loader = action.payload;
  },
  [TodoAddActions.setError.type]: (state: TodoFormAddType, action: PayloadAction<string|null>) => {
    state.error = action.payload;
  },
});