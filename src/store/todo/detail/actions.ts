import { createAction, Action } from "@reduxjs/toolkit";
import api from "../../../api";

// Types
import { AppThunk } from "../../store";
import { TodoType } from "../types";
import { TodoEditType } from "./types";

export const setDetail = createAction<TodoType>('todo-detail/set');
export const setError = createAction<string|null>('todo-detail/error');
export const startFetching = createAction('todo-detail/start-fetching');
export const stopFetching = createAction('todo-detail/stop-fetching');
export const clearDetail = createAction('todo-detail/clear');

export const removeTodoAsync = (
  id: string,
  startFetching: () => Action,
  stopFetching: () => Action,
  addError?: (errorMessage: string) => Action<string>,
  clearError?: () => Action
): AppThunk<Promise<boolean>> => async (dispatch, getState) => {
  const { user } = getState().user;

  dispatch(startFetching());

  try {
    if (user) {
      await api.todo.remove(user.id, id);
      dispatch(stopFetching());
      return true;
    } else {
      throw new Error('User is not log in');
    }
  } catch (e) {
    if (addError) {
      dispatch(addError(e.message));
    }

    dispatch(stopFetching());
    return false;
  }
};

export const updateTodoAsync = (
  id: string,
  fields: TodoEditType,
  startFetching: () => Action,
  stopFetching: () => Action,
  completeSuccessful: (newTodo: TodoType) => void,
  addError?: (errorMessage: string) => Action<string>,
  clearError?: () => Action
): AppThunk => async (dispatch, getState) => {
  const { user } = getState().user;

  dispatch(startFetching());

  try {
    if (user) {
      const newTodo = await api.todo.update(user.id, id, fields);
      completeSuccessful(newTodo);
    } else {
      throw new Error('User is not log in');
    }
  } catch (e) {
    if (addError) {
      dispatch(addError(e.message));
    }
  } finally {
    dispatch(stopFetching());
  }
};

export const findTodoAsync = (id: string): AppThunk => async (dispatch, getState) => {
  const { user } = getState().user;

  dispatch(startFetching());

  try {
    if (user) {
      const todo = await api.todo.detail(user.id, id);
      dispatch(setDetail(todo));
    } else {
      throw new Error('User is not log in');
    }
  } catch (e) {
    dispatch(setError(e.message));
  } finally {
    dispatch(stopFetching());
  }
};