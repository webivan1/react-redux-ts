import { createAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { TodoType, TodoEditType } from "../types";

export const setDetail = createAction<TodoType>('todo-detail/set');
export const setError = createAction<string>('todo-detail/error');
export const startFetching = createAction('todo-detail/start-fetching');
export const stopFetching = createAction('todo-detail/stop-fetching');
export const editDetail = createAction<TodoEditType>('todo-detail/edit');
export const clearDetail = createAction('todo-detail/clear');

export const findTodoAsync = (id: string): AppThunk => (dispatch, getState) => {
  const todoList = getState().todoList;

  dispatch(startFetching());
  setTimeout(() => {
    const item = todoList.todoList.find(todo => todo.id === id);
    if (item) {
      dispatch(setDetail(item));
    } else {
      dispatch(setError('Todo is not found'))
    }

    dispatch(stopFetching());
  }, 500);
};