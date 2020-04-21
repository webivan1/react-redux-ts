// Config
// Types
import { RegisterFormType } from "../store/user/register/types";
import { UserModelType, UserStatuses } from "../store/user/types";

// Api
import UserEntity from "../database/entities/User/UserEntity";

import { ResponseStatuses } from "../database/entities/User/types";

export type ApiConfigType = {
  user: {
    create: (form: RegisterFormType, status?: keyof typeof UserStatuses) => Promise<UserModelType>,
    // fetch: (id: string) => Promise<UserModelType>
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
        } else {
          reject(new Error(response.message));
        }
      })
    }
  }
};

export default api;