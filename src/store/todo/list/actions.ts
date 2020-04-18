import { createAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { generateId } from "../helpers";
import { TodoListItemType, TodoAddType, TodoIdType } from "../types";

export const setToList = createAction<TodoListItemType[]>('todo-list/set');
export const addToList = createAction<TodoAddType>('todo-list/add');
export const removeFormList = createAction<TodoIdType>('todo-list/remove');
export const startFetching = createAction('todo-list/start-fetching');
export const stopFetching = createAction('todo-list/stop-fetching');

export const setDefaultTodoListAsync = (): AppThunk => dispatch => {
  dispatch(startFetching());
  setTimeout(() => {
    dispatch(setToList([...todoListDefault]));
    dispatch(stopFetching());
  }, 1000);
};

const todoListDefault: TodoListItemType[] = [
  {
    id: generateId(),
    name: 'Learn React',
    isCompleted: true
  },
  {
    id: generateId(),
    name: 'Learn Redux',
    isCompleted: false
  },
  {
    id: generateId(),
    name: 'Learn Typescript',
    isCompleted: false
  },
  {
    id: generateId(),
    name: 'Find a job',
    isCompleted: false
  },
];