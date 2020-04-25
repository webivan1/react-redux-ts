// Types
import { RegisterFormType } from "../store/user/register/types";
import { UserModelType, UserStatuses, UserUpdateType } from "../store/user/types";
import { TodoAddType, TodoType } from "../store/todo/types";
import { TodoEditType } from "../store/todo/detail/types";
import { TodoListType } from "../store/todo/list/types";
import { LoginFormType } from "../store/user/login/types";

// Api
import UserEntity from "../database/entities/User/UserEntity";
import AuthTokenEntity from "../database/entities/AuthToken/AuthTokenEntity";
import TodoEntity from "../database/entities/Todo/TodoEntity";
import { ResponseStatuses } from "../database/entities/User/types";

export type ApiConfigType = {
  user: {
    create: (form: RegisterFormType, status?: keyof typeof UserStatuses) => Promise<UserModelType>;
    update: (user: UserModelType, fields: UserUpdateType) => Promise<UserModelType>;
    verify: (user: UserModelType, verifyCode: string) => Promise<UserModelType>;
    findByCredentials: (form: LoginFormType) => Promise<UserModelType>;
    findByToken: (tokenName: string) => Promise<UserModelType|null>;
  },
  todo: {
    create: (userId: string, fields: TodoAddType) => Promise<TodoType>;
    update: (userId: string, todoId: string, fields: TodoEditType) => Promise<TodoType>;
    remove: (userId: string, todoId: string) => Promise<boolean>;
    list: (userId: string) => Promise<TodoListType>;
    detail: (userId: string, todoId: string) => Promise<TodoType>;
  }
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
  },
  todo: {
    create: (userId: string, fields: TodoAddType) => {
      return new Promise(async (resolve, reject) => {
        const response = await (new TodoEntity()).create(userId, fields);
        if (response.status === 'success') {
          resolve(response.todo);
        } else {
          reject(new Error(response.message));
        }
      });
    },
    update: (userId: string, todoId: string, fields: TodoEditType) => {
      return new Promise(async (resolve, reject) => {
        const response = await (new TodoEntity()).update(userId, todoId, fields);
        if (response.status === 'success') {
          resolve(response.todo);
        } else {
          reject(new Error(response.message));
        }
      });
    },
    remove: (userId: string, todoId: string) => {
      return new Promise(async (resolve, reject) => {
        const response = await (new TodoEntity()).remove(userId, todoId);
        if (response.status === 'success') {
          resolve(true);
        } else {
          reject(new Error(response.message));
        }
      });
    },
    list: (userId: string) => {
      return new Promise(async (resolve, reject) => {
        const response = await (new TodoEntity()).getList(userId);
        if (response.status === 'success') {
          resolve({
            todoList: response.todoList,
            pagination: response.pagination
          });
        } else {
          reject(new Error(response.message));
        }
      });
    },
    detail: (userId: string, todoId: string) => {
      return new Promise(async (resolve, reject) => {
        const response = await (new TodoEntity()).getDetail(userId, todoId);
        if (response.status === 'success') {
          resolve(response.todo);
        } else {
          reject(new Error(response.message));
        }
      });
    },
  }
};

export default api;