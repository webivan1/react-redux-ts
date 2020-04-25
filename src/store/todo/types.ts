export type TodoType = {
  id: string;
  userId: string;
  name: string;
  isCompleted: boolean;
  createdAt: number;
}

export type TodoAddType = {
  name: string;
}