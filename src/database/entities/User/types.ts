import { UserModelType } from "../../../store/user/types";

export enum ResponseStatuses {
  'success' = 'success',
  'error' = 'error'
}

export interface ISchemeUser extends UserModelType {
  password: string;
}

export type UserResponseCreatedSuccessType = {
  status: ResponseStatuses.success;
  user: UserModelType;
  token?: string;
}

export type UserResponseCreatedFailureType = {
  status: ResponseStatuses.error;
  message: string;
}

export type UserResponseType = UserResponseCreatedSuccessType | UserResponseCreatedFailureType;