import { createReducer, PayloadAction } from "@reduxjs/toolkit";

// Actions
import * as listAction from "./actions";

// Types
import { TodoType } from "../types";
import { TodoListStateType, TodoListType } from "./types";

const initialState: TodoListStateType = {
  todoList: [],
  error: null,
  loader: false,
  pagination: {
    currentPage: 1,
    isNextPage: false,
    total: 0,
  }
};

export default createReducer(initialState, {
  [listAction.setToList.type]: (state: TodoListStateType, action: PayloadAction<TodoListType>): void => {
    state.todoList = action.payload.todoList;
    state.pagination = action.payload.pagination;
  },
  [listAction.startFetching.type]: (state: TodoListStateType): void => {
    state.loader = true;
  },
  [listAction.stopFetching.type]: (state: TodoListStateType): void => {
    state.loader = false;
  },
  [listAction.setError.type]: (state: TodoListStateType, action: PayloadAction<string|null>): void => {
    state.error = action.payload;
  },
  [listAction.updateItem.type]: (state: TodoListStateType, action: PayloadAction<TodoType>): void => {
    const findIndex: number = state.todoList.findIndex(({ id }) => id === action.payload.id);
    if (findIndex >= 0) {
      state.todoList[findIndex] = {...action.payload};
    }
  },
});