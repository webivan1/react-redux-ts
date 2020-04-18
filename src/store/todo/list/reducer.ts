import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import * as listAction from "./actions";
import * as detailAction from "../detail/actions";
import { generateId, sortList } from "../helpers";
import {
  TodoEditType,
  TodoIdType,
  TodoListItemType,
  TodoListType,
  TodoAddType
} from "../types";

const initialState: TodoListType = {
  todoList: [],
  loader: false
};

export default createReducer(initialState, {
  [listAction.setToList.type]: (state: TodoListType, action: PayloadAction<TodoListItemType[]>): void => {
    state.todoList = sortList(action.payload);
  },
  [listAction.addToList.type]: (state: TodoListType, action: PayloadAction<TodoAddType>): void => {
    state.todoList.unshift({
      id: generateId(),
      name: action.payload.name,
      isCompleted: false
    });
  },
  [listAction.removeFormList.type]: (state: TodoListType, action: PayloadAction<TodoIdType>): void => {
    const findIndex = state.todoList.findIndex(item => item.id === action.payload.id);
    if (findIndex >= 0) {
      state.todoList.splice(findIndex, 1);
    }
  },
  [listAction.startFetching.type]: (state: TodoListType): void => {
    state.loader = true;
  },
  [listAction.stopFetching.type]: (state: TodoListType): void => {
    state.loader = false;
  },

  // Extra reducers
  [detailAction.editDetail.type]: (state: TodoListType, action: PayloadAction<TodoEditType>): void => {
    const { id, name, isCompleted } = action.payload;
    const todo = state.todoList.find(item => item.id === id);
    if (todo) {
      todo.name = name || todo.name;
      todo.isCompleted = isCompleted !== undefined ? isCompleted : todo.isCompleted;
    }

    state.todoList = sortList(state.todoList);
  }
});