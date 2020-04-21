import BaseEntity from "../BaseEntity";
import { v4 as uuid4 } from "uuid";
import { UserStatuses, UserModelType } from "../../../store/user/types";
import {
  ResponseStatuses,
  UserResponseCreatedFailureType,
  UserResponseCreatedSuccessType,
  ISchemeUser
} from "./types";


export default class UserEntity extends BaseEntity {
  protected collectionName: string = 'users';

  create(username: string, email: string, password: string, status?: keyof typeof UserStatuses): Promise<UserResponseCreatedSuccessType|UserResponseCreatedFailureType> {
    return new Promise(async resolve => {
      const findUser = await this.ref().orderByChild('email').equalTo(email).once('value')
        .then(snapshot => snapshot.val());

      if (findUser) {
        resolve({ status: ResponseStatuses.error, message: 'User is already exists' });
      } else {
        const user: ISchemeUser = {
          id: uuid4(),
          username,
          email,
          password,
          status: status || UserStatuses.notVerified,
          createdAt: (new Date()).getTime(),
        };

        await this.refId(user.id).set({...user});
        delete user.password;

        resolve({ status: ResponseStatuses.success, user });
      }
    });
  }

  findById(id: string): Promise<UserModelType> {
    const ref = this.ref().equalTo(id);

    return ref.once('value')
      .then(value => value.val());
  }
}