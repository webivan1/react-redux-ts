// Types
import { RegisterFormType } from "../store/user/register/types";
import { UserModelType, UserStatuses, UserUpdateType } from "../store/user/types";

// Api
import UserEntity from "../database/entities/User/UserEntity";

import { ResponseStatuses } from "../database/entities/User/types";
import { LoginFormType } from "../store/user/login/types";
import AuthTokenEntity from "../database/entities/AuthToken/AuthTokenEntity";

export type ApiConfigType = {
  user: {
    create: (form: RegisterFormType, status?: keyof typeof UserStatuses) => Promise<UserModelType>,
    update: (user: UserModelType, fields: UserUpdateType) => Promise<UserModelType>,
    verify: (user: UserModelType, verifyCode: string) => Promise<UserModelType>,
    findByCredentials: (form: LoginFormType) => Promise<UserModelType>,
    findByToken: (tokenName: string) => Promise<UserModelType|null>
  },
  // todo: {
  //   list: {
  //     fetch: () => Promise<TodoListItemType[]>
  //   },
  //   detail: {
  //     fetch: (id: string) => Promise<TodoType>,
  //     edit: (form: TodoEditType) => Promise<TodoType>
  //   },
  //   delete: (id: string) => void,
  //   create: (form: TodoAddType) => Promise<TodoType>
  // }
}

const api: ApiConfigType = {
  user: {
    create: (form: RegisterFormType, status?: keyof typeof UserStatuses) => {
      return new Promise<UserModelType>(async (resolve, reject) => {
        const response = await (new UserEntity()).create(form.username, form.email, form.password, status);
        if (response.status === ResponseStatuses.success) {
          resolve(response.user);

          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
        } else {
          reject(new Error(response.message));
        }
      })
    },
    update: (user: UserModelType, fields: UserUpdateType) => {
      return new Promise<UserModelType>(async (resolve, reject) => {
        const response = await (new UserEntity()).update(user, fields);
        if (response.status === ResponseStatuses.success) {
          resolve(response.user);
        } else {
          reject(new Error(response.message));
        }
      })
    },
    verify: (user: UserModelType, verifyCode: string) => {
      return new Promise<UserModelType>(async (resolve, reject) => {
        const response = await (new UserEntity()).verify(user, verifyCode);
        if (response.status === ResponseStatuses.success) {
          resolve(response.user);
        } else {
          reject(new Error(response.message));
        }
      })
    },
    findByCredentials: (form: LoginFormType) => {
      return new Promise<UserModelType>(async (resolve, reject) => {
        const response = await (new UserEntity()).findByCredentials(form.email, form.password);
        if (response.status === ResponseStatuses.success) {
          resolve(response.user);

          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
        } else {
          reject(new Error(response.message));
        }
      })
    },
    findByToken: (tokenName: string) => {
      return new Promise<UserModelType|null>(async (resolve) => {
        const token = new AuthTokenEntity();
        const userId: string|null = await token.getUserIdByToken(tokenName);
        if (!userId) {
          resolve(null);
        } else {
          const user = new UserEntity();
          const data: UserModelType|null = await user.findById(userId);
          resolve(data);
        }
      });
    }
  }
};

export default api;