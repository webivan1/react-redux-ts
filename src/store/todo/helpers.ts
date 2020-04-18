import { TodoListItemType } from "./types";

export function generateId(): string {
  return String('id-' + Math.ceil(Math.random() * 100000));
}

export function sortList(rows: TodoListItemType[]): TodoListItemType[] {
  return rows.sort((a: TodoListItemType, b: TodoListItemType) => {
    if (Number(a.isCompleted) > Number(b.isCompleted)) {
      return 1;
    } else if (Number(a.isCompleted) < Number(b.isCompleted)) {
      return -1;
    } else {
      return 0;
    }
  })
}