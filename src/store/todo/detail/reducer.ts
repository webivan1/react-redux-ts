import { createReducer, PayloadAction } from "@reduxjs/toolkit";

// Actions
import * as detailAction from "./actions";

// Types
import { TodoType } from "../types";
import { TodoDetailType } from "./types";

const initialState: TodoDetailType = {
  loader: false,
  error: null,
  detail: null
};

export default createReducer(initialState, {
  [detailAction.setDetail.type]: (state: TodoDetailType, action: PayloadAction<TodoType>): void => {
    state.error = null;
    state.detail = action.payload;
  },
  [detailAction.setError.type]: (state: TodoDetailType, action: PayloadAction<string|null>): void => {
    state.error = action.payload;
  },
  [detailAction.startFetching.type]: (state: TodoDetailType): void => {
    state.loader = true;
  },
  [detailAction.stopFetching.type]: (state: TodoDetailType): void => {
    state.loader = false;
  },
  [detailAction.clearDetail.type]: (state: TodoDetailType): void => {
    if (state.detail) {
      state.detail = null;
      state.error = null;
    }
  }
});