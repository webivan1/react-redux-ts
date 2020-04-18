export type TodoType = {
  id: string;
  name: string;
  isCompleted: boolean;
}

export type TodoListItemType = TodoType;

export type TodoListType = {
  todoList: TodoListItemType[];
  loader: boolean;
}

export type TodoEditType = {
  id?: string;
  name?: string;
  isCompleted?: boolean;
}

export type TodoIdType = {
  id: string;
}

export type TodoAddType = {
  name: string;
}

export type TodoDetailType = {
  loader: boolean;
  error: string|null;
  detail: TodoType|null;
}