import { createAction } from "@reduxjs/toolkit";
import api from "../../../api";

// Types
import { TodoAddType } from "../types";
import { AppThunk } from "../../store";

// Actions
import { loadTodoListAsync } from "../list/actions";

export const setLoader = createAction<boolean>('todo/create-set-loader');
export const setError = createAction<string|null>('todo/set-error');

export const addNewTodoAsync = (fields: TodoAddType): AppThunk => async (dispatch, getState) => {
  const { user } = getState().user;
  dispatch(setLoader(true));
  dispatch(setError(null));

  try {
    if (user) {
      await api.todo.create(user.id, fields);
      dispatch(loadTodoListAsync());
      // @todo add notification (You have successful created new todo %TODO_NAME%)
    } else {
      throw new Error('User is not log in');
    }
  } catch (e) {
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoader(false));
  }
};