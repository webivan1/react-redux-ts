export enum UserStatuses {
  'active' = 'active',
  'disabled' = 'disabled',
  'notVerified' = 'notVerified'
}

export type UserModelType = {
  id: string;
  username: string;
  email: string;
  status: keyof typeof UserStatuses;
  createdAt: number;
}

export type UserType = {
  user: UserModelType|false;
}

export type UserUpdateType = {
  username?: string;
  email?: string;
  status?: keyof typeof UserStatuses;
}