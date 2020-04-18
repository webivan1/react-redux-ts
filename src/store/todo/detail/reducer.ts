import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import * as detailAction from "./actions";
import * as listAction from "../list/actions";
import {
  TodoDetailType,
  TodoType,
  TodoEditType,
  TodoIdType
} from "../types";

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
  [detailAction.editDetail.type]: (state: TodoDetailType, action: PayloadAction<TodoEditType>): void => {
    const { name, isCompleted } = action.payload;

    if (state.detail) {
      state.detail.name = name || state.detail.name;
      state.detail.isCompleted = isCompleted !== undefined ? isCompleted : state.detail.isCompleted;
    }
  },
  [detailAction.setError.type]: (state: TodoDetailType, action: PayloadAction<string>): void => {
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
  },

  // Extra reducers
  [listAction.removeFormList.type]: (state: TodoDetailType, action: PayloadAction<TodoIdType>): void => {
    if (state.detail && state.detail.id === action.payload.id) {
      state.detail = null;
      state.error = 'Todo has been deleted';
    }
  }
});