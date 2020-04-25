import { TodoType } from "../types";

export type TodoEditType = {
  name?: string;
  isCompleted?: boolean;
}

export type TodoDetailType = {
  loader: boolean;
  error: string|null;
  detail: TodoType|null;
}