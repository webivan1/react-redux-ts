import { createAction } from "@reduxjs/toolkit";
import api from "../../../api";

// Types
import { AppThunk } from "../../store";
import { TodoListType } from "./types";
import { TodoType } from "../types";

export const setToList = createAction<TodoListType>('todo-list/set');
export const startFetching = createAction('todo-list/start-fetching');
export const stopFetching = createAction('todo-list/stop-fetching');
export const setError = createAction<string|null>('todo-list/set-error');
export const updateItem = createAction<TodoType>('todo-list/update');

export const loadTodoListAsync = (): AppThunk => async (dispatch, getState) => {
  const { user } = getState().user;

  dispatch(startFetching());
  dispatch(setError(null));

  try {
    if (user) {
      const todoList = await api.todo.list(user.id);
      dispatch(setToList(todoList));
    } else {
      throw new Error('Error fetching todo')
    }
  } catch (e) {
    dispatch(setError(e.message));
  } finally {
    dispatch(stopFetching());
  }
};