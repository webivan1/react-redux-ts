import BaseEntity from "../BaseEntity";
import { TodoAddType, TodoType } from "../../../store/todo/types";
import { v4 as uuid4 } from "uuid";
import { TodoListResponse, TodoResponseType } from "./types";
import { TodoEditType } from "../../../store/todo/detail/types";

export default class TodoEntity extends BaseEntity {
  protected collectionName = 'todo';

  create(userId: string, { name }: TodoAddType): Promise<TodoResponseType> {
    return new Promise(async resolve => {
      const newTodo: TodoType = {
        id: uuid4(),
        userId,
        name,
        isCompleted: false,
        createdAt: (new Date()).getTime()
      };

      try {
        await this.refId(newTodo.id).set(newTodo);
        resolve({ status: 'success', todo: newTodo });
      } catch (e) {
        resolve({ status: 'error', message: 'Error create todo' });
      }
    });
  }

  update(userId: string, todoId: string, fields: TodoEditType): Promise<TodoResponseType> {
    return new Promise(async resolve => {
      const response = await this.getDetail(userId, todoId);
      if (response.status === 'success') {
        try {
          const newTodo = {...response.todo, ...fields};
          await this.refId(response.todo.id).update(newTodo);
          resolve({ status: 'success', todo: newTodo });
        } catch (e) {
          resolve({ status: 'error', message: 'Error delete todo' });
        }
      } else {
        resolve(response);
      }
    });
  }

  getList(userId: string): Promise<TodoListResponse> {
    // @todo add pagination functional
    return new Promise(async resolve => {
      try {
        let models: TodoType[] = await this.ref().orderByChild('userId').equalTo(userId).once('value')
          .then(snapshot => {
            const todoList: TodoType[] = [];

            snapshot.forEach(action => {
              const todoItem: TodoType = action.val();
              todoList.push(todoItem);
            });

            return todoList;
          });

        models = models.sort((a: TodoType, b: TodoType) => {
          return a.createdAt > b.createdAt ? -1 : (a.createdAt < b.createdAt ? 1 : 0);
        });

        resolve({
          status: 'success',
          todoList: models,
          pagination: {
            currentPage: 1,
            total: models.length,
            isNextPage: false
          }
        });
      } catch (e) {
        resolve({ status: 'error', message: e.message });
      }
    });
  }

  getDetail(userId: string, todoId: string): Promise<TodoResponseType> {
    return new Promise(async (resolve, reject) => {
      try {
        const todo: TodoType|null = await this.refId(todoId).once('value')
          .then(snapshot => snapshot.val());

        if (!todo || todo.userId !== userId) {
          throw new Error('Not found');
        }

        resolve({ status: 'success', todo });
      } catch (e) {
        resolve({ status: 'error', message: '404 Todo is not found' })
      }
    });
  }

  remove(userId: string, todoId: string): Promise<TodoResponseType> {
    return new Promise(async resolve => {
      const response = await this.getDetail(userId, todoId);
      if (response.status === 'success') {
        try {
          await this.refId(response.todo.id).remove();
          resolve(response);
        } catch (e) {
          resolve({ status: 'error', message: 'Error delete todo' });
        }
      } else {
        resolve(response);
      }
    });
  }
}