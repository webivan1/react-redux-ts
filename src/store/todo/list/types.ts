import { TodoType } from "../types";

export type TodoPaginationType = {
  currentPage: number;
  total: number;
  isNextPage: boolean;
}

export type TodoListType = {
  todoList: TodoType[];
  pagination: TodoPaginationType;
}

export type TodoListStateType = TodoListType & {
  loader: boolean;
  error: string|null;
}