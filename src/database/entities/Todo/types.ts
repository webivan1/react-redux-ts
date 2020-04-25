import { TodoType } from "../../../store/todo/types";
import { TodoListType } from "../../../store/todo/list/types";

export type ISchemeTodo = TodoType;

export type TodoListSuccessResponseType = TodoListType & {
  status: 'success';
}

export type TodoListFailResponseType = {
  status: 'error';
  message: string;
}

export type TodoListResponse = TodoListSuccessResponseType | TodoListFailResponseType;

export type TodoResponseSuccessType = {
  status: 'success';
  todo: TodoType;
}

export type TodoResponseFailType = {
  status: 'error';
  message: string;
}

export type TodoResponseType = TodoResponseSuccessType | TodoResponseFailType;